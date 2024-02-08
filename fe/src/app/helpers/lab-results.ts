import axios from "axios";
import { baseUrl } from "../utils/constants";
import {
  AddNewLabResultPayload,
  EditLabResultPayload,
  GetLabResultPayload,
  DeleteLabResultPayload,
} from "../utils/types";

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

export const fetchLabResult = async ({ token, id }: GetLabResultPayload) => {
  try {
    const response = await axios({
      method: "get",
      url: `${baseUrl}/lab-results/${id}`,
      headers: {
        "X-Sanguis-Auth": token,
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

export const editLabResult = async ({
  date,
  laboratory,
  physician,
  note,
  tests,
  token,
  id,
}: EditLabResultPayload) => {
  try {
    const response = await axios({
      method: "patch",
      url: `${baseUrl}/lab-results/${id}`,
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

export const deleteLabResult = async ({ id, token }: DeleteLabResultPayload) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${baseUrl}/lab-results/${id}`,
      headers: {
        "X-Sanguis-Auth": token,
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
