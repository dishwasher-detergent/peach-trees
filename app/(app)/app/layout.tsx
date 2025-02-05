import { Nav } from "@/components/ui/nav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <main className="mx-auto h-full max-w-6xl p-4 px-4 md:px-8">
        {children}
      </main>
    </>
  );
}
