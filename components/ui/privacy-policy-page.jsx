"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";
import { useRef, useState } from "react";

function PrivacyPolicyPage({isOpen, setIsOpen}) {
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}> 
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base">
            Terms & Conditions
          </DialogTitle>
          <div className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4">
                <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p>
                        <strong>Acceptance of Terms</strong>
                      </p>
                      <p>
                        By accessing and using this website, users agree to comply with and be bound
                        by these Terms of Service. Users who do not agree with these terms should
                        discontinue use of the website immediately.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Description of Service</strong>
                      </p>
                      <p>
                    Intervu.ai is an AI-powered interview simulation platform that enables users to participate in mock interviews through live video and audio interaction. The platform is designed to help users prepare for real-world interviews with intelligent questioning and feedback.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>User Accounts</strong>
                      </p>
                      <p> To access the Service, you must create an account by providing your:</p>
                      <ul className="list-disc pl-6">
                        <li>Full Name</li>
                        <li>Email Address</li>
                        <li>Password (stored in an encrypted format).</li>
                      </ul>
                      <p>
                        You are responsible for maintaining the confidentiality of your login information and are fully responsible for all activities that occur under your account.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Data Collection and Privacy</strong>
                      </p>
                      <p>
                      We collect and store personal information including your name, email, and password (encrypted) for authentication and communication purposes.Additionally, to conduct interviews, we request access to your camera and microphone. This access is required solely for the live AI-interviewing experience and is not used for surveillance or third-party sharing.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>User Conduct Guidelines</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        <li>Misrepresent your identity or create multiple accounts;</li>
                        <li>Interfere with or disrupt the Service or servers.</li>
                        <li>Attempt to gain unauthorized access to any part of the Service.</li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Intellectual Property</strong>
                      </p>
                      <p>
                     All content on Intervu.ai, including but not limited to text, logos, AI models, and software, is the intellectual property of Intervu.ai and may not be reproduced or used without permission.
                      </p>
                    </div>

                     <div className="space-y-1">
                      <p>
                        <strong>Disclaimer of Warranties</strong>
                      </p>
                      <p>
                  The Service is provided "as is" and "as available" without warranties of any kind. We do not guarantee the accuracy, completeness, or usefulness of any interview feedback or results provided by the AI system.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Modifications to Terms</strong>
                      </p>
                      <p>
                        The website reserves the right to modify these terms at any time. Continued
                        use of the website after changes constitutes acceptance of the new terms.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Termination Clause</strong>
                      </p>
                      <p>
                        The website may terminate or suspend user access without prior notice for
                        violations of these terms or for any other reason deemed appropriate by the
                        administration.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Governing Law</strong>
                      </p>
                      <p>
                        These terms are governed by the laws of the jurisdiction where the website
                        is primarily operated, without regard to conflict of law principles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="border-t border-border px-6 py-4 sm:items-center">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" className="bg-[#5862b2] hover:bg-[#5862b2]">
              I understand
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { PrivacyPolicyPage };
