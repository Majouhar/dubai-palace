import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { i18n } from "./i18n";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

function getLocale(request: NextRequest) {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: { [key: string]: string } = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}
const PUBLIC_FILE = /\.(.*)$/;
export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const localeInPathName = i18n.locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  );
  let locale = localeInPathName;
  if (!locale) {
    locale = getLocale(req);
  }

  if (
    !localeInPathName &&
    !(
      pathname.startsWith("/_next") ||
      pathname.includes("/api/") ||
      PUBLIC_FILE.test(pathname)
    )
  ) {
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        req.url
      )
    );
  } else if (
    pathname === `/${locale}` ||
    pathname.includes("items") ||
    pathname.includes("login")
  ) {
    return NextResponse.next();
  }
  const authMiddleware = withAuth({
    pages: {
      signIn: `/${locale}/login`,
    },
  });
  // @ts-expect-error
  return authMiddleware(req, event);
}
