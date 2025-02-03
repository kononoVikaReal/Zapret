import dbConnect from '@/lib/db'
import Comments from '@/models/Comments'
import { Types } from 'mongoose'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	await dbConnect()

	try {
		const { author, content, parentID } = await request.json() // Получаем данные из запроса

		// Если parentID существует, преобразуем его в ObjectId
		let parentObjectId = null
		if (parentID) {
			parentObjectId = new Types.ObjectId(parentID) // Преобразуем строку в ObjectId
		}

		// Если parentID существует, обновляем replyCount родительского комментария
		if (parentObjectId) {
			const parentComment = await Comments.findById(parentObjectId)

			if (parentComment) {
				parentComment.replyCount += 1
				await parentComment.save() // Сохраняем обновленный родительский комментарий
			} else {
				return NextResponse.json(
					{ error: 'Родительский комментарий не найден' },
					{ status: 405 }
				)
			}
		}

		// Создаем новый комментарий
		const newComment = new Comments({
			author,
			content,
			parent: parentObjectId, // Если parentID есть, передаем его как ObjectId, если нет - null
			replyCount: 0, // Начальное значение replyCount
		})

		await newComment.save() // Сохраняем новый комментарий

		return NextResponse.json(newComment) // Возвращаем новый комментарий
	} catch (error: any) {
		return new NextResponse('MongoDB [Comments] error', { status: 500 })
	}
}
