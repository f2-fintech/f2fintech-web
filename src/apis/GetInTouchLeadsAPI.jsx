import { useState } from "react";

const API_URL = `${import.meta.env.VITE_BASE_URL || "http://localhost:8080/api/v1"}/get-in-touch`;

const useCreateLead = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLead = async (leadData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error("Failed to create lead");
      }

      const data = await response.json();
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { createLead, loading, error };
};

export default useCreateLead;
