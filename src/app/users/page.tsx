'use client'
import { setBearerToken } from '@/lib/forMiddleware'
import { IUser } from '@/models/User'
import { useEffect, useState } from 'react'

const Page = () => {
	const [users, setUsers] = useState<IUser[]>([])

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				let token = setBearerToken()
				const res = await fetch('/api/users', {
					method: 'GET',
					credentials: 'include', // ВАЖНО: чтобы куки передавались
					headers: {
						Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
						'Content-Type': 'application/json',
					},
				})

				// console.log(res)
				if (!res.ok) {
					throw new Error('Network response was not ok')
				}
				const data: IUser[] = await res.json()
				setUsers(data)
				// console.log(data)
			} catch (error) {
				console.error('Ошибка запроса пользователей:', error)
			}
		}

		fetchUsers()
	}, [])

	return (
		<div>
			<h1>Users</h1>
			<ul>
				{users.map(user => (
					<span key={user.login}>{user.login}</span>
				))}
			</ul>
		</div>
	)
}

export default Page
