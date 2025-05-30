import { GradientCard } from "@/components/ui/gradient-card"
import RouteAuthCheck from "@/lib/routeAuthCheck";
export default function FinalPage() {

  return (
    <div>
        <RouteAuthCheck userRole="user">
            <GradientCard/>
        </RouteAuthCheck>
    </div>
      
  );
};
