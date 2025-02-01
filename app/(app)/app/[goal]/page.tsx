export default async function GoalPage({
  params,
}: {
  params: Promise<{ goal: string }>;
}) {
  const { goal: goalId } = await params;

  return (
    <div>
      <p>{goalId}</p>
    </div>
  );
}
