import { notificationData } from "@/lib/constants";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemTitle } from "./ui/item";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRightCircleIcon, ArrowRightIcon } from "lucide-react";

export function Notifications() {
  return (
     <div className="flex flex-col gap-6">
      {notificationData.map((notification, index) => (
      <Item key={index}>
        <ItemContent>
          <ItemTitle>{notification.account ? notification.account.name : notification.period}</ItemTitle>
          <ItemDescription className="text-destructive">
            {notification.title}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge variant={'destructive'}>
           <ArrowRightIcon size={30}/>
          </Badge>
        </ItemActions>
        <ItemFooter>
          <p>{notification.subtext}</p>
        </ItemFooter>
        
      </Item>
      ))}
    </div>
  );
}