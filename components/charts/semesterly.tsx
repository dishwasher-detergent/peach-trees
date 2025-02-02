import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSemesterlyData } from "@/lib/utils";

interface SemesterlyChartProps {
  data: string[];
}

export function SemesterlyChart({ data }: SemesterlyChartProps) {
  const semesterlyData = getSemesterlyData(data);

  return (
    <div className="grid grid-cols-12 gap-0.5 p-4 pb-0">
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
                <div className="text-base font-bold">{`Semester ${semester.semester}`}</div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
