import { authMiddleware, loggingMiddleware } from '@/lib/forMiddleware'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
	matcher: '/api/:path*', // Применяется ко всем API-маршрутам
}

export default function middleware(request: NextRequest) {
	// Логирование всех запросов
	if (request.url.includes('/api/')) {
		const logResult = loggingMiddleware(request)
		// console.log('Request response ->', logResult.response)
	}

	// Проверка авторизации
	const authResult = authMiddleware(request)
	if (!authResult?.isValid) {
		return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
			status: 401,
		})
	}

	return NextResponse.next()
}
