import axios from "axios";

// TODO: globalize this
const AUTH_SERVER_BASEURL = "http://localhost:3002";
const AUTH_SERVER_ENDPOINT_REGISTER = "register";
const AUTH_SERVER_ENDPOINT_AUTHENTICATE = "authenticate";

export async function requestRegistration(newUser) {
  const { firstname, lastname, username, password, country, city, phone } =
    newUser;
  try {
    const { data } = await axios.post(
      AUTH_SERVER_BASEURL + "/" + AUTH_SERVER_ENDPOINT_REGISTER,
      {
        fullname: firstname + " " + lastname,
        username,
        password,
        country,
        city,
        phone,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
}

export async function requestLogin(username, password) {
  try {
    const { data } = await axios.post(
      AUTH_SERVER_BASEURL + "/" + AUTH_SERVER_ENDPOINT_AUTHENTICATE,
      {
        username,
        password,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
}
