import axios from "axios";
import { CreateAccount, GetAllResponseType } from "../types";

const serverUrl = process.env.SERVER || "http://localhost:3001";
console.log(serverUrl)

export async function getAccounts(
): Promise<GetAllResponseType> {
  try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/by/registration`
    );
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
    console.debug({ response })
    return response.data;
  } catch (error: any) {
    console.debug({ error })
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
