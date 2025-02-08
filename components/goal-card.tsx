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
import { Streak } from "@/interfaces/streak.interface";
import { createCompletion } from "@/lib/server/utils";
import { handleDisable } from "@/lib/utils";
import { GoalDetail } from "./goal-detail";

import { LucideCheck, LucideLoader2, LucidePartyPopper } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export interface GoalCardProps {
  $id: string;
  title: string;
  description: string;
  frequency: Frequency;
  completions: string[];
  streak: Streak;
}

export function GoalCard({
  $id,
  title,
  description,
  frequency,
  completions,
  streak,
}: GoalCardProps) {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [data, setData] = useState<GoalCardProps>({
    $id,
    title,
    description,
    frequency,
    completions,
    streak,
  });

  async function markComplete() {
    setLoading(true);
    const result = await createCompletion($id);

    if (result.success) {
      toast.success(result.message);

      setData({
        $id: result.data?.$id ?? $id,
        title: result.data?.title ?? title,
        description: result.data?.description ?? description,
        frequency: result.data?.frequency ?? frequency,
        completions: result.data?.completions ?? completions,
        streak: result.data?.streak ?? streak,
      });

      setComplete(true);
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  }

  const disabled = useMemo(
    () =>
      handleDisable(data.frequency, data.completions) || loading || complete,
    [data.frequency, data.completions, loading, complete],
  );

  return (
    <Card className="break-inside-avoid-column rounded-md border-primary/50 bg-gradient-to-bl from-primary/10 to-background ring-2 ring-primary/20">
      <CardHeader className="mb-4 space-y-0 border-b border-dashed border-primary/50">
        <CardTitle className="text-2xl font-bold">{data.title}</CardTitle>
        <CardDescription className="pb-4 text-sm text-foreground">
          {data.description}
        </CardDescription>
        <div className="flex flex-row items-center">
          <div className="w-1/2 space-y-1">
            <p className="text-sm">Regularity</p>
            <p className="text-sm font-bold capitalize">{data.frequency}</p>
          </div>
          {/* <div className="w-1/2 space-y-1">
            <p className="text-sm">Reminder</p>
            <p className="text-sm font-bold capitalize">true</p>
          </div> */}
        </div>
      </CardHeader>
      <CardContent className="mb-4 flex w-full flex-row gap-4 border-b border-dashed border-primary/50">
        <div className="w-2/3 flex-1">
          <p className="block pb-2 text-sm">Overall Progress</p>
          <div className="block w-full">
            {data.completions.length > 0 ? (
              RenderChart(data.frequency, data.completions)
            ) : (
              <p className="font-bold">This goal has not been started, yet!</p>
            )}
          </div>
        </div>
        <div className="flex w-1/3 flex-col gap-2">
          <div>
            <p className="text-sm">Streak</p>
            <p className="font-bold">{data.streak.current}</p>
          </div>
          <div>
            <p className="text-sm">Record</p>
            <p className="font-bold">{data.streak.record}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-2">
        <GoalDetail
          title={data.title}
          description={data.description}
          frequency={data.frequency}
          completions={data.completions}
          streak={data.streak}
        />
        <Button size="icon" onClick={markComplete} disabled={disabled}>
          {!disabled && <LucideCheck className="size-3.5" />}
          {loading && <LucideLoader2 className="size-3.5 animate-spin" />}
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
      return <WeeklyChart data={data} />;
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
