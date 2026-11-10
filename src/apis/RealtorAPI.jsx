const ENV = import.meta.env;

export const postRealtor = async (data) => {
  const response = await fetch(`${ENV.VITE_BASE_URL}/realtor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit realtor application");
  }

  return await response.json();
};

export const getRealtors = async () => {
  const response = await fetch(`${ENV.VITE_BASE_URL}/get-realtors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch realtor applications");
  }

  return await response.json();
};

