import axios from "axios";
import { baseUrl } from "../utils/constants";
import { BloodTestsCategory } from "../utils/types";

export const getBloodTestsTypes = async (
  userToken: string,
): Promise<BloodTestsCategory[] | undefined> => {
  try {
    const response = await axios({
      method: "get",
      url: `${baseUrl}/blood-tests/categories`,
      headers: {
        "X-Sanguis-Auth": userToken,
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
