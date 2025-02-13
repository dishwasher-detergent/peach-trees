"use client";

import { RenderChart } from "@/components/goal-card";
import { Button } from "@/components/ui/button";
import { DyanmicDrawer } from "@/components/ui/dynamic-drawer";
import { Frequency } from "@/interfaces/goal.interface";
import { Streak } from "@/interfaces/streak.interface";
import { useState } from "react";

interface GoalDetailProps {
  title: string;
  description: string;
  frequency: Frequency;
  completions: string[];
  streak: Streak;
}

export function GoalDetail({
  title,
  description,
  frequency,
  completions,
  streak,
}: GoalDetailProps) {
  const [open, setOpen] = useState(false);

  return (
    <DyanmicDrawer
      title={title}
      description={description}
      open={open}
      setOpen={setOpen}
      button={
        <Button variant="outline" className="flex-1">
          Details
        </Button>
      }
    >
      <Content
        frequency={frequency}
        completions={completions}
        streak={streak}
      />
    </DyanmicDrawer>
  );
}

export function Content({
  frequency,
  completions,
  streak,
}: {
  frequency: Frequency;
  completions: string[];
  streak: Streak;
}) {
  return (
    <div className="max-h-full overflow-auto">
      <div className="flex flex-row items-center border-b border-dashed border-primary/50 p-4 pt-0">
        <div className="w-1/2 space-y-1">
          <p className="text-base">Regularity</p>
          <p className="text-base font-bold capitalize">{frequency}</p>
        </div>
        {/* <div className="w-1/2 space-y-1">
          <p className="text-base">Reminder</p>
          <p className="text-base font-bold capitalize">true</p>
        </div> */}
      </div>
      <div className="flex w-full flex-row gap-4 border-b border-dashed border-primary/50 p-4">
        <div className="w-2/3 flex-1">
          <p className="block pb-2 text-base">Overall Progress</p>
          <div className="block w-full">
            {completions.length > 0 ? (
              RenderChart(frequency, completions)
            ) : (
              <p className="font-bold">This goal has not been started, yet!</p>
            )}
          </div>
        </div>
        <div className="flex w-1/3 flex-col gap-2">
          <div>
            <p className="text-base">Streak</p>
            <p className="font-bold">{streak.current}</p>
          </div>
          <div>
            <p className="text-base">Record</p>
            <p className="font-bold">{streak.record}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="block pb-2 text-base">History</p>
        <ul className="space-y-2">
          {completions.map((completion, index) => (
            <li
              key={index}
              className="flex flex-row items-center rounded-md border border-primary/50 p-2 text-base"
            >
              <p className="mr-2 block rounded-md bg-muted px-2 font-bold text-muted-foreground">
                {index + 1}
              </p>
              <p>{new Date(completion).toLocaleDateString("en-US")}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
