import { DailyChart } from "@/components/charts/daily";
import { MonthlyChart } from "@/components/charts/monthly";
import { QuarterlyChart } from "@/components/charts/quarterly";
import { SemesterlyChart } from "@/components/charts/semesterly";
import { WeeklyChart } from "@/components/charts/weekly";
import { YearlyChart } from "@/components/charts/yearly";
import { Frequency as FrequencyConst } from "@/constants/frequency.constant";
import { Frequency } from "@/interfaces/goal.interface";
import { getGoal } from "@/lib/server/utils";
import { redirect } from "next/navigation";

export default async function GoalPage({
  params,
}: {
  params: Promise<{ goal: string }>;
}) {
  const { goal: goalId } = await params;
  const goal = await getGoal(goalId);

  if (!goal?.data) {
    redirect("/app");
  }

  const { data } = goal;

  return (
    <>
      <section>
        <p className="pb-4 font-semibold text-muted-foreground">
          {data.frequency}
        </p>
        <div className="w-96 max-w-full pb-4">
          {RenderChart(data.frequency, data.completions)}
        </div>
        <h1 className="text-4xl font-bold">{data.title}</h1>
        <p className="text-lg">{data.description}</p>
      </section>
      <section></section>
    </>
  );
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
