import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainTable } from "./Table"
import { Metrics } from "./Metrics"
export default function NavTab() {
    return (
        <section className="pt-12 w-full flex h-auto items-center gap-2">
            <Tabs defaultValue="dashboard" className="px-16 w-full bg-transparent">
                <TabsList  className="bg-transparent">
                    <TabsTrigger value="dashboard" className="text-3xl font-sans p-5 data-[state=active]:shadow-none data-[state=active]:font-semibold font-thin">Dashboard</TabsTrigger>
                    <TabsTrigger value="metrics" className="text-3xl font-sans p-5 data-[state=active]:shadow-none  data-[state=active]:font-semibold font-thin">Metrics</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard" className="rounded-md min-h-[60vh] p-5">
                    <MainTable/>
                </TabsContent>
                <TabsContent value="metrics">
                    <Metrics/>
                </TabsContent>
            </Tabs>
        </section>

    )
    {/*
        IMPLEMENT  LOGIC
        
        */}
}