import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { AuthProvider } from "@/lib/auth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import ClientErrorHandler from "@/components/ClientErrorHandler";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          <AuthProvider>
            <ThemeProvider>
              <ClientErrorHandler />
              <div className="min-h-screen flex flex-col">
                <Navigation />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </ThemeProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}