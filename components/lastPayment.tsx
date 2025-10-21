import { useGetLastPayment } from "@/lib/hooks/useGetLastPayment"

export default function LastPayment({accountId}: {accountId: string}){
    const {data, error} = useGetLastPayment({accountId})
    const response = new Date(data)  
     if(error) return '-';  
    return(
        <div>{data? response.toISOString().substring(0,10): "-"}</div>
    )
}