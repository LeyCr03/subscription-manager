"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Eclipse, PenIcon, UserRound } from "lucide-react"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import UserDetails from "./userDetails"
import { useState, useEffect } from 'react';
import { useTheme } from "next-themes"
import { useAuth } from "@/context"
import { UserType } from "@/lib/types"

export default function Header() {

    const { getUser, user: authUser, logout } = useAuth();
    const [userData, setUserData] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { theme, setTheme } = useTheme();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const fetchedUser = await getUser();
                if (fetchedUser) {
                    setUserData(fetchedUser);
                } else {
                    setError("Failed to fetch user data. Please log in again.");
                    setUserData(null);
                }
            } catch (e) {
                console.error("Error in UserDetails component:", e);
                setError("An unexpected error occurred while fetching user data.");
                setUserData(null);
                logout();
            } finally {
                setIsLoading(false);
            }
        };
        if (authUser) {
            setUserData(authUser);
            setIsLoading(false);
        } else {
            fetchUserData();
        }

    }, [getUser, authUser, logout]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <p>Loading user details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-full text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="flex justify-center items-center h-full text-muted-foreground">
                <p>No user data available. Please log in.</p>
            </div>
        );
    }

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const isDarkMode = theme === 'dark';

    const handleLogout = async () => {
        await logout();
        window.location.reload();
    }


    return (
        <header className="flex py-5 items-center gap-2 border-b">
            <div className="mb-1 flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <UserDetails user={userData} />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-6"
                />
                <Label className="font-sans text-2xl">{userData.name}</Label>
                <div className="ml-auto flex items-center gap-2">
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        asChild size="sm" className=" sm:flex">
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

                    {isDarkMode ? <Eclipse className="h-6 w-6" /> : <Eclipse className="h-6 w-6" />}
                </div>
            </div>
        </header>

    )

}
