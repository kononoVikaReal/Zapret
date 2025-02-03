import dbConnect from '@/lib/db'
import { createSession } from '@/lib/session'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import User from '../../../models/User'

export async function POST(req: NextRequest) {
	await dbConnect()

	try {
		// Получаем данные из запроса
		const { username, password, email } = await req.json()
		// console.log({ username, password, email })
		// Проверка на существующего пользователя с таким логином или почтой
		const existingUser = await User.findOne({
			$or: [{ name: username }, { email: email }],
		})
		// console.log(existingUser)
		if (existingUser) {
			return new NextResponse(
				JSON.stringify({
					message: 'Пользователь с таким логином или почтой уже существует',
				}),
				{ status: 400 }
			)
		}

		// Хеширование пароля перед сохранением
		const hashedPassword = await bcrypt.hash(password, 10)

		// Создание нового пользователя
		const newUser = new User({
			name: username,
			password: hashedPassword,
			email: email,
			isAdmin: false,
		})

		// Сохранение пользователя в базе данных
		await newUser.save()

		// Создаём сессию, передавая захэшированный пароль
		await createSession(
			newUser.name,
			newUser.password, // Передаём захэшированный пароль
			newUser.email,
			newUser.isAdmin
		)

		return NextResponse.json({
			message: 'Регистрация успешна',
			username: newUser.name,
			email: newUser.email,
		})
	} catch (error: any) {
		// console.log(error)
		return new NextResponse(
			JSON.stringify({ message: 'Ошибка регистрации пользователя' }),
			{ status: 500 }
		)
	}
}
