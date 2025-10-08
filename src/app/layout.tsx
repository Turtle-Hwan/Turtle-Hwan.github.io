import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";

export const metadata: Metadata = {
  title: "WebOS GUI",
  description: "A web-based OS GUI simulation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-cover bg-no-repeat font-sans">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
