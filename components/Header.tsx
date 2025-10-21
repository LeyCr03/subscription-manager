"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Eclipse, PenIcon, UserRound } from "lucide-react"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import UserDetails from "./userDetails"
import { useState, useEffect } from 'react';
import { useTheme } from "next-themes"

export default function Header() {

    //TODO: get user data
    //logout

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const isDarkMode = theme === 'dark';


    return (
        <header className="flex py-5 items-center gap-2 border-b">
            <div className="mb-1 flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <UserDetails />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-6"
                />
                <Label className="font-sans text-2xl">UserName</Label>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" asChild size="sm" className="hidden sm:flex">
                        <a
                            className="dark:text-foreground"
                        >
                            Logout
                        </a>
                    </Button>

                    <Switch
                        id="mode"
                        className="h-5"
                        checked={isDarkMode}
                        onCheckedChange={toggleTheme} />

                    {isDarkMode ? <Eclipse className="h-6 w-6"/> : <Eclipse className="h-6 w-6"  />}
                </div>
            </div>
        </header>

    )

}
