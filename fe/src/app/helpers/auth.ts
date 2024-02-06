import axios from "axios";
import { baseUrl } from "../utils/constants";

type Login = {
  email: string;
  password: string;
};

type Register = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
};

export const handleUserLogin = async ({ email, password }: Login) => {
  try {
    const response = await axios({
      method: "post",
      url: `${baseUrl}/users/login`,
      data: { email, password },
    });

    console.log("SSSS", response);

    return response?.data;
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
}: Register) => {
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
