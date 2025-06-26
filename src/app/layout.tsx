import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { AuthProvider } from "@/lib/auth";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "NeuroGeneration - Official Website",
  description: "The official website for the NG teens organization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AuthProvider>
          <ThemeProvider>
            <Navigation />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
