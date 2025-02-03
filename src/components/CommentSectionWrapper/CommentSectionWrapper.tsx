'use client'

import { setBearerToken } from '@/lib/forMiddleware'
import { useEffect, useReducer, useState } from 'react'
import AuthComponent from '../AuthComponent/AuthComponent'
import CommentField from '../CommentField/CommentField'
import CommentSection from '../CommentSection/CommentSection'

const CommentSectionWrapper = () => {
	const [isAuth, setIsAuth] = useState<boolean>(false)
	const [isAdmin, setIsAdmin] = useState<boolean>(false)
	const [username, setUsername] = useState<string>('')
	const [adminPassword, setAdminPassword] = useState<string>('')
	// Управляем обновлением комментариев через useReducer
	const [updateTrigger, triggerUpdate] = useReducer(state => !state, false)

	useEffect(() => {
		const checkSession = async () => {
			try {
				let token = setBearerToken()
				// console.log('Token before fetch ->', token)
				const response = await fetch('/api/verifySession', {
					method: 'GET',
					credentials: 'include', // ВАЖНО: чтобы куки передавались
					headers: {
						Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
						'Content-Type': 'application/json',
					},
				})

				if (!response.ok) {
					// throw new Error('Сессия недействительна')
					// console.log('Сессия недействительна')
					return
				}

				const data = await response.json()

				if (data.isAdmin) {
					setIsAdmin(true)
					setAdminPassword(data.password)
				}

				setUsername(data.name)
				setIsAuth(true) // Сохраняем сессию в `useState`
			} catch (error) {
				console.error('Ошибка проверки сессии:', error)
				setIsAuth(false) // Если ошибка — сбрасываем сессию
			}
		}

		checkSession()
	}, [])

	// useEffect(() => {
	// 	console.log('username изменился:', username)
	// }, [username])

	// useEffect(() => {
	// 	console.log('admin password изменился:', adminPassword)
	// }, [adminPassword])

	return (
		<div>
			{!isAuth && (
				<AuthComponent
					setIsAuth={setIsAuth}
					setName={setUsername}
					setIsAdmin={setIsAdmin}
					setAdminPassword={setAdminPassword}
				/>
			)}
			{isAuth && (
				<CommentField username={username} onCommentAdded={triggerUpdate} />
			)}
			<CommentSection
				isAuth={isAuth}
				name={username === '' ? undefined : username}
				updateTrigger={updateTrigger}
				setTrigger={triggerUpdate}
				isAdmin={isAdmin}
				adminPassword={adminPassword}
			/>
		</div>
	)
}

export default CommentSectionWrapper
