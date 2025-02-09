import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getBiWeeklyData } from "@/lib/utils";

import { LucideCheck, LucideX } from "lucide-react";

interface BiWeeklyChartProps {
  data: string[];
}

export function BiWeeklyChart({ data }: BiWeeklyChartProps) {
  const weeklyData = getBiWeeklyData(data);

  return (
    <div className="grid grid-cols-12 gap-0.5">
      <TooltipProvider>
        {weeklyData.map((week, index) => {
          const level = Math.min(week.level, 1);
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
                <p className="pb-2 text-sm font-bold">{`Occurrence ${week.biWeek}`}</p>
                <ul className="space-y-1">
                  {week.weeks.map((x) => (
                    <li
                      key={x}
                      className="flex flex-row items-center justify-between"
                    >
                      Week {x}
                      <LucideCheck className="ml-2 size-3.5" />
                    </li>
                  ))}
                  {week.weeks.length === 0 && (
                    <li className="flex flex-row items-center justify-between">
                      Nothing Done <LucideX className="ml-2 size-3.5" />
                    </li>
                  )}
                </ul>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
