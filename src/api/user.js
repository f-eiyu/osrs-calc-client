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