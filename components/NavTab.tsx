import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
export default function NavTab() {
    return (


        <header className="flex h-(--header-height) items-center gap-2 border-b">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
        </header>

    )
    {/*
        IMPLEMENT  LOGIC
        
        */}
}