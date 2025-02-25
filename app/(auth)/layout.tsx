import { getLoggedInUser } from "@/lib/server/appwrite";

import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser();

  if (user) {
    redirect("/");
  }

  return (
    <main className="grid min-h-dvh w-full place-items-center bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] p-4 [--pattern-fg:var(--color-muted)]/50 dark:[--pattern-fg:var(--color-muted)]/10">
      {children}
    </main>
  );
}
