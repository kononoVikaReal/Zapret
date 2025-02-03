import dbConnect from '@/lib/db'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function GET() {
	await dbConnect()
	try {
		const users = await User.find({})
		return NextResponse.json(users)
	} catch (error: any) {
		return new NextResponse('MongoDB [Users] error', { status: 500 })
	}
}
