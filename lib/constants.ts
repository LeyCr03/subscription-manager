import { ChartConfig } from "@/components/ui/chart";
import { ArrowDown, CircleAlert, TrendingDown, TrendingUp } from "lucide-react";
import { AccountType } from "./types";


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

export const chartData = [
  { date: "2024-04-01", accounts: 222, others: 150 },
  { date: "2024-04-02", accounts: 97, others: 180 },
  { date: "2024-04-03", accounts: 167, others: 120 },
  { date: "2024-04-04", accounts: 242, others: 260 },
  { date: "2024-04-05", accounts: 373, others: 290 },
  { date: "2024-04-06", accounts: 301, others: 340 },
  { date: "2024-04-07", accounts: 245, others: 180 },
  { date: "2024-04-08", accounts: 409, others: 320 },
  { date: "2024-04-09", accounts: 59, others: 110 },
  { date: "2024-04-10", accounts: 261, others: 190 },
  { date: "2024-04-11", accounts: 327, others: 350 },
  { date: "2024-04-12", accounts: 292, others: 210 },
  { date: "2024-04-13", accounts: 342, others: 380 },
  { date: "2024-04-14", accounts: 137, others: 220 },
  { date: "2024-04-15", accounts: 120, others: 170 },
  { date: "2024-04-16", accounts: 138, others: 190 },
  { date: "2024-04-17", accounts: 446, others: 360 },
  { date: "2024-04-18", accounts: 364, others: 410 },
  { date: "2024-04-19", accounts: 243, others: 180 },
  { date: "2024-04-20", accounts: 89, others: 150 },
  { date: "2024-04-21", accounts: 137, others: 200 },
  { date: "2024-04-22", accounts: 224, others: 170 },
  { date: "2024-04-23", accounts: 138, others: 230 },
  { date: "2024-04-24", accounts: 387, others: 290 },
  { date: "2024-04-25", accounts: 215, others: 250 },
  { date: "2024-04-26", accounts: 75, others: 130 },
  { date: "2024-04-27", accounts: 383, others: 420 },
  { date: "2024-04-28", accounts: 122, others: 180 },
  { date: "2024-04-29", accounts: 315, others: 240 },
  { date: "2024-04-30", accounts: 454, others: 380 },
  { date: "2024-05-01", accounts: 165, others: 220 },
  { date: "2024-05-02", accounts: 293, others: 310 },
  { date: "2024-05-03", accounts: 247, others: 190 },
  { date: "2024-05-04", accounts: 385, others: 420 },
  { date: "2024-05-05", accounts: 481, others: 390 },
  { date: "2024-05-06", accounts: 498, others: 520 },
  { date: "2024-05-07", accounts: 388, others: 300 },
  { date: "2024-05-08", accounts: 149, others: 210 },
  { date: "2024-05-09", accounts: 227, others: 180 },
  { date: "2024-05-10", accounts: 293, others: 330 },
  { date: "2024-05-11", accounts: 335, others: 270 },
  { date: "2024-05-12", accounts: 197, others: 240 },
  { date: "2024-05-13", accounts: 197, others: 160 },
  { date: "2024-05-14", accounts: 448, others: 490 },
  { date: "2024-05-15", accounts: 473, others: 380 },
  { date: "2024-05-16", accounts: 338, others: 400 },
  { date: "2024-05-17", accounts: 499, others: 420 },
  { date: "2024-05-18", accounts: 315, others: 350 },
  { date: "2024-05-19", accounts: 235, others: 180 },
  { date: "2024-05-20", accounts: 177, others: 230 },
  { date: "2024-05-21", accounts: 82, others: 140 },
  { date: "2024-05-22", accounts: 81, others: 120 },
  { date: "2024-05-23", accounts: 252, others: 290 },
  { date: "2024-05-24", accounts: 294, others: 220 },
  { date: "2024-05-25", accounts: 201, others: 250 },
  { date: "2024-05-26", accounts: 213, others: 170 },
  { date: "2024-05-27", accounts: 420, others: 460 },
  { date: "2024-05-28", accounts: 233, others: 190 },
  { date: "2024-05-29", accounts: 78, others: 130 },
  { date: "2024-05-30", accounts: 340, others: 280 },
  { date: "2024-05-31", accounts: 178, others: 230 },
  { date: "2024-06-01", accounts: 178, others: 200 },
  { date: "2024-06-02", accounts: 470, others: 410 },
  { date: "2024-06-03", accounts: 103, others: 160 },
  { date: "2024-06-04", accounts: 439, others: 380 },
  { date: "2024-06-05", accounts: 88, others: 140 },
  { date: "2024-06-06", accounts: 294, others: 250 },
  { date: "2024-06-07", accounts: 323, others: 370 },
  { date: "2024-06-08", accounts: 385, others: 320 },
  { date: "2024-06-09", accounts: 438, others: 480 },
  { date: "2024-06-10", accounts: 155, others: 200 },
  { date: "2024-06-11", accounts: 92, others: 150 },
  { date: "2024-06-12", accounts: 492, others: 420 },
  { date: "2024-06-13", accounts: 81, others: 130 },
  { date: "2024-06-14", accounts: 426, others: 380 },
  { date: "2024-06-15", accounts: 307, others: 350 },
  { date: "2024-06-16", accounts: 371, others: 310 },
  { date: "2024-06-17", accounts: 475, others: 520 },
  { date: "2024-06-18", accounts: 107, others: 170 },
  { date: "2024-06-19", accounts: 341, others: 290 },
  { date: "2024-06-20", accounts: 408, others: 450 },
  { date: "2024-06-21", accounts: 169, others: 210 },
  { date: "2024-06-22", accounts: 317, others: 270 },
  { date: "2024-06-23", accounts: 480, others: 530 },
  { date: "2024-06-24", accounts: 132, others: 180 },
  { date: "2024-06-25", accounts: 141, others: 190 },
  { date: "2024-06-26", accounts: 434, others: 380 },
  { date: "2024-06-27", accounts: 448, others: 490 },
  { date: "2024-06-28", accounts: 149, others: 200 },
  { date: "2024-06-29", accounts: 103, others: 160 },
  { date: "2024-06-30", accounts: 446, others: 400 },

]

export const chartConfig = {
  views: {
    label: "Entries",
  },
  accounts: {
    label: "Accounts",
    color: "var(--chart-2)",
  },
  others: {
    label: "Others",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig


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