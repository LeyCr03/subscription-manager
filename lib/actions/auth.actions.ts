import axios from "axios";
import { CreateUserAccount, LogIn } from "../types";

const serverUrl = process.env.SERVER || "http://localhost:3001";
console.log(serverUrl)


export async function createUserAccount(data: CreateUserAccount) {
  const user = {
    name: data.name,
    password: data.password,
    email: data.email,
    image: data.profileImage || null
  };

  try {
    const response = await axios.post(`${serverUrl}/api/auth/register`, { ...user });
    console.debug('Data', response.data)
    return response.data;
  } catch (error: any) {
    console.debug({ error })
    console.error("Error creating account:", error.message);
    // Handle the error (e.g., show a user-friendly message)
  }
}

export async function logIn(data: LogIn){
    const user = {
        email: data.email,
        password: data.password
    };
    try {
    const response = await axios.post(`${serverUrl}/api/auth/login`, { ...user });
    console.debug('Data', response.data)
    return response.data;
  } catch (error: any) {
    console.debug({ error })
    console.error("Error login into account:", error.message);
    // Handle the error (e.g., show a user-friendly message)
  }
}