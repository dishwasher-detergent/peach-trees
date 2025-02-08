import { AddGoal } from "@/components/add-goal";
import { FrequencyTabs } from "@/components/frequency-tabs";
import { GoalCard } from "@/components/goal-card";
import { Frequency } from "@/constants/frequency.constant";
import { getGoals } from "@/lib/server/utils";

export default async function AppPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const frequency = (await searchParams).frequency ?? Frequency.DAILY;
  const goals = await getGoals(frequency);

  return (
    <>
      <section>
        <div className="flex flex-row items-center justify-between pb-4">
          <h1 className="text-lg font-bold">Your Habits</h1>
          <AddGoal />
        </div>
        <FrequencyTabs />
        <div className="columns-1 items-start gap-4 space-y-4 md:columns-2 lg:columns-3">
          {goals.data?.map((goal) => <GoalCard key={goal.$id} {...goal} />)}
        </div>
      </section>
    </>
  );
}
