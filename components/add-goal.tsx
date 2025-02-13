"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader2, LucidePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { AutosizeTextarea } from "@/components/ui/auto-size-textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DyanmicDrawer } from "@/components/ui/dynamic-drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createGoal } from "@/lib/server/utils";
import { cn } from "@/lib/utils";

export function AddGoal() {
  const [open, setOpen] = useState(false);

  return (
    <DyanmicDrawer
      title="Habit"
      description="Create a new goal"
      open={open}
      setOpen={setOpen}
      button={
        <Button
          variant="outline"
          className="border-primary/50 bg-linear-to-bl from-primary/10 to-background ring-4 ring-primary/20"
        >
          Add Habit
          <LucidePlus className="ml-2 size-3.5" />
        </Button>
      }
    >
      <div className="p-4">
        <CreateForm setOpen={setOpen} />
      </div>
    </DyanmicDrawer>
  );
}

interface FormProps extends React.ComponentProps<"form"> {
  setOpen: (e: boolean) => void;
}

const titleMaxLength = 64;
const descriptionMaxLength = 256;

export const addGoalSchema = z.object({
  title: z.string().min(1).max(titleMaxLength),
  description: z.string().min(1).max(descriptionMaxLength),
  frequency: z.string().min(1),
});

function CreateForm({ className, setOpen }: FormProps) {
  const router = useRouter();
  const [loadingCreateGoalanization, setLoadingCreateGoalanization] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof addGoalSchema>>({
    resolver: zodResolver(addGoalSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addGoalSchema>) {
    setLoadingCreateGoalanization(true);

    const data = await createGoal(values);

    if (data.success) {
      toast.success(data.message);
      router.push(`/app?frequency=${values.frequency}`);
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
        className={cn(
          "grid flex-1 items-start gap-4 overflow-hidden",
          className,
        )}
      >
        <div className="h-full space-y-2 overflow-auto p-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal</FormLabel>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <div className="relative">
                    <AutosizeTextarea
                      {...field}
                      placeholder="This is a full length description."
                      className="pb-8"
                      maxLength={descriptionMaxLength}
                    />
                    <Badge
                      className="absolute bottom-2 left-2"
                      variant="secondary"
                    >
                      {field?.value?.length ?? 0}/{descriptionMaxLength}
                    </Badge>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select how often" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="semi-monthly">Semi-Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="semesterly">Semesterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
