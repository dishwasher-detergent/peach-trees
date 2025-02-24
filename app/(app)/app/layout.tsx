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
      <main className="mx-auto h-full max-w-6xl p-4 px-4 md:px-8 bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] [--pattern-fg:var(--color-muted)]/50 dark:[--pattern-fg:var(--color-muted)]/10">
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
