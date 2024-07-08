// middleware.ts
import { getToken } from '@/utils/localStorage/token';
import { NextResponse, type NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const accessToken = request.cookies.has('auth');
  // 로그인 + 로그인 페이지
  if (accessToken && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  // 로그인 X + 로그인 페이지 X
  if (!accessToken && !request.nextUrl.pathname.startsWith('/login')) {
    console.log('22222');
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images/header/icon_logo_big|images/icon_check_on|images/icon_check_off|images/Footer/icon_footer_logo).*)',
  ],
};
