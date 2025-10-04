import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cardData } from "@/lib/constants";
import { cn } from "@/lib/utils";


export function SectionCards() {
  return (
   <div className="grid grid-cols-4 gap-5 py-10">
      {cardData.map((card, index) => (
        <Card key={index} className="@container/card border-none">
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge
                variant="outline"
                className={cn(
                  card.trendDirection === "up" ? "bg-green-400 text-white border-green-400" : "bg-red-500 text-white border-red-500"
                )}
              >
                {card.trendIcon ? <card.trendIcon className="h-4 w-4 mr-1" /> : null}
                {card.trendPercentage}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.trendText}
              {card.trendIcon ? <card.trendIcon className="size-4" /> : null}
            </div>
            <div className="text-muted-foreground">{card.subtext}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}