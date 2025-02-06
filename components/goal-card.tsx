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
import { handleDisable } from "@/lib/utils";

import { LucideCheck, LucideLoader2, LucidePartyPopper } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { GoalDetail } from "./goal-detail";

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

  const disabled = handleDisable(frequency, completions) || loading;

  return (
    <Card className="break-inside-avoid-column rounded-md">
      <CardHeader className="mb-4 space-y-0 border-b border-dashed">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="pb-4 text-sm text-foreground">
          {description}
        </CardDescription>
        <div className="flex flex-row items-center">
          <div className="w-1/2 space-y-1">
            <p className="text-sm">Regularity</p>
            <p className="text-sm font-bold capitalize">{frequency}</p>
          </div>
          <div className="w-1/2 space-y-1">
            <p className="text-sm">Reminder</p>
            <p className="text-sm font-bold capitalize">true</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mb-4 flex w-full flex-row gap-4 border-b border-dashed">
        <div className="w-2/3 flex-1">
          <p className="block pb-2 text-sm">Overall Progress</p>
          <div className="block w-full">
            {completions.length > 0 ? (
              RenderChart(frequency, completions)
            ) : (
              <p className="font-bold">This goal has not been started, yet!</p>
            )}
          </div>
        </div>
        <div className="flex w-1/3 flex-col gap-2">
          <div>
            <p className="text-sm">Streak</p>
            <p className="font-bold">12</p>
          </div>
          <div>
            <p className="text-sm">Record</p>
            <p className="font-bold">12</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-2">
        <GoalDetail
          title={title}
          description={description}
          frequency={frequency}
          completions={completions}
        />
        <Button size="icon" onClick={markComplete} disabled={disabled}>
          {!disabled && <LucideCheck className="size-3.5" />}
          {loading && <LucideLoader2 className="ml-2 size-3.5 animate-spin" />}
          {disabled && !loading && <LucidePartyPopper className="size-3.5" />}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function RenderButtonText(frequency: Frequency) {
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

export function RenderChart(frequency: Frequency, data: any) {
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
