import axios from "axios";
import { CreateAccount, GetAllResponseType, Payment } from "../types";

const serverUrl = process.env.SERVER || "http://localhost:3001";
console.log(serverUrl)

export async function getPayments(
): Promise<Payment[]> {
  try {
    const response = await axios.get(
      `${serverUrl}/api/payments/`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data from accounts:", error.message);
    return [];
  }
}

export async function createPayment(accountId: string) {
  try {
    const response = await axios.post(`${serverUrl}/api/payments/${ accountId}`);
    console.debug({ response })
    return response.data;
  } catch (error: any) {
    console.debug({ error })
    console.error("Error creating entry:", error.message);
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
