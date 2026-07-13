const ENV = import.meta.env;

export const postDsa = async (data) => {
  const response = await fetch(`${ENV.VITE_BASE_URL}/dsa`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit DSA application");
  }

  return await response.json();
};
