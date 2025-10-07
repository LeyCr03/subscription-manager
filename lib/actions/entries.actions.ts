import axios from "axios";
import { Entry } from "../types";

const serverUrl = process.env.SERVER || "http://localhost:3001";
console.log(serverUrl)

export async function getEntriesAfterLastPayment( id: string
): Promise<Entry[]> {
  try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/entries/afterLastPayment/${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return [];
  }
}

export async function createEntry(accountId: string) {
 
  try {
    const response = await axios.post(`${serverUrl}/api/entries/${ accountId}`);
    console.debug({ response })
    return response.data;
  } catch (error: any) {
    console.debug({ error })
    console.error("Error creating entry:", error.message);
    // Handle the error (e.g., show a user-friendly message)
  }
}


export async function deleteEntry(id: string) {
  try {
    const response = await axios.delete(`${serverUrl}/api/entries/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting entry:", error.message);
  }
}
