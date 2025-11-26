import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useGetAllActiveAccounts } from "@/lib/hooks/useGetActiveAccounts";
import { useGetAllNewCustomers } from "@/lib/hooks/useGetAllNewCustomers";
import { useGetAllMonthEntries } from "@/lib/hooks/useGetTotalMonthEntries";
import { useGetTotalRevenue } from "@/lib/hooks/useGetTotalRevenue";
import { TrendingDown, TrendingUp } from "lucide-react";

//get total revenue
//get new customers
//get active accounts
//total entries




export function SectionCards() {
  const subscriptionPrice = 600;
  const pricePerEntry = 30;
  const { data: revenue } = useGetTotalRevenue({ subscriptionPrice, pricePerEntry });
  const { data: customers } = useGetAllNewCustomers();
  const { data: active } = useGetAllActiveAccounts();
  const { data: entries } = useGetAllMonthEntries();
  return (
    <div className="grid grid-cols-4 gap-5 py-10">
      <Card className="@container/card border-none">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {revenue}
          </CardTitle>
          <CardAction>
            <Badge
              variant={revenue > 0 ? 'success' : 'destructive'
              }
            >
              {revenue > 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              ?
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {revenue > 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            <div className="text-muted-foreground">Last month revenue</div>
          </div>

        </CardFooter>
      </Card>
      <Card className="@container/card border-none">
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {customers}
          </CardTitle>
          <CardAction>
            <Badge
              variant={
                customers > 60 ? 'success' : 'destructive'
              }
            >
              {customers > 60 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              percent
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {customers > 60 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            <div className="text-muted-foreground">Recently registered accounts</div>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card border-none">
        <CardHeader>
          <CardDescription>All Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {active}
          </CardTitle>
          <CardAction>
            <Badge
              variant={
                active > customers / 2 ? 'success' : 'destructive'
              }
            >
              {active > customers / 2 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              percent
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {active > customers / 2 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            <div className="text-muted-foreground">Engagement from customers</div>
          </div>

        </CardFooter>
      </Card>
      <Card className="@container/card border-none">
        <CardHeader>
          <CardDescription>Total Entries</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {entries}
          </CardTitle>
          <CardAction>
            <Badge
              variant={
                entries > active * 10 *3 ? 'success' : 'destructive'
              }
            >
              {entries > active * 10 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              percent
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {entries > active * 10 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            <div className="text-muted-foreground">All visits of the last 3 months</div>

          </div>
        </CardFooter>
      </Card>
    </div>
  );
}