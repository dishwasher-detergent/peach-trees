import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getYearlyData } from "@/lib/utils";

interface YearlyChartProps {
  data: string[];
}

export function YearlyChart({ data }: YearlyChartProps) {
  const yearlyData = getYearlyData(data);

  return (
    <div className="grid grid-cols-12 gap-0.5 p-4 pb-0">
      <TooltipProvider>
        {yearlyData.map((year, index) => {
          const level = Math.min(year.level, 1);
          const colorClasses = ["bg-muted", "bg-primary"];
          const colorClass = colorClasses[level];

          return (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <div className={`size-5 rounded-sm ${colorClass}`}></div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-base font-bold">{`Year ${year.year}`}</div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
