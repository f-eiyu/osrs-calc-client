import apiUrl from "../apiConfig";
import axios from "axios";

export const changePassword = (user, passwords) => {
  return axios({
    url: apiUrl + "/change-password",
    method: "PATCH",
    headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			passwords: {
				old: passwords.oldPassword,
				new: passwords.newPassword,
			},
		}
  });
}

export const getLoadouts = (user) => {
	return axios({
		url: apiUrl + "/get-loadouts",
		method: "GET",
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	});
}

export const addLoadout = (user, loadoutEntry) => {
	return axios({
		url: apiUrl + "/add-loadout",
		method: "POST",
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { loadoutEntry }
	});
}

export const deleteLoadout = (user, loadoutName) => {
	return axios({
		url: apiUrl + "/delete-loadout/" + loadoutName,
		method: "DELETE",
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	});
}