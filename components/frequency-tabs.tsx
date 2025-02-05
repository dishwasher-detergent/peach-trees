"use client";

import { Button } from "@/components/ui/button";
import { Frequency } from "@/constants/frequency.constant";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function FrequencyTabs() {
  const parmas = useSearchParams();

  return (
    <div className="flex flex-row items-center gap-1 pb-2">
      {Object.entries(Frequency).map(([key, value]) => (
        <Button
          key={key}
          variant={parmas.get("frequency") === value ? "secondary" : "ghost"}
          size="sm"
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
