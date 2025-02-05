import { AddGoal } from "@/components/add-goal";
import { GoalCard } from "@/components/goal-card";
import { getGoals } from "@/lib/server/utils";

export default async function AppPage() {
  const goals = await getGoals();

  return (
    <>
      <section>
        <div className="flex flex-row items-center justify-between pb-4">
          <h1 className="text-lg font-bold">Your Goals</h1>
          <AddGoal />
        </div>
        <div className="columns-1 items-start gap-4 space-y-4 md:columns-2 lg:columns-3">
          {goals.data?.map((goal) => <GoalCard key={goal.$id} {...goal} />)}
        </div>
      </section>
    </>
  );
}
