"use client";

import { Button } from "@/components/ui/button";
import { Frequency } from "@/constants/frequency.constant";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export function Tabs() {
  const router = useRouter();
  const parmas = useSearchParams();

  function setParams(frequency?: any) {
    if (frequency) {
      router.replace(`?frequency=${frequency}`, {
        scroll: false,
      });
      return;
    }

    router.replace(`?frequency=${Frequency.DAILY}`, {
      scroll: false,
    });
  }

  useEffect(() => {
    if (!parmas.get("frequency")) {
      setParams();
    }
  }, []);

  return (
    <ul className="mb-2 flex max-w-full flex-row items-center gap-1 overflow-y-auto pb-2">
      {Object.entries(Frequency).map(([key, value]) => (
        <li key={key}>
          <Button
            variant={parmas.get("frequency") === value ? "secondary" : "ghost"}
            className="capitalize"
            onClick={() => setParams(value)}
          >
            {value}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export function FrequencyTabs() {
  return (
    <Suspense>
      <Tabs />
    </Suspense>
  );
}
