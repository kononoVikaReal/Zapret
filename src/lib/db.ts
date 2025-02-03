import mongoose from 'mongoose'
const connection: { isConnected?: number } = {}

async function dbConnect() {
	console.log('Начало подключения к базе данных')
	if (connection.isConnected) {
		console.log('Уже подключились к базе данных')
		return
	}
	console.log('Подключаемся к базе данных')
	const db = await mongoose.connect(process.env.MONGODB_URI!)
	console.log('Подключились к базе данных')
	connection.isConnected = db.connections[0].readyState
}

export default dbConnect
