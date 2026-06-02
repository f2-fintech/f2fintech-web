/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 */

import { useState } from "react";
import { axiosInstance } from "./config/axiosConfig";

const useCreateFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createFeedback = async (feedbackData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/create-feedback", feedbackData);
      return { success: true, data: response.data };
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Failed to submit feedback.";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { createFeedback, loading, error };
};

export default useCreateFeedback;
