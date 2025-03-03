import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getDailyData } from "@/lib/utils";
import { LucideCheck, LucideX } from "lucide-react";

export function DailyChart({ data }: any) {
  const weeklyData = getDailyData(data);

  return (
    <div className="grid grid-cols-12 gap-0.5">
      <TooltipProvider>
        {weeklyData.map((weekObj, wIndex) => {
          const level = Math.min(weekObj.level, 7);
          const colorClasses = [
            "bg-muted-foreground dark:bg-muted",
            "bg-primary/40",
            "bg-primary/50",
            "bg-primary/60",
            "bg-primary/70",
            "bg-primary/80",
            "bg-primary/90",
            "bg-primary",
          ];
          const colorClass = colorClasses[level];

          return (
            <Tooltip key={wIndex} delayDuration={0}>
              <TooltipTrigger asChild>
                <div
                  className={`aspect-square w-full rounded-sm ${colorClass}`}
                ></div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="pb-2 text-sm font-bold">{`Week ${weekObj.week}`}</p>
                <ul className="space-y-1">
                  {weekObj.days.map((x) => (
                    <li
                      key={x}
                      className="flex flex-row items-center justify-between"
                    >
                      {x}
                      <LucideCheck className="ml-2 size-3.5" />
                    </li>
                  ))}
                  {weekObj.days.length === 0 && (
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
