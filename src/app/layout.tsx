import "../styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { fontSans } from "../config/fonts";
import { Providers } from "../providers/providers";

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
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
