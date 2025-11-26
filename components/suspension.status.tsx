import { useGetDaysSinceLastPayment } from "@/lib/hooks/useGetDaysSinceLastPayment";
import { Badge } from "./ui/badge";

export default function SuspensionStatus({ accountId }: { accountId: string }) {
    const { data, error } = useGetDaysSinceLastPayment({ accountId })
    console.log({ status: data });
    if (error || !data){
        return (
            <Badge variant={'destructive' }>
                ---
            </Badge>
        )
    }

    if (data?.daysSinceLastPayment !== undefined) {
        return (
            <Badge variant={data?.suspensionRisk ? 'destructive' : 'success'}>
                {data.daysSinceLastPayment}
            </Badge>
        )
    }
}