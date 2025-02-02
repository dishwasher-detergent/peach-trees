"use client";

import { DailyChart } from "@/components/charts/daily";
import { MonthlyChart } from "@/components/charts/monthly";
import { QuarterlyChart } from "@/components/charts/quarterly";
import { SemesterlyChart } from "@/components/charts/semesterly";
import { WeeklyChart } from "@/components/charts/weekly";
import { YearlyChart } from "@/components/charts/yearly";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Frequency as FrequencyConst } from "@/constants/frequency.constant";
import { Frequency } from "@/interfaces/goal.interface";
import { createCompletion } from "@/lib/server/utils";
import {
  isThisMonth,
  isThisQuarter,
  isThisWeek,
  isThisYear,
  isToday,
  parseISO,
  startOfYear,
} from "date-fns";
import { LucideLoader2 } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";

export interface GoalCardProps {
  $id: string;
  title: string;
  description: string;
  frequency: Frequency;
  completions: string[];
}

export function GoalCard({
  $id,
  title,
  description,
  frequency,
  completions,
}: GoalCardProps) {
  const [loading, setLoading] = useState(false);

  async function markComplete() {
    setLoading(true);
    const result = await createCompletion($id);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  }

  function handleDisable() {
    if (loading) return true;

    const today = new Date();

    switch (frequency) {
      case FrequencyConst.DAILY:
        return completions.some((completion) => isToday(completion));
      case FrequencyConst.WEEKLY:
        return completions.some((completion) =>
          isThisWeek(completion, { weekStartsOn: 0 }),
        );
      case FrequencyConst.BIWEEKLY:
        // Assuming bi-weekly means every two weeks starting from the first week of the year
        const startOfYearDate = startOfYear(today);
        const weekNumber = Math.floor(
          (today.getTime() - startOfYearDate.getTime()) /
            (1000 * 60 * 60 * 24 * 7),
        );
        return completions.some((completion) => {
          const completionDate = parseISO(completion);
          const completionWeekNumber = Math.floor(
            (completionDate.getTime() - startOfYearDate.getTime()) /
              (1000 * 60 * 60 * 24 * 7),
          );
          return (
            Math.floor(weekNumber / 2) === Math.floor(completionWeekNumber / 2)
          );
        });
      case FrequencyConst.SEMIMONTHLY:
        // Assuming semi-monthly means twice a month (1st-15th and 16th-end)
        const dayOfMonth = today.getUTCDate();
        return completions.some((completion) => {
          const completionDate = parseISO(completion);
          const completionDayOfMonth = completionDate.getUTCDate();
          return (
            (dayOfMonth <= 15 && completionDayOfMonth <= 15) ||
            (dayOfMonth > 15 && completionDayOfMonth > 15)
          );
        });
      case FrequencyConst.MONTHLY:
        return completions.some((completion) => isThisMonth(completion));
      case FrequencyConst.QUARTERLY:
        return completions.some((completion) => isThisQuarter(completion));
      case FrequencyConst.SEMSTERLY:
        // Assuming semesterly means twice a year (Jan-Jun and Jul-Dec)
        const month = today.getUTCMonth();
        return completions.some((completion) => {
          const completionMonth = parseISO(completion).getUTCMonth();
          return (
            (month < 6 && completionMonth < 6) ||
            (month >= 6 && completionMonth >= 6)
          );
        });
      case FrequencyConst.YEARLY:
        return completions.some((completion) => isThisYear(completion));
      default:
        return false;
    }
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardDescription className="text-xs">{frequency}</CardDescription>
        {RenderChart(frequency, completions)}
        <CardTitle className="pt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button
          className="w-full"
          onClick={markComplete}
          disabled={handleDisable()}
        >
          {handleDisable() && !loading
            ? "Completed this period!"
            : RenderButtonText(frequency)}
          {loading && <LucideLoader2 className="ml-2 size-3.5 animate-spin" />}
        </Button>
      </CardFooter>
    </Card>
  );
}

function RenderButtonText(frequency: Frequency) {
  switch (frequency) {
    case FrequencyConst.DAILY:
      return "Done for today!";
    case FrequencyConst.WEEKLY:
      return "Done for this week!";
    case FrequencyConst.BIWEEKLY:
      return "Done for this week!";
    case FrequencyConst.SEMIMONTHLY:
      return "Done for this half!";
    case FrequencyConst.MONTHLY:
      return "Done for this month!";
    case FrequencyConst.QUARTERLY:
      return "Done for this quarter!";
    case FrequencyConst.SEMSTERLY:
      return "Done for this half year!";
    case FrequencyConst.YEARLY:
      return "Done for this year!";
    default:
      return "Done!";
  }
}

function RenderChart(frequency: Frequency, data: any) {
  switch (frequency) {
    case FrequencyConst.DAILY:
      return <DailyChart data={data} />;
    case FrequencyConst.WEEKLY:
      return <WeeklyChart data={data} />;
    case FrequencyConst.BIWEEKLY:
      return <WeeklyChart data={data} frequency="bi-weekly" />;
    case FrequencyConst.SEMIMONTHLY:
      return <MonthlyChart data={data} frequency="semi-monthly" />;
    case FrequencyConst.MONTHLY:
      return <MonthlyChart data={data} />;
    case FrequencyConst.QUARTERLY:
      return <QuarterlyChart data={data} />;
    case FrequencyConst.SEMSTERLY:
      return <SemesterlyChart data={data} />;
    case FrequencyConst.YEARLY:
      return <YearlyChart data={data} />;
    default:
      return <DailyChart data={data} />;
  }
}
