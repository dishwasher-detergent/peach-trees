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
      <section className="columns-1 items-start gap-4 space-y-4 md:columns-2 lg:columns-3">
        {goals.data?.map((goal) => <GoalCard key={goal.$id} {...goal} />)}
      </section>
    </>
  );
}
