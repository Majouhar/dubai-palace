import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header/header";

export const metadata: Metadata = {
  title: "Dubai Pardha Palace : Home",
  description: "If you are looking for Pardha or Abayas, this is your place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
