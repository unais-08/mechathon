// API call function
const makeAPICall = async (endpoint, method, data) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  // Add auth header for authenticated requests
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, config);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};

export default makeAPICall;
