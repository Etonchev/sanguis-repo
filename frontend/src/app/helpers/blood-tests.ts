import axios from "axios";
import { baseUrl } from "../utils/constants";
import {
  AllBloodTests,
  BloodTestsCategory,
  GetLabResultBloodTests,
  LabResultBloodTests,
} from "../utils/types";

export const getBloodTestsTypes = async (
  userToken: string,
): Promise<BloodTestsCategory[] | undefined> => {
  try {
    const response = await axios({
      method: "get",
      url: `${baseUrl}/blood-tests/categories`,
      headers: {
        "X-Sanguis-Auth": userToken,
        Accept: "application/vnd.sanguis.v1+json",
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getLabResultBloodTests = async ({
  token,
  id,
}: GetLabResultBloodTests): Promise<LabResultBloodTests[] | undefined> => {
  try {
    const response = await axios({
      method: "get",
      url: `${baseUrl}/blood-tests/${id}`,
      headers: {
        "X-Sanguis-Auth": token,
        Accept: "application/vnd.sanguis.v1+json",
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getAllBloodTests = async (token: string): Promise<AllBloodTests[] | undefined> => {
  try {
    const response = await axios({
      method: "get",
      url: `${baseUrl}/blood-tests`,
      headers: {
        "X-Sanguis-Auth": token,
        Accept: "application/vnd.sanguis.v1+json",
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
