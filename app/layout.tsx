import type { Metadata, Viewport } from "next";
import "./globals.css";
import PWAProvider from "@/components/PWAProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0070f3",
};

export const metadata: Metadata = {
  title: "Bora almoçar!",
  description: "Get random lunch place suggestions",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/icon-192.png",
  },
  authors: [{ name: "André Dargains" }],
  openGraph: {
    title: "Bora almoçar!",
    description: "Get random lunch place suggestions",
    type: "website",
  },
  robots: "index, follow",
  keywords: ["lunch", "restaurants", "random", "suggestions"],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bora almoçar!",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <PWAProvider />
      </body>
    </html>
  );
}
