import axios from "axios";
import { GetAllResponseType } from "../types";

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

export async function createAccount(formData: FormData) {
  const account = {
    fullName: formData.get("fullName"),
    sex: formData.get("sex"),
    age: formData.get("age"),
  };

  try {
    const response = await axios.post(`${serverUrl}/api/accounts`, { account });
    return response.data;
  } catch (error: any) {
    console.error("Error creating account:", error.message);
    // Handle the error (e.g., show a user-friendly message)
  }
}

export async function editAccount(formData: FormData, id: string) {
  const account = {
    status: formData.get("status"),
  };

  try {
    const response = await axios.put(`${serverUrl}/api/accounts/${id}`, { account });
    return response.data;
  } catch (error: any) {
    console.error("Error updating account status:", error.message);
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
