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

export const getPlayerFromHiscores = (name) => {
  return axios({
    url: apiUrl + "/player/" + name,
    method: "GET"
  });
}