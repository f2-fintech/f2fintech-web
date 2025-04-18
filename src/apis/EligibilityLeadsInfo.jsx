import { useState } from "react";

const API_URL = "http://localhost:8080/api/v1/create-leads-info";

const useCreateLeadsInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLeadsInfo = async (infoData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoData),
      });

      if (!response.ok) {
        throw new Error("Failed to create leads info");
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

  return { createLeadsInfo, loading, error };
};

export default useCreateLeadsInfo;
