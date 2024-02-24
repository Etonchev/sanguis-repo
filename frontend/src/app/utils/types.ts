export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
};

export type LabTest = {
  categoryId: string;
  value: number;
};

export type LabResultItem = {
  date: string;
  id: string;
  laboratory: string;
  note: string;
  physician: string;
  tests: LabTest[];
};

export type LabResultsType = {
  items: LabResultItem[];
  limit: number;
  offset: number;
  total: number;
};

export type User = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
};

export type BloodTestsCategory = {
  id: string;
  name: string;
  aliases: string;
  description: string;
  speciality: string;
  unit: string;
  lowerRange: number;
  upperRange: number;
};

export interface AddNewLabResultPayload {
  token: string;
  date: string;
  laboratory: string;
  physician: string;
  note: string;
  tests: LabTest[];
}

export interface EditLabResultPayload extends AddNewLabResultPayload {
  id: string;
}

export type GetLabResultPayload = {
  token: string;
  id: string;
};

export type DeleteLabResultPayload = GetLabResultPayload;

export type GetLabResultBloodTests = GetLabResultPayload;

export type LabResultBloodTests = {
  categoryId: string;
  note: string;
  date: string;
  value: number;
};

type BloodTestItem = {
  categoryId: string;
  note: string;
  date: string;
  value: number;
};

export type AllBloodTests = {
  items: BloodTestItem[];
  total: number;
  offset: number;
  limit: number;
};
