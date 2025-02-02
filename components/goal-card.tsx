import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Frequency as FrequencyConst } from "@/constants/frequency.constant";
import { Frequency } from "@/interfaces/goal.interface";

import { DailyChart } from "./charts/daily";
import { MonthlyChart } from "./charts/monthly";
import { QuarterlyChart } from "./charts/quarterly";
import { SemesterlyChart } from "./charts/semesterly";
import { WeeklyChart } from "./charts/weekly";
import { YearlyChart } from "./charts/yearly";

export interface GoalCardProps {
  title: string;
  description: string;
  frequency: Frequency;
}

export function GoalCard({ title, description, frequency }: GoalCardProps) {
  const data = [
    "2024-01-01",
    "2024-01-02",
    "2024-01-03",
    "2024-01-04",
    "2024-01-05",
    "2024-01-06",
    "2024-01-07",
    "2024-01-08",
    "2024-09-05",
    "2024-09-06",
    "2024-09-07",
    "2024-09-08",
    "2024-09-09",
    "2024-12-22",
    "2024-12-23",
    "2024-12-24",
    "2024-12-25",
    "2024-12-26",
    "2024-12-27",
    "2024-12-28",
    "2024-12-29",
    "2024-12-30",
    "2024-12-31",
  ];

  return (
    <Card className="rounded-2xl">
      {RenderChart(frequency, data)}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col">
        <Button className="w-full">{RenderButtonText(frequency)}</Button>
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
