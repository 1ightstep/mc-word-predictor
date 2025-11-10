const fetchApi = async (query, limit) => {
  const apiUrl = process.env.API_URL || "http://localhost:5000";
  const response = await fetch(`${apiUrl}/api/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query, limit: limit }),
  });

  if (!response.ok) {
    console.error("Error:", response.statusText);
    return null;
  }

  const data = await response.json();
  return data.predictions;
};

export default fetchApi;
