import dbConnect from '@/lib/db'
import { createSession } from '@/lib/session'
import bcrypt from 'bcryptjs' // Для сравнения пароля
import { NextRequest, NextResponse } from 'next/server' // Импорт NextResponse // Функция подключения к базе данных
import User from '../../../models/User' // Путь к модели пользователя

export async function POST(req: NextRequest) {
	await dbConnect()

	try {
		// console.log(req)
		const { username, password } = await req.json()
		// console.log(username, password)
		// Проверка, что логин и пароль переданы
		if (!username || !password) {
			return new NextResponse(
				JSON.stringify({ message: 'Логин и пароль обязательны' }),
				{ status: 400 }
			)
		}
		// Проверка наличия пользователя с таким логином
		const user = await User.findOne({ name: username })
		// console.log(user)

		if (!user) {
			return new NextResponse(
				JSON.stringify({ message: 'Пользователь не найден' }),
				{ status: 400 }
			)
		}

		// Сравнение пароля с хэшированным в базе данных
		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) {
			return new NextResponse(JSON.stringify({ message: 'Неверный пароль' }), {
				status: 400,
			})
		}
		const isAdmin = user.isAdmin

		// Создаём сессию
		const session = await createSession(
			user.name,
			password,
			user.email,
			user.isAdmin
		)

		// Устанавливаем куки с сессией
		const response = NextResponse.json({
			login: user.name,
			isAdmin: user.isAdmin,
		})
		response.cookies.set('session', session, {
			httpOnly: true,
			secure: true,
			path: '/',
			sameSite: 'lax',
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 дней
		})

		return new NextResponse(
			JSON.stringify({
				message: 'Авторизация прошла успешно',
				login: username,
				isAdmin: isAdmin,
				password: password,
			}),
			{ status: 200 }
		)
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({ message: 'Ошибка при авторизации' }),
			{ status: 500 }
		)
	}
}
