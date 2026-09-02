/**
 * Razorpay Payment Utility
 * Dynamically loads the Razorpay checkout script and opens a payment modal.
 */

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_yourkeyhere";

/**
 * Loads the Razorpay script from CDN if not already loaded.
 * @returns {Promise<boolean>} - true if loaded successfully
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Opens Razorpay payment modal for CIBIL report payment (₹50).
 * @param {Object} options
 * @param {string} options.name - Customer name
 * @param {string} options.mobile - Customer mobile number
 * @param {string} options.email - Customer email (optional)
 * @param {function} options.onSuccess - Callback on payment success with paymentId
 * @param {function} options.onFailure - Callback on payment failure
 */
export const openCibilPayment = async ({ name, mobile, email = "", onSuccess, onFailure }) => {
  // If Razorpay key is still a placeholder, provide smooth dev testing
  if (!RAZORPAY_KEY_ID || RAZORPAY_KEY_ID === "rzp_test_yourkeyhere") {
    console.info("Using developer test payment flow (to use live Razorpay, set VITE_RAZORPAY_KEY_ID in .env.local)");
    const mockPaymentId = `pay_mock_${Date.now()}_${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setTimeout(() => {
      onSuccess(mockPaymentId);
    }, 1200);
    return;
  }

  const loaded = await loadRazorpayScript();
  if (!loaded) {
    onFailure("Failed to load payment gateway. Please check your connection.");
    return;
  }

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: 5000, // ₹50 in paise
    currency: "INR",
    name: "F2 Fintech",
    description: "CIBIL Credit Report Download",
    image: "/logo.png",
    prefill: {
      name: name,
      contact: mobile,
      email: email,
    },
    notes: {
      purpose: "CIBIL Report",
    },
    theme: {
      color: "#3244e6",
    },
    handler: function (response) {
      if (response.razorpay_payment_id) {
        onSuccess(response.razorpay_payment_id);
      } else {
        onFailure("Payment verification failed. Please try again.");
      }
    },
    modal: {
      ondismiss: function () {
        onFailure("Payment was cancelled.");
      },
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.on("payment.failed", function (response) {
    onFailure(response.error?.description || "Payment failed. Please try again.");
  });
  rzp.open();
};
