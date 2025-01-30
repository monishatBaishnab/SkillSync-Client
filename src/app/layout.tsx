import "../styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { fontSans } from "../config/fonts";
import { Providers } from "../providers/providers";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "SkillSync",
  description: "Skill shearing site",
  icons: {
    icon: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <header className="h-16 border-b border-b-neutral-200/80">
            <Navbar />
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
