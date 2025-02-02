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

import { LucideLoader2 } from "lucide-react";
import Link from "next/link";
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

  const disabled = handleDisable(frequency, completions) || loading;

  return (
    <Card className="break-inside-avoid-column rounded-2xl">
      <CardHeader>
        <CardDescription className="text-xs">{frequency}</CardDescription>
        {completions.length > 0 ? (
          RenderChart(frequency, completions)
        ) : (
          <p className="font-bold">This goal has not been started, yet!</p>
        )}
        <CardTitle className="pt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-row gap-2">
        <Button className="w-full" onClick={markComplete} disabled={disabled}>
          {RenderButtonText(frequency)}
          {loading && <LucideLoader2 className="ml-2 size-3.5 animate-spin" />}
        </Button>
        <Button variant="secondary" asChild>
          <Link href={`/app/${$id}`}>View</Link>
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
