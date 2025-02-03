import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import 'server-only'
import { decrypt, encrypt } from './crypt'

export async function createSession(
	name: string,
	password: string,
	email: string,
	isAdmin: boolean
): Promise<string> {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
	const session = await encrypt({ name, password, email, isAdmin, expiresAt })
	const cookieStore = await cookies()

	cookieStore.set('session', session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	})
	return session // Вернуть строку
	redirect('/')
}

export const verifySession = cache(async () => {
	try {
		const cookie = (await cookies()).get('session')?.value

		if (!cookie) {
			return null // Просто возвращаем null, без throw
		}

		const session = await decrypt(cookie)

		if (!session?.name) {
			return null // Если данные в сессии некорректные
		}

		return {
			isAuth: true,
			name: session.name,
			password: session.password,
			email: session.email,
			isAdmin: session.isAdmin,
		}
	} catch (error) {
		console.error('Ошибка при верификации сессии:', error)
		return null
	}
})

export async function updateSession() {
	const cookieStore = await cookies() // Дожидаемся результата

	const session = cookieStore.get('session')?.value
	const payload = await decrypt(session)

	if (!session || !payload) {
		return null
	}

	const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
	cookieStore.set('session', session, {
		httpOnly: true,
		secure: true,
		expires: expires,
		sameSite: 'lax',
		path: '/',
	})
}

export async function deleteSession() {
	const cookieStore = await cookies()
	cookieStore.delete('session')
	redirect('/login')
}
