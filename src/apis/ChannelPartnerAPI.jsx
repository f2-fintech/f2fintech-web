// src/apis/channelPartnerApi.js
const ENV = import.meta.env;
export const postChannelPartner = async (data) => {
  const response = await fetch(`${ENV.VITE_BASE_URL}/channel-partner`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit channel partner data");
  }

  return await response.json();
};
