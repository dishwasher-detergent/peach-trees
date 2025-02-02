import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSemesterlyData } from "@/lib/utils";
import { LucideCheck, LucideX } from "lucide-react";

interface SemesterlyChartProps {
  data: string[];
}

export function SemesterlyChart({ data }: SemesterlyChartProps) {
  const semesterlyData = getSemesterlyData(data);

  return (
    <div className="grid grid-cols-12 gap-0.5">
      <TooltipProvider>
        {semesterlyData.map((semester, index) => {
          const level = Math.min(semester.level, 1);
          const colorClasses = ["bg-muted", "bg-primary"];
          const colorClass = colorClasses[level];

          return (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <div className={`size-5 rounded-sm ${colorClass}`}></div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="flex flex-row items-center text-sm font-bold">
                  {`Semester ${semester.semester}`}
                  {semester.level > 0 ? (
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
