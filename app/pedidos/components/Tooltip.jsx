import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Tooltip({ children, ...props }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">{children}</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{props.title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
