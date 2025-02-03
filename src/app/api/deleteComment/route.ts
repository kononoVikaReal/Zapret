import dbConnect from '@/lib/db'
import Comments from '@/models/Comments'
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import User from '../../../models/User'

export async function PATCH(req: NextRequest) {
	await dbConnect()

	try {
		// Получаем данные из запроса
		const { parentID, name, password, reason } = await req.json()
		// console.log({ parentID, name, password, reason })
		// Проверяем, что все нужные данные переданы
		if (!parentID || !name || !password || !reason) {
			return new NextResponse(
				JSON.stringify({ message: 'Все поля обязательны' }),
				{ status: 400 }
			)
		}

		// Если parentID существует, преобразуем его в ObjectId
		let parentObjectId = null
		if (parentID) {
			parentObjectId = new Types.ObjectId(parentID) // Преобразуем строку в ObjectId
		}

		// Ищем пользователя с таким логином
		const user = await User.findOne({ name })

		if (!user) {
			return new NextResponse(
				JSON.stringify({ message: 'Пользователь не найден' }),
				{ status: 404 }
			)
		}
		// console.log('Сверка паролей перед удалением комментария:')
		// console.log('Запрошенный пароль от пользователя: ', password)
		// console.log('Запрошенный пароль: ', user.password)
		// Проверяем пароль
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			return new NextResponse(JSON.stringify({ message: 'Неверный пароль' }), {
				status: 403,
			})
		}

		// Проверяем, что это администратор
		if (!user.isAdmin) {
			return new NextResponse(
				JSON.stringify({
					message: 'Недостаточно прав для выполнения этого действия',
				}),
				{ status: 403 }
			)
		}

		// Ищем комментарий по id
		const comment = await Comments.findById(parentObjectId)
		if (!comment) {
			return new NextResponse(
				JSON.stringify({ message: 'Комментарий не найден' }),
				{ status: 404 }
			)
		}

		// Обновляем content комментария на указанную причину
		comment.content = 'Комментарий удален администратором по причине: ' + reason
		await comment.save()

		return new NextResponse(
			JSON.stringify({ message: 'Комментарий успешно обновлён' }),
			{ status: 200 }
		)
	} catch (error: any) {
		return new NextResponse(JSON.stringify({ message: 'Ошибка сервера' }), {
			status: 500,
		})
	}
}
