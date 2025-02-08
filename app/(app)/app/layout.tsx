import { AddGoal } from "@/components/add-goal";
import { FrequencyTabs } from "@/components/frequency-tabs";
import { Nav } from "@/components/ui/nav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <main className="mx-auto h-full max-w-6xl p-4 px-4 md:px-8">
        <section className="flex flex-row items-center justify-between pb-4">
          <h1 className="text-lg font-bold">Your Habits</h1>
          <AddGoal />
        </section>
        <FrequencyTabs />
        {children}
      </main>
    </>
  );
}
