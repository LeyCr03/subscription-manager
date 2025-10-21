import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { success } from "zod";

//get total revenue
//get new customers
//get active accounts
//total entries




export function SectionCards() {
const value = true
  return (
   <div className="grid grid-cols-4 gap-5 py-10">
        <Card className="@container/card border-none">
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              value
            </CardTitle>
            <CardAction>
              <Badge
                variant={
                  'success'
                }
              >
                {value ? <TrendingUp className="h-4 w-4 mr-1"/> : <TrendingDown/> }
                percent
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
                {value ? <TrendingUp className="h-4 w-4 mr-1"/> : <TrendingDown/> }
            </div>
            <div className="text-muted-foreground">Last month revenue</div>
          </CardFooter>
        </Card>
        <Card className="@container/card border-none">
          <CardHeader>
            <CardDescription>New Customers</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              value
            </CardTitle>
            <CardAction>
              <Badge
                variant={
                  'success'
                }
              >
                {value ? <TrendingUp className="h-4 w-4 mr-1"/> : <TrendingDown/> }
                percent
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
                {value ? <TrendingUp className="h-4 w-4 mr-1"/> : <TrendingDown/> }
            </div>
            <div className="text-muted-foreground">Recently registered accounts</div>
          </CardFooter>
        </Card>
        <Card className="@container/card border-none">
          <CardHeader>
            <CardDescription>All Active Accounts</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              value
            </CardTitle>
            <CardAction>
              <Badge
                variant={
                  'success'
                }
              >
                {value ? <TrendingUp className="h-4 w-4 mr-1"/> : <TrendingDown/> }
                percent
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
                {value ? <TrendingUp className="h-4 w-4 mr-1"/> : <TrendingDown/> }
            </div>
            <div className="text-muted-foreground">Engagement from customers</div>
          </CardFooter>
        </Card>
        <Card className="@container/card border-none">
          <CardHeader>
            <CardDescription>Total Entries</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              value
            </CardTitle>
            <CardAction>
              <Badge
                variant={
                  'success'
                }
              >
                {value ? <TrendingUp className="h-4 w-4 mr-1"/> : <TrendingDown/> }
                percent
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
                {value ? <TrendingUp className="h-4 w-4 mr-1"/> : <TrendingDown/> }
            </div>
            <div className="text-muted-foreground">All visits of the last 3 months</div>
          </CardFooter>
        </Card>
    </div>
  );
}