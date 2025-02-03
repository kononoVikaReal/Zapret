export interface CommentFieldProps {
	username: string
	parent?: string | null
	parentID?: string | null
	onCommentAdded: () => void
}
