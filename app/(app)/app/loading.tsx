import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="columns-1 items-start gap-4 space-y-4 md:columns-2 lg:columns-3">
      <Card className="break-inside-avoid-column rounded-md border-primary/50 bg-linear-to-bl from-primary/10 to-background ring-4 ring-primary/20">
        <CardHeader className="mb-4 space-y-0 border-b border-dashed border-primary/50">
          <div>
            <Skeleton className="mb-1 h-7 w-full" />
            <Skeleton className="mb-4 h-4 w-1/2" />
          </div>
          <div className="flex flex-row items-center">
            <div className="w-1/2 space-y-2">
              <p className="text-sm">Regularity</p>
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="mb-4 flex w-full flex-row gap-4 border-b border-dashed border-primary/50">
          <div className="w-2/3 flex-1 space-y-2">
            <p className="text-sm">Overall Progress</p>
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="flex w-1/3 flex-col gap-2">
            <div className="space-y-2">
              <p className="text-sm">Streak</p>
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="space-y-2">
              <p className="text-sm">Record</p>
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-10 flex-none" />
        </CardFooter>
      </Card>
    </section>
  );
}
