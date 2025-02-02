import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Frequency } from "@/constants/frequency.constant";
import { getMonthlyData } from "@/lib/utils";

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
    <div className="grid grid-cols-12 gap-0.5 p-4 pb-0">
      <TooltipProvider>
        {monthlyData.map((month, index) => {
          const level = Math.min(month.level, 2);
          const colorClasses = ["bg-muted", "bg-primary/40", "bg-primary"];
          const colorClass =
            frequency == Frequency.MONTHLY
              ? colorClasses[level >= 1 ? 2 : 0]
              : colorClasses[level];

          return (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <div className={`size-5 rounded-sm ${colorClass}`}></div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-base font-bold">{`Month ${month.month}`}</div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
