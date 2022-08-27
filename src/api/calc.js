import apiUrl from "../apiConfig";
import axios from "axios";

export const getItemDb = () => {
  return axios({
    url: apiUrl + "/items",
    method: "GET"
  });
}

export const getNpcDb = () => {
  return axios({
    url: apiUrl + "/npcs",
    method: "GET"
  });
}