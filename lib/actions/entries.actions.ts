import axios from "axios";
import { Entry } from "../types";

const serverUrl = process.env.SERVER || "http://localhost:3001";
console.log(serverUrl)

export async function getDatesAfterLastPayDay(id: string): Promise<Date[]>{
    try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/dates/after/payment/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
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



export async function totalEntries() {
  
 try {
    const response = await axios.get(
      `${serverUrl}/api/entries/tree/month`
    )
    console.log(response.data)
    return response.data
  } catch (error: any) {
    console.debug({ error })

    throw new Error('Not found', error);
  }
}