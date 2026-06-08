const ENV = import.meta.env;
export const postCareer = async (data) => {
  const response = await fetch(`${ENV.VITE_BASE_URL}/careers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit career application");
  }

  return await response.json();
};
