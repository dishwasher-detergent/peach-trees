"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader2, LucidePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { createGoal } from "@/lib/server/utils";
import { cn } from "@/lib/utils";

export function CreateGoal() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex-1" variant="outline" size="sm">
            Create Org
            <LucidePlus className="ml-2 size-3.5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Goal</DialogTitle>
          </DialogHeader>
          <CreateForm setOpen={(e: boolean) => setOpen(e)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="flex-1" variant="outline" size="sm">
          Create Org
          <LucidePlus className="ml-2 size-3.5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create Goal</DrawerTitle>
        </DrawerHeader>
        <CreateForm className="px-4" setOpen={(e: boolean) => setOpen(e)} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface FormProps extends React.ComponentProps<"form"> {
  setOpen: (e: boolean) => void;
}

const titleMaxLength = 64;

const schema = z.object({
  title: z.string().min(1).max(titleMaxLength),
});

function CreateForm({ className, setOpen }: FormProps) {
  const [loadingCreateGoalanization, setLoadingCreateGoalanization] =
    useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoadingCreateGoalanization(true);

    const data = await createGoal(values.title);

    if (data.success) {
      toast.success(data.message);

      if (data.data) {
        router.push(`/${data.data.$id}`);
      }
    }

    if (!data.success) {
      toast.error(data.message);
    }

    setLoadingCreateGoalanization(false);
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-4", className)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Sample Project"
                    className="truncate pr-20"
                    maxLength={titleMaxLength}
                  />
                  <Badge
                    className="absolute right-1.5 top-1/2 -translate-y-1/2"
                    variant="secondary"
                  >
                    {field?.value?.length}/{titleMaxLength}
                  </Badge>
                </div>
              </FormControl>
              <FormDescription>Name your goal.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loadingCreateGoalanization}>
          {loadingCreateGoalanization ? (
            <LucideLoader2 className="mr-2 size-3.5 animate-spin" />
          ) : (
            <LucidePlus className="mr-2 size-3.5" />
          )}
          Create
        </Button>
      </form>
    </Form>
  );
}
