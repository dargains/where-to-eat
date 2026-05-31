import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Where to Eat",
  description: "Get random lunch place suggestions",
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
