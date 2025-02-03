export const setBearerToken = () => {
	let check = localStorage.getItem('token')
	if (!check) {
		// console.log('Token не найден!')
		localStorage.setItem('token', 'iTE6M+ilPFeoQxowi01cp8Vut+')
		// console.log('Token установлен!')
		check = 'iTE6M+ilPFeoQxowi01cp8Vut+'
	}
	return check
}

const validateToken = (token: string | undefined) => {
	// const validToken = token === process.env.JWT_SECRET_KEY
	const validToken = token === 'iTE6M+ilPFeoQxowi01cp8Vut+'
	// console.log('Comparing token ->', token)
	if (!token || !validToken) {
		return false
	}

	return true
}

export function authMiddleware(request: Request): any {
	// console.log('Request headers ->', request.headers)
	const token = request.headers.get('authorization')?.split(' ')[1] // Извлекаем токен из заголовка Authorization
	// console.log('Token ->', token)

	// Возвращаем результат валидации токена
	return { isValid: validateToken(token) }
}

export function loggingMiddleware(request: Request) {
	return { response: request.method + ' ' + request.url }
}
