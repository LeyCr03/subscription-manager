import { useGetLastPayment } from "@/lib/hooks/useGetLastPayment"

export default function LastPayment({accountId}: {accountId: string}){
    const {data} = useGetLastPayment({accountId})
    return(
        <div>{data}</div>
    )
}