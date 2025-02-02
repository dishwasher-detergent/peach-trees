import { AddGoal } from "@/components/add-goal";
import { GoalCard } from "@/components/goal-card";
import { Card } from "@/components/ui/card";
import { getGoals } from "@/lib/server/utils";

export default async function AppPage() {
  const goals = await getGoals();

  return (
    <main className="mx-auto h-full min-h-dvh max-w-6xl p-4 px-4 md:px-8">
      <section>
        <div className="grid w-full grid-cols-2 gap-4">
          <Card className="col-span-2 grid h-64 place-items-center rounded-2xl">
            Stat
          </Card>
          <Card className="grid h-64 place-items-center rounded-2xl">Stat</Card>
          <Card className="grid h-64 place-items-center rounded-2xl">Stat</Card>
        </div>
      </section>
      <section>
        <div className="flex flex-row items-center justify-between py-8">
          <h1 className="text-lg font-bold">Your Goals</h1>
          <AddGoal />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {goals.data?.map((goal) => <GoalCard key={goal.$id} {...goal} />)}
        </div>
      </section>
    </main>
  );
}
