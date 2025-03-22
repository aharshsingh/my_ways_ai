import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function MarksBreakupDialog({ isOpen, setIsOpen , marksBreakup}) {

    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Marks Breakup</DialogTitle>
              <DialogDescription>
                Here is the detailed breakup of the marks for the test
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="flex w-[60%] justify-between items-center gap-5">
                <Label htmlFor="name" className="text-right text-lg gap-4">
                  Accuracy :
                </Label>
                <Label htmlFor="name" className="text-right text-md">
                  {marksBreakup.accuracy}
                </Label>
              </div>

              <div className="flex w-[60%] justify-between items-center gap-5">
                <Label htmlFor="name" className="text-right text-lg gap-4">
                  Completeness :
                </Label>
                <Label htmlFor="name" className="text-right text-md">
                  {marksBreakup.completeness}
                </Label>
              </div>

              <div className="flex w-[60%]  justify-between items-center gap-5">
                <Label htmlFor="name" className="text-right text-lg gap-4">
                  Explaination :
                </Label>
                <Label htmlFor="name" className="text-right text-md">
                  {marksBreakup.explaination}
                </Label>
              </div>

              <div className="flex w-[60%] justify-between items-center gap-5">
                <Label htmlFor="name" className="text-right text-lg gap-4">
                  Practical Relevance :
                </Label>
                <Label htmlFor="name" className="text-right text-md">
                  {marksBreakup.practicalRelevance}
                </Label>
              </div>

              <div className="flex w-[60%] justify-between items-center gap-5">
                <Label htmlFor="name" className="text-right text-lg gap-4">
                  Consiceness :
                </Label>
                <Label htmlFor="name" className="text-right text-md">
                  {marksBreakup.consiceness}
                </Label>
              </div>

              <div className="flex w-[60%]   justify-between items-center gap-5">
                <Label htmlFor="name" className="text-right font-bold text-xl gap-4">
                  Total :
                </Label>
                <Label htmlFor="name" className="text-right font-bold text-lg">
                  {marksBreakup.total}
                </Label>
              </div>

            </div>
          </DialogContent>
        </Dialog>
      )
}
