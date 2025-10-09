import { useGetLastPayment } from "@/lib/hooks/useGetLastPayment"

export default function LastPayment({accountId}: {accountId: string}){
    const {data} = useGetLastPayment({accountId})
    const response = new Date(data)    
    return(
        <div>{data? response.toISOString().substring(0,10): " "}</div>
    )
}