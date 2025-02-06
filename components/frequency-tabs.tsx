"use client";

import { Button } from "@/components/ui/button";
import { Frequency } from "@/constants/frequency.constant";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function FrequencyTabs() {
  const parmas = useSearchParams();

  return (
    <div className="mb-2 flex max-w-full flex-row items-center gap-1 overflow-y-auto pb-2">
      {Object.entries(Frequency).map(([key, value]) => (
        <Button
          key={key}
          variant={parmas.get("frequency") === value ? "secondary" : "ghost"}
          className="capitalize"
          asChild
        >
          <Link
            href={{
              query: { frequency: value },
            }}
            shallow
            replace
          >
            {value}
          </Link>
        </Button>
      ))}
    </div>
  );
}
