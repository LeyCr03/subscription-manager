import { notificationData } from "@/lib/constants";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export function Notifications() {
  return (
   <div className="flex flex-col gap-2">
      {notificationData.map((notification, index) => (
        <Card key={index} className="w-full border-none">
          <CardHeader>
            <CardDescription>{notification.title}</CardDescription>
            <CardTitle className="text-md font-sand">
              {notification.account ? notification.account.name : notification.period}
            </CardTitle>
            <CardAction>
             
                {notification.icon ? <notification.icon size={40} color="#DD0303" /> : null}
              
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">{notification.subtext}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}