import axios from "axios";

const serverUrl = process.env.SERVER || "http://localhost:3001";
console.log(serverUrl)
//!fix
export async function getNotifications(){
   try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/suspension/report`
    )
    return response.data
  } catch (error: any) {
    console.debug({ error })

    throw new Error('Not found', error);
  }  
}