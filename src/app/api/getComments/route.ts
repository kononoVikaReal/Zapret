import dbConnect from '@/lib/db'
import Comments from '@/models/Comments'
import { NextResponse } from 'next/server'

export async function GET() {
	await dbConnect()
	try {
		const users = await Comments.find({})
		return NextResponse.json(users)
	} catch (error: any) {
		console.log('Get comments error -> ', error)
		return new NextResponse('MongoDB [Comments] error', { status: 505 })
	}
}
