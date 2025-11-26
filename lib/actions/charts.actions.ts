import axios from "axios";
import { AgeRange, Sex } from "../types";

const serverUrl = process.env.SERVER || "http://localhost:3001";
console.log(serverUrl)

export interface EntryChartData {
  date: Date;
  entries: number;
}
export interface RevenueChartData {
  date: Date;
  revenue: number;
}

export interface AccountsChartData {
  date: Date;
  accounts: number;
}

export interface AgePieChartData {
  age: AgeRange;
  accounts: number;
}

export interface SexPieChartData {
  sex: Sex;
  accounts: number;
}

export async function entryChart(): Promise<EntryChartData[]> {
  try {
    const response = await axios.get(
      `${serverUrl}/api/entries/month/data`
    )
    return response.data
  } catch (error: any) {
    console.debug({ error })

    throw new Error('Not found', error);
  }
}

export async function newAccountsChart(): Promise<AccountsChartData[]> {
  try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/month/customers/data`
    )
    return response.data
  } catch (error: any) {
    console.debug({ error })

    throw new Error('Not found', error);
  }

}// api/payments/revenue/data?subscriptionPrice=30
export async function revenueChart(subscriptionPrice: number): Promise<RevenueChartData[]> {
  subscriptionPrice = 600;
  try {
    const response = await axios.get(
      `${serverUrl}/api/payments/revenue/data?subscriptionPrice=${subscriptionPrice}`
    )
    return response.data
  } catch (error: any) {
    console.debug({ error })

    throw new Error('Not found', error);
  }
}

export async function agePieChart() : Promise<AgePieChartData[]>{
  try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/age/data`
    )
    return response.data
  } catch (error: any) {
    console.debug({ error })

    throw new Error('Not found', error);
  }
}
export async function sexPieChart()  {
  try {
    const response = await axios.get(
      `${serverUrl}/api/accounts/sex/data`
    )
    return response.data
  } catch (error: any) {
    console.debug({ error })

    throw new Error('Not found', error);
  }
}