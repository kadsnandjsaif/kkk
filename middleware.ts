import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('admin-auth')?.value === 'true';

  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Разрешаем доступ к странице логина
    if (request.nextUrl.pathname === '/admin/login') {
      if (isAuthenticated) {
        // Если уже авторизован, редирект в админку
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Для всех других /admin routes проверяем аутентификацию
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};