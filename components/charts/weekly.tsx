import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Frequency as FrequencyConst } from "@/constants/frequency.constant";
import { getWeeklyData } from "@/lib/utils";

interface WeeklyChartProps {
  data: string[];
  frequency?: "weekly" | "bi-weekly";
}

export function WeeklyChart({ data, frequency = "weekly" }: WeeklyChartProps) {
  const weeklyData = getWeeklyData(data);

  console.log(weeklyData);

  return (
    <div className="grid grid-cols-12 gap-0.5 p-4 pb-0">
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
                <div className="text-base font-bold">{`Week ${week.week}`}</div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
