"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Frequency } from "@/interfaces/goal.interface";
import { RenderChart } from "./goal-card";

interface GoalDetailProps {
  title: string;
  description: string;
  frequency: Frequency;
  completions: string[];
}

export function GoalDetail({
  title,
  description,
  frequency,
  completions,
}: GoalDetailProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="flex-1"
            variant="ghost"
            size={isDesktop ? "default" : "icon"}
          >
            Details
          </Button>
        </DialogTrigger>
        <DialogContent className="flex max-h-[60vh] flex-col overflow-hidden overflow-y-auto p-0 sm:max-w-[425px]">
          <DialogHeader className="flex-none p-4">
            <DialogTitle className="text-4xl font-bold">{title}</DialogTitle>
            <DialogDescription className="text-xl text-foreground">
              {description}
            </DialogDescription>
          </DialogHeader>
          <Content frequency={frequency} completions={completions} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="flex-1"
          variant="ghost"
          size={isDesktop ? "default" : "icon"}
        >
          Details
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] pb-4">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-4xl font-bold">{title}</DrawerTitle>
          <DrawerDescription className="text-xl text-foreground">
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <Content frequency={frequency} completions={completions} />
      </DrawerContent>
    </Drawer>
  );
}

export function Content({
  frequency,
  completions,
}: {
  frequency: Frequency;
  completions: string[];
}) {
  return (
    <div className="max-h-full overflow-auto">
      <div className="flex flex-row items-center border-b border-dashed border-border p-4 pt-0">
        <div className="w-1/2 space-y-1">
          <p className="text-base">Regularity</p>
          <p className="text-base font-bold capitalize">{frequency}</p>
        </div>
        <div className="w-1/2 space-y-1">
          <p className="text-base">Reminder</p>
          <p className="text-base font-bold capitalize">true</p>
        </div>
      </div>
      <div className="flex w-full flex-row gap-4 border-b border-dashed border-border p-4">
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
            <p className="font-bold">12</p>
          </div>
          <div>
            <p className="text-base">Record</p>
            <p className="font-bold">12</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="block pb-2 text-base">History</p>
        <ul className="space-y-2">
          {completions.map((completion, index) => (
            <li
              key={index}
              className="shadow-tiny flex flex-row items-center rounded-md p-2 text-base"
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
