import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getYearlyData } from "@/lib/utils";
import { LucideCheck, LucideX } from "lucide-react";

interface YearlyChartProps {
  data: string[];
}

export function YearlyChart({ data }: YearlyChartProps) {
  const yearlyData = getYearlyData(data);

  return (
    <div className="grid grid-cols-12 gap-0.5">
      <TooltipProvider>
        {yearlyData.map((year, index) => {
          const level = Math.min(year.level, 1);
          const colorClasses = ["bg-muted", "bg-primary"];
          const colorClass = colorClasses[level];

          return (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <div
                  className={`aspect-square w-full rounded-sm ${colorClass}`}
                ></div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="flex flex-row items-center text-sm font-bold">
                  {`Year ${year.year}`}
                  {year.level > 0 ? (
                    <LucideCheck className="ml-2 size-3.5" />
                  ) : (
                    <LucideX className="ml-2 size-3.5" />
                  )}
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
