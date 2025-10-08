"use client"

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { BookCheck } from "lucide-react";
import { createEntry } from "@/lib/actions/entries.actions";

export default function CreateEntry({ accountId, name }: { accountId: string, name: string }) {

    //TODO: has entered already

    const { mutate, isPending, isError, isSuccess } = useMutation({ mutationFn: createEntry });
    const [isSelected, setIsSelected] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hasBeenSelectedBefore, setHasBeenSelectedBefore] = useState(false);
    const currentDate = new Date();


    const onSubmit = async (accountId: string) => {
        mutate(
            accountId
            , {
                onSuccess: (data) => {
                    console.log(data)
                    setIsOpen(false)
                    // toast('Hello', {success: {message: ''}})
                    setIsSelected(true)
                },
                onError: (error) => {
                    //toast("Failed", {type: 'error'})
                }
            });
    };
    
    const handleCheckboxChange = () => {
        setIsSelected(!isSelected);
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Checkbox
                    checked={isSelected}
                    disabled={isSelected && !isOpen} // Disable if selected and dialog is not open
                />
            </AlertDialogTrigger>
            <AlertDialogContent className="p-4 ">
                <div className=" gap-3 flex flex-col items-center">
                    <AlertDialogHeader className="items-center pt-5">
                        <BookCheck size={30} />
                        <AlertDialogTitle className="text-2xl">Register Entry</AlertDialogTitle>
                        <AlertDialogDescription className="text-md">Set an entry for: <span className="font-bold">{name}</span></AlertDialogDescription>
                    </AlertDialogHeader>
                    <Label className="flex text-4xl font-bold  text-gray-800 justify-center  rounded-xl h-50 w-full max-w-sm border border-dotted border-black">{currentDate.toLocaleDateString()}</Label>
                    <AlertDialogFooter className=" p-3">
                        <AlertDialogAction>
                            <Button onClick={() => (onSubmit(accountId))}>Submit</Button>
                        </AlertDialogAction>

                        <AlertDialogCancel asChild>
                            <Button variant={"outline"}>  Cancel</Button>
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}