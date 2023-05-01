import axios from "axios";

const AUTH_SERVER_BASEURL = "http://localhost:5000";

const fetcher = async (url, method, data) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios({
      method,
      url: AUTH_SERVER_BASEURL + url,
      data,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data);
    if (error.response.status === 401) {
      sessionStorage.removeItem("token");
      alert("You are not authorized to access this page. Please login."); // TODO: Replace with a modal
      window.location.href = "/login";
    } else {
      console.log("Error: " + error.response.status);
    }
  }
};

export default fetcher;