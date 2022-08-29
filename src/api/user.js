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