import dbConnect from '@/lib/db'
import Comments from '@/models/Comments'
import { Types } from 'mongoose'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const url = new URL(request.url)
	const parentId = url.searchParams.get('parentId') // Получаем родительский ID из параметров запроса

	if (!parentId) {
		return new NextResponse('parentId is required', { status: 400 })
	}

	// Преобразуем parentId в ObjectId
	let objectId
	try {
		objectId = new Types.ObjectId(parentId)
		// console.log(objectId)
	} catch (error) {
		return new NextResponse('Invalid parentId format', { status: 400 })
	}

	await dbConnect()

	try {
		const replies = await Comments.find({ parent: objectId })

		return NextResponse.json(replies)
	} catch (error: any) {
		return new NextResponse('MongoDB [Comments] error', { status: 500 })
	}
}
