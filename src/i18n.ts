import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "./service";

const supportedLanguages = [
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
  "zn",
];

export default getRequestConfig(async () => {
  const userLocale = await getUserLocale();

  const locale = supportedLanguages.includes(userLocale) ? userLocale : "en";

  console.log(`User locale: ${locale}`);

  return {
    locale: locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
