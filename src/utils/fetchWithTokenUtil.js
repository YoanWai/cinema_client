import axios from "axios";
import { myAlert, alertContainer } from "./alertUtil";

const { REACT_APP_MAIN_SERVER_BASEURL } = process.env;

const fetcher = async (url, method, data) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios({
      method,
      url: REACT_APP_MAIN_SERVER_BASEURL + url,
      data,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    if (error.code === "ERR_NETWORK") {
      alert("Network error. Please try again later.");
    }
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
