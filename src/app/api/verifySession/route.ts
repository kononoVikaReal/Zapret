import { verifySession } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const session = await verifySession()

		if (!session) {
			return NextResponse.json({ isAuth: false }, { status: 401 })
		}

		return NextResponse.json(session)
	} catch (error) {
		return NextResponse.json(
			{ isAuth: false, message: 'Ошибка сервера' },
			{ status: 500 }
		)
	}
}
