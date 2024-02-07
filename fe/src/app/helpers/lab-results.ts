import axios from "axios";
import { baseUrl } from "../utils/constants";
import { AddNewLabResultPayload } from "../utils/types";

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

export const addNewLabResult = async ({
  date,
  laboratory,
  physician,
  note,
  tests,
  token,
}: AddNewLabResultPayload) => {
  try {
    const response = await axios({
      method: "post",
      url: `${baseUrl}/lab-results`,
      headers: {
        "X-Sanguis-Auth": token,
      },
      data: {
        date,
        laboratory,
        physician,
        note,
        tests,
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
