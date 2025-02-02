import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Frequency as FrequencyConst } from "@/constants/frequency.constant";
import { getWeeklyData } from "@/lib/utils";
import { LucideCheck, LucideX } from "lucide-react";

interface WeeklyChartProps {
  data: string[];
  frequency?: "weekly" | "bi-weekly";
}

export function WeeklyChart({ data, frequency = "weekly" }: WeeklyChartProps) {
  const weeklyData = getWeeklyData(data);

  return (
    <div className="grid grid-cols-12 gap-0.5">
      <TooltipProvider>
        {weeklyData.map((week, index) => {
          const level = Math.min(week.level, 2);
          const colorClasses = ["bg-muted", "bg-primary/40", "bg-primary"];
          const colorClass =
            frequency == FrequencyConst.WEEKLY
              ? colorClasses[level >= 1 ? 2 : 0]
              : colorClasses[level];

          return (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <div className={`size-5 rounded-sm ${colorClass}`}></div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="flex flex-row items-center text-sm font-bold">
                  {`Week ${week.week}`}
                  {week.level > 0 ? (
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
