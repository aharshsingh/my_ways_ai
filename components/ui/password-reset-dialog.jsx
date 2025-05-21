import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react";
import { OTPInput } from "input-otp";

function PasswordResetDialog({isDialogOpen, setIsDialogOpen}) {
function Slot(props) {
  return (
    <div
      className={
        "flex size-9 items-center justify-center rounded-lg border border-input bg-background font-medium text-foreground shadow-sm shadow-black/5 transition-shadow" +
        (props.isActive ? " z-10 border border-ring ring-[3px] ring-ring/20" : "")
      }
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
    const [step,setStep] = useState("email");
    const[email, setEmail] = useState("");
    const [value, setValue] = useState("");
  return (
    <>
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>

      {step === "email" && ( <DialogContent className="w-[30rem] h-[20rem] p-5">
        <div className="mb-2 flex flex-col items-center gap-2 ">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
       <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <circle cx="12" cy="16" r="1" />
        </svg>

          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Locked out? No worries! 🔒</DialogTitle>
            <DialogDescription className="sm:text-center text-md">
           Just enter your email and we’ll send you a key. 🔐✨
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <div className="relative">
              <Input
                id="dialog-subscribe"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="peer ps-9"
                placeholder="hi@yourcompany.com"
                type="email"
                aria-label="Email"
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <Mail size={16} strokeWidth={2} aria-hidden="true" />
              </div>
            </div>
          </div>
          <Button onClick={()=>setStep("OTP")} type="button" className="w-full bg-[#5862b2] hover:bg-[#5862b2]">
            Get OTP
          </Button>
        </form>
      </DialogContent>)}

    {step === "OTP" && (   <DialogContent  className=" w-[30rem] h-[20rem] p-5">
       <DialogHeader>
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
              aria-hidden="true">
               <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
          </div>
          <DialogTitle className="sm:text-center">We’ve sent your secret code to xyz@email.com</DialogTitle>
        </DialogHeader>
          <div className="space-y-5 items-center justify-center flex flex-col">
            <div className="flex justify-center">
             <OTPInput
                id="cofirmation-code"
                value={value}
                onChange={setValue}
                containerClassName="flex items-center gap-3 has-[:disabled]:opacity-50"
                maxLength={4}
                render={({ slots }) => (
                  <div className="flex gap-2">
                    {slots.map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                    ))}
                  </div>
                )}
                // onComplete={onSubmit}
              />
            </div>
            <Button type="button" className="w-[50%] bg-[#5862b2] hover:bg-[#5862b2]" onClick={()=>{setStep("password") }}>
            Submit
          </Button>
            <p className="text-center text-sm">
              <a className="underline hover:no-underline" href="#">
                Resend code
              </a>
            </p>
          </div>
      </DialogContent>)}

   
      {step === "password" && ( <DialogContent className="w-[30rem] h-[20rem] ">
        
              <DialogHeader>
                <DialogTitle className="text-[#606dd3] font-bold">Set a New Password</DialogTitle>
                <DialogDescription>
                Make it strong. Make it memorable
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-start justify-start gap-4 py-4 ">
                <div className="flex w-full items-center justify-between gap-4">
                  <Label htmlFor="name" className=" text-nowrap">
                    New Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="*******"
                 className="w-[70%]"
                  />
                </div>
                <div className="flex items-center gap-4 w-full">
                  <Label htmlFor="username" className="text-right text-nowrap">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    placeholder="*******"
                    className="w-[80%]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className=" bg-[#5862b2] hover:bg-[#5862b2]">Update Password</Button>
              </DialogFooter>
            </DialogContent>)}
    </Dialog>
    
    </>
  );
}

export { PasswordResetDialog };
