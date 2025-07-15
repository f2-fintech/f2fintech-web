// src/apis/channelPartnerApi.js
export const postChannelPartner = async (data) => {
  const response = await fetch("http://localhost:8080/api/v1/channel-partner", {
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
