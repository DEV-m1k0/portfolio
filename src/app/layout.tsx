import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-heading",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Антон Князев — Backend-разработчик",
  description:
    "Портфолио веб-разработчика. Backend для бизнес-проектов: архитектура, API, интеграции.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${spaceGrotesk.variable}`}>
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
