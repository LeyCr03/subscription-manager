import axios from "axios";
import { CreateAccount, GetAllResponseType, SuspensionResponse, UpdateAccount, UserId } from "../types";

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
  }
}

export async function getLasPayment(accountId: string) {
  try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/last/payment/${accountId}`
    )
    return response.data || null
  } catch (error: any) {
    console.debug({ error })
    throw new Error('Not found', error);
  }
}

export async function getLasEntry(accountId: string) {
  try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/last/entry/${accountId}`
    )
    console.log({ response })
    return response.data
  } catch (error: any) {

    throw new Error('Not found', error);
  }
}

export async function update( data: UpdateAccount ){
  const account = {
    id: data.id, 
    name: data.name
  }
 try {
    const response = await axios.put(
      `${serverUrl}/api/accounts/${account.id}?name=${account.name}`
    )
    console.log({ response })
    return response.data
  } catch (error: any) {

    throw new Error('Update Error', error);
  } 
}

export async function suspend(id: UserId) {
  const userId = id.id
  try {
    const response = await axios.put(`${serverUrl}/api/accounts/suspend/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error suspending account:", error.message);
  }
}

export async function getFrequency(id: string) {
  try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/frequency/${id}`
    )
    return response.data
  } catch (error: any) {
    console.debug({ error })
    throw new Error('Not found', error);
  }
}

export async function getRevenue(
  id: string,
  pricePerEntry: number,
  subscriptionPrice: number) {
  try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/revenue/${id}?pricePerEntry=${pricePerEntry}&subscriptionPrice=${subscriptionPrice}`
    )
    return response.data
  } catch (error: any) {
    console.debug({ error })

    throw new Error('Not found', error);
  }
}

export async function getDaysSinceLastPayment(id: string): Promise<SuspensionResponse> {
  try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/suspension/status/${id}`
    )
    //  console.log({res: response.data})
    return response.data
  } catch (error: any) {
    console.debug({ error })
    // Handle the error (e.g., show a user-friendly message)
    throw new Error('Not found', error);
  }
}

export async function searchAccounts(
  page: number,
  limit: number,
  search: string
): Promise<GetAllResponseType> {
  try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/filter/by?page=${page}&limit=${limit}&search=${search}`
    )
    //  console.log({res: response.data})
    return response.data
  } catch (error: any) {
    console.debug({ error })
    return {
      accounts: [],
      total: 0,
    };
  }
}
export async function totalRevenue(
  pricePerEntry: number,
  subscriptionPrice: number
) {
  try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/total/revenue?pricePerEntry=${pricePerEntry}&subscriptionPrice=${subscriptionPrice}`
    )
    return response.data
  } catch (error: any) {
    console.debug({ error })

    throw new Error('Not found', error);
  }

}

export async function getNewCustomers() {
    try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/new/customers`
    )
    return response.data
  } catch (error: any) {
    console.debug({ error })

    throw new Error('Not found', error);
  }
}

export async function getActiveAccounts() {
 try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/all/active`
    )
    return response.data
  } catch (error: any) {
    console.debug({ error })

    throw new Error('Not found', error);
  }
}





