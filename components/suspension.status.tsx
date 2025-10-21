import { useGetDaysSinceLastPayment } from "@/lib/hooks/useGetDaysSinceLastPayment";
import { Badge } from "./ui/badge";

export default function SuspensionStatus({ accountId }: { accountId: string }) {
    const { data } = useGetDaysSinceLastPayment({ accountId })
    console.log({ status: data });

    if(data?.daysSinceLastPayment  !== undefined) {
        return (
            <Badge variant={data?.suspensionRisk ? 'destructive' : 'success'}>
                {data.daysSinceLastPayment}
            </Badge>
        )
    }
}