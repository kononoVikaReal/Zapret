export interface CommentProps {
	_id: string
	author: string
	createdAt: string
	content: string
	replyCount?: number
	parent?: string | null
	parentID?: string | null
	replies?: CommentProps[] // Для хранения ответов на комментарий
	isAuth: boolean
	username?: string
	onCommentAdded: () => void
	isAdmin: boolean
	password?: string
}
