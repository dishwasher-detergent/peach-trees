import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getWeeklyData } from "@/lib/utils";
import { LucideCheck, LucideX } from "lucide-react";

interface WeeklyChartProps {
  data: string[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  const weeklyData = getWeeklyData(data);

  return (
    <div className="grid grid-cols-12 gap-0.5">
      <TooltipProvider>
        {weeklyData.map((week, index) => {
          const level = Math.min(week.level, 2);
          const colorClasses = [
            "bg-muted-foreground dark:bg-muted",
            "bg-primary",
          ];
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
