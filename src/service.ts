"use server";

import { cookies } from "next/headers";

export type Locale = (typeof locales)[number];

const locales = [
  "de",
  "en",
  "es",
  "fa",
  "fr",
  "it",
  "ja",
  "pt",
  "ru",
  "tr",
  "zh",
] as const;

const defaultLocale: Locale = "en";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}
