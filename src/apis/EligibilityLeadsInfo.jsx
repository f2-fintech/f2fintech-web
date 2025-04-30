import { useState } from "react";

const API_BASE_URL = "http://localhost:8080/api/v1";

// ⬇️ Full payload used for UPDATE only
const transformPayload = (data) => {
  return {
    name: data.name,
    contact: data.contact,
    pan: data.pan,
    dob: data.dob,
    loan_category: data.loanCategory,
    age: data.age?.toString(),
    income: data.income?.toString(),
    loan_amount: data.loanAmount,
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
  };
};

// ⬇️ Only minimal payload for CREATE (Step 1)
const transformMinimalPayload = (data) => {
  return {
    name: data.name,
    contact: data.contact,
    pan: data.pan,
    dob: data.dob,
    loan_category: data.loanCategory,
  };
};

const useCreateLeadsInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLeadsInfo = async (infoData) => {
    setLoading(true);
    setError(null);

    try {
      const minimalData = transformMinimalPayload(infoData); // 🛠️ use minimal here
      const response = await fetch(`${API_BASE_URL}/create-leads-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(minimalData),
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

  const updateLeadsInfo = async (id, updatedData) => {
    setLoading(true);
    setError(null);

    try {
      const cleanedData = transformPayload(updatedData); // 🛠️ use full here
      const response = await fetch(`${API_BASE_URL}/update-leads-info/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update leads info");
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

  const getLeadCibilScore = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/get-leads-info/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch CIBIL score");
      }

      const result = await response.json();
      const cibilScore = parseInt(result.data?.cibil); // assuming cibil is a string
      return { success: true, cibilScore };
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
    getLeadCibilScore,
    loading,
    error,
  };
};

export default useCreateLeadsInfo;
