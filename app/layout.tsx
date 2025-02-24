import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

import { Karla as Font } from "next/font/google";

const font = Font({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} dark min-h-dvh overflow-x-hidden antialiased bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] [--pattern-fg:var(--color-muted)]/50 dark:[--pattern-fg:var(--color-muted)]/10`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
