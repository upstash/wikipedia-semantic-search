import "./globals.css";
import { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Movies Semantic Search",
  description: "A simple movie search engine",
  icons: {
    icon: "/favicon-32x32.png",
  },
};

const serif = EB_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  style: ["normal"],
  weight: ["400", "600"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  style: ["normal"],
  weight: ["400", "600"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${serif.variable} ${sans.variable} font-sans`}
    >
      <body className="antialiased min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
