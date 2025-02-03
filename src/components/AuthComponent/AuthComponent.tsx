'use client'
import { setBearerToken } from '@/lib/forMiddleware'
import { useState } from 'react'

interface AuthProps {
	setIsAuth: React.Dispatch<React.SetStateAction<boolean>> // Функция для изменения состояния авторизации
	setName: React.Dispatch<React.SetStateAction<string>>
	setAdminPassword: React.Dispatch<React.SetStateAction<string>>
	setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthComponent = ({
	setIsAuth,
	setName,
	setIsAdmin,
	setAdminPassword,
}: AuthProps) => {
	const [isRegister, setIsRegister] = useState(false) // Состояние для переключения между режимами
	const [username, setUsername] = useState('') // Логин
	const [password, setPassword] = useState('') // Пароль
	const [email, setEmail] = useState('') // Почта (только для регистрации)
	const [error, setError] = useState<string | null>(null) // Для отображения ошибки

	// Функция для отправки данных на сервер для регистрации
	const handleRegister = async () => {
		try {
			let token = setBearerToken()
			const response = await fetch('/api/register', {
				method: 'POST',
				credentials: 'include', // ВАЖНО: чтобы куки передавались
				headers: {
					Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					password,
					email,
				}),
			})
			// const response = await fetch('/api/register', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	credentials: 'include', // ВАЖНО: чтобы браузер принимал куки
			// 	body: JSON.stringify({
			// 		username,
			// 		password,
			// 		email,
			// 	}),
			// })

			const data = await response.json()
			if (!response.ok) {
				throw new Error(
					`Ошибка при регистрации: ${data.message || 'Неизвестная ошибка'}`
				)
			}

			// console.log('Регистрация прошла успешно:', data)

			// Обновляем состояние авторизации
			setIsAuth(true)
			setName(data.username)
			setEmail(data.email)
		} catch (error: any) {
			setError(error.message)
		}
	}
	// const handleRegister = async () => {
	// 	try {
	// 		const response = await fetch('/api/register', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify({
	// 				username,
	// 				password,
	// 				email,
	// 			}),
	// 		})

	// 		const data = await response.json()
	// 		if (!response.ok) {
	// 			throw new Error(
	// 				`Ошибка при регистрации: ${data.message || 'Неизвестная ошибка'}`
	// 			)
	// 		}

	// 		console.log('Регистрация прошла успешно:', data)

	// 		// setIsAuth(true) // Обновляем состояние авторизации
	// 	} catch (error: any) {
	// 		setError(error.message)
	// 	}
	// }

	// Функция для отправки данных на сервер для авторизации
	const handleLogin = async () => {
		try {
			// console.log(username, password)

			let token = setBearerToken()
			const response = await fetch('/api/login', {
				method: 'POST',
				credentials: 'include', // ВАЖНО: чтобы куки передавались
				headers: {
					Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			})

			// const response = await fetch('/api/login', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json', // Убедитесь, что это указано
			// 	},
			// 	body: JSON.stringify({
			// 		username: username,
			// 		password: password,
			// 	}),
			// 	credentials: 'include', // Добавляем, чтобы браузер принимал и отправлял куки
			// })

			const data = await response.json()
			if (!response.ok) {
				throw new Error(
					`Ошибка при авторизации: ${data.message || 'Неизвестная ошибка'}`
				)
			}

			// console.log('Авторизация прошла успешно:', data)
			// console.log(data.login)
			setName(data.login)
			setIsAdmin(data.isAdmin)
			if (data.isAdmin) {
				// console.log('Администратор вошел в систему!')
				setAdminPassword(data.password)
			}
			setIsAuth(true) // Обновляем состояние авторизации
		} catch (error: any) {
			setError(error.message)
		}
	}

	// Функция для отправки формы в зависимости от режима
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null) // Очистить ошибки перед новой попыткой

		if (isRegister) {
			await handleRegister()
		} else {
			await handleLogin()
		}
	}

	return (
		<div className='auth-container p-4 border rounded-lg max-w-sm mx-auto'>
			<div className='flex justify-between mb-4'>
				<button
					className={`md:text-base text-xs sm:px-2 px-2 py-2 rounded-md ${
						!isRegister ? 'bg-blue-500 text-white' : 'bg-gray-300'
					}`}
					onClick={() => setIsRegister(false)}
				>
					Авторизоваться
				</button>
				<button
					className={`md:text-base text-xs sm:px-2 px-2 py-2 rounded-md ${
						isRegister ? 'bg-blue-500 text-white' : 'bg-gray-300'
					}`}
					onClick={() => setIsRegister(true)}
				>
					Зарегистрироваться
				</button>
			</div>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Логин
					</label>
					<input
						type='text'
						value={username}
						onChange={e => setUsername(e.target.value)}
						required
						className='w-full p-2 border rounded-md'
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Пароль
					</label>
					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
						className='w-full p-2 border rounded-md'
					/>
				</div>

				{isRegister && (
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Почта
						</label>
						<input
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
							className='w-full p-2 border rounded-md'
						/>
					</div>
				)}

				{error && <div className='text-red-500 text-sm'>{error}</div>}

				<div>
					<button
						type='submit'
						className='w-full py-2 bg-blue-500 text-white rounded-md'
					>
						{isRegister ? 'Зарегистрироваться' : 'Авторизоваться'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default AuthComponent
