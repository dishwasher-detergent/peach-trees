import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Frequency } from "@/constants/frequency.constant";
import { getMonthlyData } from "@/lib/utils";
import { LucideCheck, LucideX } from "lucide-react";

interface MonthlyChartProps {
  data: string[];
  frequency?: "monthly" | "semi-monthly";
}

export function MonthlyChart({
  data,
  frequency = "monthly",
}: MonthlyChartProps) {
  const monthlyData = getMonthlyData(data);

  return (
    <div className="grid grid-cols-12 gap-0.5">
      <TooltipProvider>
        {monthlyData.map((month, index) => {
          const level = Math.min(month.level, 2);
          const colorClasses = [
            "bg-muted-foreground dark:bg-muted",
            "bg-primary/40",
            "bg-primary",
          ];
          const colorClass =
            frequency == Frequency.MONTHLY
              ? colorClasses[level >= 1 ? 2 : 0]
              : colorClasses[level];

          return (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <div
                  className={`aspect-square w-full rounded-sm ${colorClass}`}
                ></div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="flex flex-row items-center text-sm font-bold">
                  {`Month ${month.month}`}
                  {month.level > 0 ? (
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
