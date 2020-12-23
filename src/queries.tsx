import axios from "./axios";

export interface Someone {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export async function getPeopleList(): Promise<Someone[]> {
  const { data } = await axios.get();
  return data;
}

export async function deleteSomeone(id: number): Promise<{}> {
  const { data } = await axios.delete(`${id}`);
  return data;
}
