import axios from "axios";
import { CreateAccount, GetAllResponseType } from "../types";

const serverUrl = process.env.SERVER || "http://localhost:3001";
console.log(serverUrl)

export async function getAccounts(
  currentPage: number,
  pageSize: number
): Promise<GetAllResponseType> {
  try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/by/registration?page=${currentPage}&limit=${pageSize}`
    );
    console.debug("Data from API:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data from accounts:", error.message);
    return {
      accounts: [],
      total: 0,
    };
  }
}
export async function createAccount(data: CreateAccount) {
  const account = {
    name: data.name,
    birth: data.birth,
    age: data.age,
    sex: data.sex,
  };

  try {
    const response = await axios.post(`${serverUrl}/api/accounts`, { ...account });
    console.debug('Data', response.data)
    return response.data;
  } catch (error: any) {
    console.debug({ error })
    console.error("Error creating account:", error.message);
    // Handle the error (e.g., show a user-friendly message)
  }
}

export async function getLasPayment(accountId: string){
  try{
    const response = await axios.get(
      `${serverUrl}/api/accounts/last/payment/${accountId}`
    )
    return response.data || null
  } catch (error: any) {
    console.debug({ error })
    console.error("Error fetching last payment:", error.message);
    // Handle the error (e.g., show a user-friendly message)
  }
}

export async function getLasEntry(accountId: string){
  try{
    const response = await axios.get(
      `${serverUrl}/api/accounts/last/entry/${accountId}`
    )
    return response.data
  } catch (error: any) {
    console.debug({ error })
    console.error("Error fetching last entry:", error.message);
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
