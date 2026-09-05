import { useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL || "http://localhost:8080/api/v1"}/create-product-leads`;

const useProductLead = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProductLead = async (leadData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_URL, leadData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Unknown error";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return { createProductLead, loading, error };
};

export default useProductLead;
