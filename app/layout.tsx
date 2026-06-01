import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Where to Eat",
  description: "Get random lunch place suggestions",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.svg",
  },
  authors: [{ name: "Where to Eat Team" }],
  openGraph: {
    title: "Where to Eat",
    description: "Get random lunch place suggestions",
    type: "website",
  },
  robots: "index, follow",
  keywords: ["lunch", "restaurants", "random", "suggestions"],
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
