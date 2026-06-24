import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import { GlobalSearchModal } from "@/components/search/GlobalSearchModal";

export const metadata: Metadata = {
  title: "PropertyHub360 - Real Estate Command Center",
  description: "Advanced Real Estate Operating System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased text-text-primary bg-background")}>
        <Providers>
          {children}
          <GlobalSearchModal />
        </Providers>
      </body>
    </html>
  );
}
