"use client";

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

export function DyanmicDrawer({
  title,
  description,
  button,
  children,
  setOpen,
  open,
}: {
  title: string;
  description: string;
  button: string | React.ReactNode;
  children: React.ReactNode;
  setOpen: (e: boolean) => void;
  open: boolean;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{button}</DialogTrigger>
        <DialogContent className="flex max-h-[60vh] flex-col overflow-hidden border-primary/50 bg-gradient-to-bl from-primary/10 to-background p-0 pb-4 ring-4 ring-primary/20 sm:max-w-[425px]">
          <DialogHeader className="flex-none p-4 pb-0">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{button}</DrawerTrigger>
      <DrawerContent className="max-h-[80dvh] border-primary/50 bg-gradient-to-bl from-primary/10 to-background p-0 pb-4 ring-4 ring-primary/20">
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
}
