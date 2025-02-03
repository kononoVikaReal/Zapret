'use client'
import Comment from '@/components/Comment/Comment'
import { setBearerToken } from '@/lib/forMiddleware'
import { useEffect, useState } from 'react'
import { CommentProps } from '../Comment/Comment.props'

const CommentSection = ({
	isAuth,
	name,
	updateTrigger,
	setTrigger,
	isAdmin,
	adminPassword,
}: {
	isAuth: boolean
	name?: string
	updateTrigger: boolean
	setTrigger: () => void
	isAdmin: boolean
	adminPassword?: string
}) => {
	const [comments, setComments] = useState<CommentProps[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	// const [isAuth, setIsAuth] = useState<boolean>(false)

	useEffect(() => {
		const fetchComments = async () => {
			try {
				let token = setBearerToken()
				const response = await fetch('/api/getComments', {
					method: 'GET',
					credentials: 'include', // ВАЖНО: чтобы куки передавались
					headers: {
						Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
						'Content-Type': 'application/json',
					},
				})
				if (!response.ok) {
					throw new Error('Не удалось загрузить комментарии')
				}
				const data = await response.json()
				setComments(data)
			} catch (err: any) {
				setError(err.message || 'Ошибка загрузки')
			} finally {
				setLoading(false)
			}
		}

		fetchComments()
	}, [updateTrigger])

	if (loading) {
		return <p>Загрузка комментариев...</p>
	}

	if (error) {
		return <p>Ошибка, сообщите её администратору: {error}</p>
	}

	return (
		<div className='px-4 py-2'>
			<h2>Комментарии</h2>

			{comments.length === 0 ? (
				<p>Нет комментариев</p>
			) : (
				<ul>
					{comments
						.filter(comment => comment.parent === null) // Отображаем только корневые комментарии
						.map(comment => (
							<li key={comment._id}>
								<Comment
									_id={comment._id}
									author={comment.author}
									createdAt={comment.createdAt}
									content={comment.content}
									replyCount={comment.replyCount}
									parent={comment.author}
									parentID={comment._id}
									replies={comment.replies}
									isAuth={isAuth}
									username={name}
									onCommentAdded={setTrigger}
									isAdmin={isAdmin}
									password={adminPassword}
								/>
							</li>
						))}
				</ul>
			)}
		</div>
	)
}

export default CommentSection
