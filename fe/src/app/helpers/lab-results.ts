import axios from "axios";
import { baseUrl } from "../utils/constants";

export const fetchLabResults = async (userToken: string) => {
  try {
    const response = await axios({
      method: "get",
      url: `${baseUrl}/lab-results`,
      headers: {
        "X-Sanguis-Auth": userToken,
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
