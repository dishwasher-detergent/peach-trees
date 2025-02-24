import { AddGoal } from "@/components/add-goal";
import { FrequencyTabs } from "@/components/frequency-tabs";
import { Nav } from "@/components/ui/nav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full grow flex flex-col bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] [--pattern-fg:var(--color-muted)]/50 dark:[--pattern-fg:var(--color-muted)]/10">
      <Nav />
      <div className="mx-auto flex-1 w-full max-w-6xl border-x border-dashed border-border bg-background">
        <nav className="sticky top-13 bg-background/90 backdrop-blur-xs p-4 px-4 md:px-8">
          <div className="flex flex-row items-center justify-between pb-4">
            <h1 className="text-lg font-bold">Your Habits</h1>
            <AddGoal />
          </div>
          <FrequencyTabs />
        </nav>
        <div className="p-4 px-4 md:px-8 w-full">
          {children}
        </div>
      </div>
    </main>
  );
}
