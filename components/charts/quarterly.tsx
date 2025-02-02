import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getQuarterlyData } from "@/lib/utils";

interface QuarterlyChartProps {
  data: string[];
}

export function QuarterlyChart({ data }: QuarterlyChartProps) {
  const quarterlyData = getQuarterlyData(data);

  return (
    <div className="grid grid-cols-12 gap-0.5 p-4 pb-0">
      <TooltipProvider>
        {quarterlyData.map((quarter, index) => {
          const level = Math.min(quarter.level, 1);
          const colorClasses = ["bg-muted", "bg-primary"];
          const colorClass = colorClasses[level];

          return (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <div className={`size-5 rounded-sm ${colorClass}`}></div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-base font-bold">{`Quarter ${quarter.quarter}`}</div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
