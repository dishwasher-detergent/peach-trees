import { AddGoal } from "@/components/add-goal";

export default function AppPage() {
  return (
    <main className="mx-auto h-full min-h-dvh max-w-6xl p-4 px-4 md:px-8">
      <section>
        <div className="flex flex-row items-center justify-between pb-4">
          <h1 className="font-bold">Your Goals</h1>
          <AddGoal />
        </div>
        <div className="grid w-full grid-cols-2 gap-4">
          <div className="col-span-2 grid h-64 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500">
            Test
          </div>
          <div className="col-span-1 grid h-64 place-items-center rounded-2xl bg-muted">
            Test
          </div>
          <div className="col-span-1 grid h-64 place-items-center rounded-2xl bg-muted">
            Test
          </div>
        </div>
      </section>
    </main>
  );
}
