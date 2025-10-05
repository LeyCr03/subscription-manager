import axios from "axios";
import { CreateAccount, GetAllResponseType } from "../types";

const serverUrl = process.env.SERVER || "http://localhost:3001";
console.log(serverUrl)

export async function getAccounts(
  currentPage: number,
  searchParam: string
): Promise<GetAllResponseType> {
  try {
    const response = await axios.get(
      `${serverUrl}/api/accounts?page=${currentPage}&limit=5&search=${searchParam}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data from accounts:", error.message);
    // Return an empty array or handle the error as needed
    return {
      accounts: [],
      nextPage: null,
      previousPage: null,
      total: 0,
      currentPage: 0,
      pageSize: 0,
    };
  }
}

export async function createAccount(data: CreateAccount) {
  const account = {
    name: data.name,
    birth: data.birth,
    age: data.age,
    sex: data.sex,
    registere_at: data.registered_at
  };

  try {
    const response = await axios.post(`${serverUrl}/api/accounts`, { account });
    return response.data;
  } catch (error: any) {
    console.error("Error creating account:", error.message);
    // Handle the error (e.g., show a user-friendly message)
  }
}


export async function deleteAccount(id: string) {
  try {
    const response = await axios.delete(`${serverUrl}/api/accounts/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting account:", error.message);
  }
}
