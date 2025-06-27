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
import { Loader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react";
import { OTPInput } from "input-otp";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from 'next/navigation';
  
function ForgotPasswordDialog({isDialogOpen, setIsDialogOpen}) {
   const router = useRouter();
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
    const [password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const[isLoading, setIsLoading] = useState(false);
  
  
    const handleSendOtp=async()=>{
      setIsLoading(true);
      if(email.trim() === "") {
        toast.error("Please enter your email!");
        setIsLoading(false);
        return;
      }
        
         try {
          // const response = await axios.get(`http://localhost:3000/api/forgotPassword/verifyEmail?email=${email}`);
            const response = await axios.get(`https://intervu-ai-beige.vercel.app/api/forgotPassword/verifyEmail?email=${email}`);
          if (response.status === 200) {
            toast.success("OTP sent to your email!");
            setIsLoading(false);
            setStep("OTP");
          }
        } catch (error) {
          setIsLoading(false);
            console.log(error);
          if (error.response) {
            const status = error.response.status;
            if (status === 404) {
              toast.error("Kindly enter your email!");
            } else if (status === 400) {
              toast.error("Email not registered!");
            } else if (status === 500) {
              toast.error("Unexpected error occurred. We're on it!");
            } else {
              toast.error("Something went wrong, please try again later!");
            }
          } else {
            toast.error("Unable to connect to the server. Check your connection.");
        }
    }
  }
   const handleOtpCheck=async()=>{
   const otprecieved = Number(value);
      setIsLoading(true);
      if(value.trim() === "") {
        toast.error("Please enter your OTP!");
        setIsLoading(false);
        return;
      }
        
         try {
          // const response = await axios.post("http://localhost:3000/api/forgotPassword/verifyOTP",{
           const response = await axios.post("https://intervu-ai-beige.vercel.app/api/forgotPassword/verifyOTP",{
            email:email,
            OTP:otprecieved
          });
          if (response.status === 200) {
            setIsLoading(false);
            toast.success("OTP verified! You can now set a new password.");
            setStep("password");
          }
        } catch (error) {
          setIsLoading(false);
            console.log(error);
          if (error.response) {
            const status = error.response.status;
            if (status === 404) {
              toast.error("Kindly enter your OTP!");
            } else if (status === 401) {
              toast.error("Incorrect OTP!");
            } else if (status === 500) {
              toast.error("Something went wrong, please try again later!");
            } else {
               toast.error("Unexpected error occurred. We're on it!");
            }
          } else {
            toast.error("Unable to connect to the server. Check your connection.");
        }
    }
  }

  const handlePasswordChange=async()=>{
      setIsLoading(true);
      if(password.trim() === "" || confirmPassword.trim() === "") {
        toast.error("Please fill in all fields!");
        setIsLoading(false);
        return;
      }
      if(password !== confirmPassword) {
        toast.error("Passwords do not match!");
        setIsLoading(false);
        return;
      }
         try {
          // const response = await axios.post("http://localhost:3000/api/forgotPassword/resetPassword",{
          const response = await axios.post("  https://intervu-ai-beige.vercel.app/api/forgotPassword/resetPassword",{
            email:email,
            newPassword:password
          });
          if (response.status === 200) {
            setIsLoading(false);
            toast.success("password updated successfully!");
             router.push('/login');
          }
        } catch (error) {
          setIsLoading(false);
            console.log(error);
          if (error.response) {
            const status = error.response.status;
            if (status === 400) {
              toast.error("Kindly enter your new Password!");
            } else if (status === 404) {
              toast.error("Some data is missing try resetting again!");
            } else if (status === 500) {
              toast.error("Something went wrong, please try again later!");
            } else {
               toast.error("Unexpected error occurred. We're on it!");
            }
          } else {
            toast.error("Unable to connect to the server. Check your connection.");
        }
    }
  }
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
          <Button onClick={()=>handleSendOtp()} type="button" className="w-full bg-[#5862b2] hover:bg-[#5862b2]">
            {isLoading ? <Loader variant="circular" className="border-white border-t-transparent" /> : "Send OTP"}
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
          <DialogTitle className="sm:text-center">We’ve sent your secret code to {email}</DialogTitle>
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
                onComplete={handleOtpCheck}
              />
            </div>
            <Button type="button" className="w-[50%] bg-[#5862b2] hover:bg-[#5862b2]" onClick={()=>{handleOtpCheck()}}>
            {isLoading ? <Loader variant="circular" className="border-white border-t-transparent" /> : "Verify OTP"}
          </Button>
            <p className="text-center text-sm">
              <p className="hover:underline cursor-pointer" onClick={handleSendOtp}>
                Resend code
              </p>
              
               <p className="mt-1">
                Mistyped email? <span className=" hover:underline cursor-pointer"  onClick={() => setStep("email")}>Change it</span>
              </p>
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
                    type="password"
                    placeholder="*******"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="w-[70%]"
                  />
                </div>
                <div className="flex items-center gap-4 w-full">
                  <Label htmlFor="username" className="text-right text-nowrap">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="*******"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    className="w-[80%]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handlePasswordChange} className="w-[40%] bg-[#5862b2] hover:bg-[#5862b2]">
                   {isLoading ? <Loader variant="circular" className="border-white border-t-transparent" /> : "Change Password"}
                   </Button>
              </DialogFooter>
            </DialogContent>)}
    </Dialog>
    
    </>
  );
}

export { ForgotPasswordDialog };
