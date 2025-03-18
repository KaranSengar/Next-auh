import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  // ✅ Sirf login aur signup ko public rakho
  const isPublicPath = path === "/login" || path === "/signup";

  // ✅ Agar token hai to login/signup access na ho, home pe bhej do
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ❌ Agar token nahi hai aur private page access kare to login pe bhej do
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// ✅ Middleware ko apply karne ke liye ye routes define karo
export const config = {
  matcher: ["/", "/profile", "/dashboard", "/settings", "/login", "/signup"],
};
