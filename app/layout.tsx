import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RevealObserver } from "@/components/motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hawthorn-ai-labs.example.com"),
  title: {
    default: "Hawthorn AI Labs — Custom AI Models & Agentic Systems",
    template: "%s · Hawthorn AI Labs",
  },
  description:
    "Hawthorn AI Labs builds custom fine-tuned AI models and agentic systems, then deploys them into enterprise pipelines — from research to production.",
  keywords: [
    "custom AI models",
    "fine-tuning",
    "agentic systems",
    "enterprise AI deployment",
    "LLM engineering",
    "AI consultancy",
  ],
  openGraph: {
    title: "Hawthorn AI Labs — Custom AI Models & Agentic Systems",
    description:
      "Your data. Custom models. Real agents. We build and fine-tune custom AI models and deploy agentic systems that work for your business.",
    type: "website",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#05070c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        {/* Pre-paint theme resolution: must be the first thing in the body so
            the correct palette is applied before any content paints. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <TooltipProvider delayDuration={200}>
          <SiteHeader />
          <div className="flex min-h-screen flex-col pt-[68px]">
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </TooltipProvider>
        <RevealObserver />
      </body>
    </html>
  );
}
