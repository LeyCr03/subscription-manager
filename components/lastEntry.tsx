import { useGetLastEntry } from "@/lib/hooks/useGetLastEntry"

export default function LastEntry({accountId}: {accountId: string}){
    const {data, error} = useGetLastEntry({accountId})

    if(error) return '-';

   const response = new Date(data)    
    return(
        <div>{data? response.toISOString().substring(0,10): "-"}</div>
    )
}