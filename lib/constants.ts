import { ChartConfig } from "@/components/ui/chart";
import { CircleAlert, TrendingDown, TrendingUp } from "lucide-react";
import { AccountType, AgeRange, Sex } from "./types";


// ------TABLE SECTION



export const tableHeaders = [
  { key: 'entry', label: 'Entry', className: 'w-[100px]' },
  { key: 'fullName', label: 'Full Name' },
  { key: 'status', label: 'Status' },
  { key: 'lastPayment', label: 'Last Payment' },
  { key: 'lastEntry', label: 'Last Entry' },
  { key: 'actions', label: '', className: 'justify-end' },
];


//------- CHART SECTION

export const chartConfigEntries = {
  views: {
    label: "Entries",
  },
  entries: {
    label: "Entries",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export const chartConfigRevenue = {
  views: {
    label: "Income",
  },
  income: {
    label: "Income",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export const chartConfigAccounts = {
  views: {
    label: "Accounts",
  },
  accounts: {
    label: "Accounts",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig


export const agePieChartConfig = {
  accounts: {
    label: "Accounts",
  },
  '18-25': {
    label: "18-25",
    color: "var(--chart-1)",
  },
  '25-35': {
    label: "25-35",
    color: "var(--chart-2)",
  },
  '35-45': {
    label: "35-45",
    color: "var(--chart-3)",
  },
  '45-70': {
    label: "45-70",
    color: "var(--chart-4)",
  }
} satisfies ChartConfig


export const ageColorMap: { [key in AgeRange]: string } = {
    '-18': 'var(--chart-1)',
    '18-25': 'var(--chart-3)',
    '25-35': 'var(--chart-2)',
    '35-45': 'var(--chart-5)',
    '45-70': 'var(--chart-4)',
};

export const sexPieChartConfig = {
  accounts: {
    label: "Accounts",
  },
  male: {
    label: "Male",
    color: "var(--chart-3)",
  },
  female: {
    label: "Female",
    color: "var(--chart-4)",
  }
} satisfies ChartConfig


export const sexColorMap: {[key in Sex]: string } = {
  male: 'var(--chart-3)',
  female: 'var(--chart-4)',
}

//-------------NOTIFICATION

interface NotificationInfo {
  title: "Suspension Alert" | "Revenue Dropdown";
  account?: AccountType;
  period?: string,
  icon: React.ComponentType<any> | null; // Allows null for no icon
  iconType: "suspension" | "dropdown";
  subtext: string;
}

export const notificationData: NotificationInfo[] = [
  {
    title: "Suspension Alert",
     // Assuming accounts[1] is a valid account
    icon: CircleAlert,
    iconType: "suspension",
    subtext: "Account about to be suspended",
  },
  {
    title: "Revenue Dropdown",
    period: "Last Week", // Added a period
    icon: TrendingDown,    // Changed icon to reflect revenue drop
    iconType: "dropdown",
    subtext: "Revenue decreased by 15% compared to the previous week", // More descriptive
  },
  {
    title: "Suspension Alert",
   // Added another suspension alert
    icon: CircleAlert,
    iconType: "suspension",
    subtext: "Account 3 is overdue on payments",
  },
  {
    title: "Revenue Dropdown",
    period: "Last Month", // Another revenue drop
    icon: TrendingDown,
    iconType: "dropdown",
    subtext: "Significant decrease in sales during the past month",
  },
];