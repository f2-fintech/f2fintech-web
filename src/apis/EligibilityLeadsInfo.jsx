import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

// Minimal payload for create (Step 1)
const transformMinimalPayload = (data) => ({
  name: data.name,
  contact: data.contact,
  pan: data.pan,
  dob: data.dob,
  loan_category: data.loanCategory,
});

// Full payload for update
const transformPayload = (data) => ({
  name: data.name,
  contact: data.contact,
  pan: data.pan,
  dob: data.dob,
  loan_category: data.loanCategory,
  age: data.age?.toString(),
  income: data.income?.toString(),
  amount: data.amount,
  loan_history: data.loanHistory ? JSON.stringify(data.loanHistory) : null,
  company_registration_type: data.registrationType,
  gst_number: data.registrationNumber,
  udhyam_number: data.udhyamNumber || null,
  itr: data.itr,
  turnover: data.turnover,
  profit: data.profit,
  incorporation_date: data.date_of_incorporation,
  property_type: data.property_type || null,
  ownership_type: data.ownership_type || null,
  property_location: data.property_location || null,
  estimated_value: data.estimated_value || null,
  employment_type: data.employmentType,
  doctor_type: data.doctorType || null,
  degree: data.degree || null,
  license_number: data.licenseNumber || null,
  existing_obligations: data.existingObligations,
  requested_emi: data.requestedEmi,
  cibil: data.cibilScore,
  provider:data.provider,
});

const useCreateLeadsInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLeadsInfo = async (infoData) => {
    setLoading(true);
    setError(null);

    try {
      const minimalData = transformMinimalPayload(infoData);
      const response = await axios.post(
        `${API_BASE_URL}/create-leads-info`,
        minimalData
      );
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateLeadsInfo = async (id, updatedData) => {
    setLoading(true);
    setError(null);

    try {
      const cleanedData = transformPayload(updatedData);
      const response = await axios.put(
        `${API_BASE_URL}/update-leads-info/${id}`,
        cleanedData
      );
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const getLeadCibilScore = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/get-leads-info/${id}`);
      const result = response.data;
      const cibilScore = parseInt(result.data?.cibil);
      return { success: true, cibilScore, data: result.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    createLeadsInfo,
    updateLeadsInfo,
    getLeadCibilScore, // ✅ this must be part of the return
    loading,
    error,
  };
};

export default useCreateLeadsInfo;
