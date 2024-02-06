import axios from "axios";
import { baseUrl } from "../utils/constants";
import { LoginPayload, RegisterPayload } from "../utils/types";

export const handleUserLogin = async ({ email, password }: LoginPayload) => {
  try {
    const response = await axios({
      method: "post",
      url: `${baseUrl}/users/login`,
      data: { email, password },
    });

    console.log("response header: ", response.headers["x-sanguis-auth"]);

    return { user: response?.data, token: response?.headers["x-sanguis-auth"] };
  } catch (error) {
    console.log(error);
  }
};

export const handleUserRegister = async ({
  email,
  password,
  firstName,
  lastName,
  birthDate,
}: RegisterPayload) => {
  try {
    const response = await axios({
      method: "post",
      url: `${baseUrl}/users/register`,
      data: { email, password, firstName, lastName, birthDate },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
