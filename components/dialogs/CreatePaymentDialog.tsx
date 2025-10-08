"use client"

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { BookCheck, CircleDollarSignIcon, DollarSign } from "lucide-react";
import { createPayment } from "@/lib/actions/payment.actions";

export default function CreatePayment({ accountId, name }: { accountId: string, name: string }) {
    //TODO: has payid already
    const { mutate, isPending, isError, isSuccess } = useMutation({ mutationFn: createPayment });
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
    return (
        <AlertDialog onOpenChange={() => setIsOpen(!isOpen)} open={isOpen} >
            <AlertDialogTrigger disabled={(isSelected)}>
                <DollarSign  />
            </AlertDialogTrigger>
            <AlertDialogContent className="p-4 ">
                <div className=" gap-3 flex flex-col items-center">
                    <AlertDialogHeader className="items-center pt-5">
                        <CircleDollarSignIcon size={40} color="#59AC77" />
                        <AlertDialogTitle className="text-2xl">Register Payment</AlertDialogTitle>
                        <AlertDialogDescription className="text-md">Set payment date for: <span className="font-bold">{name}</span></AlertDialogDescription>
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