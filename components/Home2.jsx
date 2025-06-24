"use client";
import { BackgroundPaths } from "@/components/ui/background-paths";
import CheckScreenSize from "@/lib/screenSizeCheck";
export default function DemoBackgroundPaths() {
  return (
    <CheckScreenSize>
    <div className="w-full h-screen flex items-center justify-center">
      <BackgroundPaths title="Virtual Interviews, Real Results" />
    </div>
    </CheckScreenSize>
  );
}
