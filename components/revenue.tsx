import { useGetRevenue } from "@/lib/hooks/useGetRevenue"
import { Badge } from "./ui/badge";

export default function Revenue({ accountId }: { accountId: string }) {
    const pricePerEntry = 30;
    const subscriptionPrice = 600;
    const { data, error } = useGetRevenue({ accountId, pricePerEntry, subscriptionPrice })
    console.log({ data });

    if (error || !data ) {
        return (
            <Badge variant={'destructive'}>
                No revenue
            </Badge>
        )
    }

    return (
        <Badge variant={data > 100 ? 'success' : 'destructive'}>
            {data ? data : "600"}
        </Badge>
    )
}