"use client";
import { BackgroundPaths } from "@/components/ui/background-paths";
import RouteAuthCheck from "@/lib/routeAuthCheck";

export default function DemoBackgroundPaths() {
  return (
    <RouteAuthCheck>
    <div className="w-full h-screen flex items-center justify-center">
      <BackgroundPaths title="Virtual Interviews, Real Results" />
    </div>
    </RouteAuthCheck>
  );
}
