'use client'
import { setBearerToken } from '@/lib/forMiddleware'
import { useState } from 'react'
import { CommentFieldProps } from './CommentField.props'

const CommentField = ({
	username,
	parent,
	parentID,
	onCommentAdded,
}: CommentFieldProps) => {
	const [commentText, setCommentText] = useState('')

	// Обработчик изменения текста комментария
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCommentText(event.target.value)
	}

	const postComment = async (
		author: string,
		content: string,
		parentID?: string
	) => {
		try {
			let token = setBearerToken()
			const response = await fetch('/api/postComment', {
				method: 'POST',
				credentials: 'include', // ВАЖНО: чтобы куки передавались
				headers: {
					Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					author, // Автор комментария
					content, // Содержание комментария
					parentID, // ID родительского комментария (необязательно)
				}),
			})
			// const response = await fetch('/api/postComment', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify({
			// 		author, // Автор комментария
			// 		content, // Содержание комментария
			// 		parentID, // ID родительского комментария (необязательно)
			// 	}),
			// })

			if (!response.ok) {
				throw new Error('Ошибка при отправке комментария')
			}

			const data = await response.json()
			// console.log('Комментарий успешно отправлен:', data)
			onCommentAdded()
		} catch (error) {
			// console.error('Ошибка:', error)
		}
	}

	// Функция отправки комментария
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault() // Предотвращает перезагрузку страницы

		if (!commentText.trim()) {
			alert('Комментарий не может быть пустым')
			return
		}

		try {
			// console.log(
			// 	`Попытка отправить комментарий: ${username} ${commentText}, ${parentID!}`
			// )
			await postComment(username, commentText, parentID!) // Отправляем комментарий
			setCommentText('') // Очистка поля ввода после отправки
		} catch (error) {
			console.error('Ошибка отправки комментария:', error)
		}
	}
	return (
		<form className='px-4 py-2' onSubmit={handleSubmit}>
			<div className='flex justify-between items-center'>
				<div className='flex gap-4 mb-2'>
					<span>{username}</span>

					<span>
						{parent && (
							<div className='flex gap-4 justify-between items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='size-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
									/>
								</svg>
								<span>{parent}</span>
							</div>
						)}
					</span>
				</div>

				<div
					className='flex items-center gap-2 cursor-pointer group'
					onClick={handleSubmit}
				>
					<span className='group-hover:text-blue-500'>опубликовать</span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='size-6 group-hover:stroke-blue-500'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
						/>
					</svg>
				</div>
			</div>
			<div className=''>
				{/* COMMENT */}
				<input
					type='text'
					value={commentText}
					placeholder='Напишите ваш комментарий'
					className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm'
					onChange={handleChange}
				/>
			</div>
		</form>
	)
}

export default CommentField
