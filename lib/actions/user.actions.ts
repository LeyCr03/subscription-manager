import axios from "axios";
import { UpdateUser, UserId } from "../types";
import { email } from "zod";

const serverUrl = process.env.SERVER || "http://localhost:3001";
console.log(serverUrl)

export async function update( data: UpdateUser ){
  const user = {
    id: data.id, 
    name: data.name,
    email: data.email,
    password: data.password,
  }
 try {
    const response = await axios.put(
      `${serverUrl}/api/users/${user.id}?name=${user.name}`
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
    const response = await axios.delete(`${serverUrl}/api/users/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error suspending account:", error.message);
  }
}