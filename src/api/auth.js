import apiUrl from "../apiConfig";
import axios from "axios";

export const checkUsernameUnique = (username) => {
  return axios({
    url: apiUrl + "/check-username/" + username,
    method: "GET"
  });
}

export const signUp = (credentials) => {
  return axios({
    url: apiUrl + "/sign-up",
    method: "POST",
    data: { credentials }
  });
}

export const signIn = (credentials) => {
  return axios({
    url: apiUrl + "/sign-in",
    method: "POST",
    data: { credentials }
  });
}

export const signOut = (user) => {
  return axios({
    url: apiUrl + "/sign-out",
    method: "DELETE",
    headers: {
			Authorization: `Token token=${user.token}`,
		}
  });
}