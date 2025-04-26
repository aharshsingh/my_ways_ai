import React from 'react'
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import axios from "axios";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const deleteTest=async(fetchTests,testId)=>{
  try {
    const response = await axios.delete(`https://intervu-ai-beige.vercel.app/api/admin/deletedTest/${testId}`)
    if(response.status === 200)
    {
      toast.success("Test Deleted Successfully");
      setIsOpen(false);
      fetchTests();
      return
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Couldn't delete Test! Try again")
  }
}
export default function AlertDialogBox({ testId,isOpen, setIsOpen,fetchTests }) {
return (
  <>
  <Toaster richColors position="top-center" />
    <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <AlertDialogContent>
        <AlertDialogHeader className="mb-4 items-center gap-2 md:flex-row md:items-start md:gap-4">
          <div
            aria-hidden="true"
            className="shrink-0 rounded-full bg-red-50 p-3 dark:bg-red-900"
          >
            <Trash2 className="size-5 text-red-600 dark:text-red-200" />
          </div>
          <div className="flex flex-col gap-2">
            <AlertDialogTitle>Delete Test?</AlertDialogTitle>
            <AlertDialogDescription>
              Deleting your Test is irreversible and will erase all your
              data. This action cannot be undone.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteTest(fetchTests,testId)}
            className={buttonVariants({ variant: "destructive" })}
          >
            Delete Test
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}

