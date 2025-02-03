'use client'
import { setBearerToken } from '@/lib/forMiddleware'
import { useState } from 'react'
import CommentField from '../CommentField/CommentField'
import DeleteField from '../DeleteField/DeleteField'
import styles from './Comment.module.css'
import { CommentProps } from './Comment.props'

const Comment = ({
	_id,
	author,
	createdAt,
	content,
	replyCount = 0,
	parent,
	parentID,
	replies = [], // Для хранения загруженных ответов
	isAuth,
	username,
	onCommentAdded,
	isAdmin,
	password,
}: CommentProps) => {
	const [showReplies, setShowReplies] = useState(false)
	const [replyField, setReplyField] = useState(false)
	const [deleteField, setDeleteField] = useState(false)
	const [loadingReplies, setLoadingReplies] = useState(false)
	const [repliesData, setRepliesData] = useState<CommentProps[]>(replies)
	const [deleteCommentID, setDeleteCommentID] = useState<String | null>(null)
	// Функция для загрузки ответов
	const fetchReplies = async () => {
		setLoadingReplies(true)
		try {
			let token = setBearerToken()
			const response = await fetch(`/api/getAnswers?parentId=${_id}`, {
				method: 'GET',
				credentials: 'include', // ВАЖНО: чтобы куки передавались
				headers: {
					Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
					'Content-Type': 'application/json',
				},
			})
			// const response = await fetch(`/api/getAnswers?parentId=${_id}`)
			if (!response.ok) {
				throw new Error('Не удалось загрузить ответы')
			}
			const data = await response.json()
			setRepliesData(data)
		} catch (error) {
			console.error(error)
		} finally {
			setLoadingReplies(false)
		}
	}

	// Переключение видимости ответов
	const toggleReplies = () => {
		if (showReplies) {
			setShowReplies(false)
		} else {
			if (repliesData.length === 0) {
				fetchReplies()
			}
			setShowReplies(true)
		}
	}

	// Переключение видимости ответов
	const toggleReply = () => {
		if (replyField) {
			setReplyField(false)
		} else {
			setReplyField(true)
		}
	}

	// Переключение видимости удаления
	const toggleDelete = (id: string) => {
		if (deleteField) {
			setDeleteField(false)
			setDeleteCommentID(null)
		} else {
			setDeleteField(true)
			setDeleteCommentID(id)
		}
	}

	const adminName = 'TLM Givl Upi'

	return (
		<div className={styles.commentContainer}>
			<div className={styles.commentHeader}>
				<div className='flex flex-1 gap-2'>
					{/* ADMIN ICON */}
					{author === adminName ? (
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
								d='M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5'
							/>
						</svg>
					) : (
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
								d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z'
							/>
						</svg>
					)}
					<span className={styles.username}>{author}</span>
				</div>
				<span className={styles.createdAt}>
					{new Date(createdAt).toLocaleString()}
				</span>
			</div>
			<div className={styles.commentContent}>{content}</div>

			<div
				className={`flex max-[547px]:grid max-[547px]:grid-cols-1 max-[547px]:justify-items-center  text-center gap-4  px-auto mx-auto justify-center items-center mt-2 sm:gap-4 sm:text-justify `}
			>
				<div className='flex gap-4 items-center justify-center'>
					{/* SHOW ANSWERS */}
					{replyCount > 0 && (
						<button
							onClick={toggleReplies}
							className='flex gap-3 items-center w-full'
						>
							{showReplies ? (
								<span>Скрыть ответы</span>
							) : (
								<span>Показать ответы</span>
							)}
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
									d='M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z'
								/>
							</svg>
						</button>
					)}
					{/* SEND ANSWER */}
					{isAuth && (
						<button onClick={toggleReply} className='flex gap-3'>
							<span>Ответить</span>
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
									d='M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z'
								/>
							</svg>
						</button>
					)}
				</div>
				<div className='flex items-center justify-center'>
					{/* ADMIN PERMISSION AT CHANGE COMMENT */}
					{isAdmin && (
						<button onClick={() => toggleDelete(_id)} className='flex gap-3'>
							<span>Удалить комментарий</span>
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
									d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
								/>
							</svg>
						</button>
					)}
				</div>
			</div>
			{/* ADMIN DELETE FIELD */}
			{username &&
				parent &&
				deleteField &&
				password &&
				deleteCommentID === _id && (
					<DeleteField
						onCommentAdded={onCommentAdded}
						name={username}
						password={password}
						parent={parent}
						parentID={_id}
					/>
				)}
			{/* ANSWER FIELD */}
			{username && parent && replyField && (
				<CommentField
					username={username}
					parent={parent}
					parentID={parentID}
					onCommentAdded={onCommentAdded}
				/>
			)}
			{showReplies && (
				<div className={styles.replies}>
					{loadingReplies ? (
						<p>Загрузка...</p>
					) : (
						repliesData.map(reply => (
							<div key={reply._id} className={styles.commentReply}>
								<div className={styles.commentHeader}>
									<div className='flex flex-1 gap-2'>
										{/* ADMIN ICON */}
										{reply.author === adminName ? (
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
													d='M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5'
												/>
											</svg>
										) : (
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
													d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z'
												/>
											</svg>
										)}
										<span className={styles.username}>{reply.author}</span>
									</div>

									<div className='flex max-[480px]:flex-col gap-2'>
										<span className={styles.createdAt}>
											{new Date(reply.createdAt).toLocaleString()}
										</span>
										<div className=''>
											{/* ADMIN PERMISSION AT CHANGE COMMENT */}
											{isAdmin && (
												<button
													onClick={() => toggleDelete(reply._id)}
													className='flex gap-3 text-sm'
												>
													<span>Удалить комментарий</span>
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
															d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
														/>
													</svg>
												</button>
											)}
										</div>
									</div>
								</div>
								<div className={styles.commentContent}>{reply.content}</div>
								{/* ADMIN DELETE FIELD */}
								{username &&
									parent &&
									deleteField &&
									password &&
									deleteCommentID === reply._id && (
										<DeleteField
											onCommentAdded={() =>
												console.log('Комментарий успешно удален!')
											}
											name={username}
											password={password}
											parent={reply.author}
											parentID={reply._id}
										/>
									)}
							</div>
						))
					)}
				</div>
			)}
		</div>
	)
}

export default Comment
