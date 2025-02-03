import mongoose, { Document, ObjectId, Schema, Types } from 'mongoose'

export interface IComment extends Document {
	author: string // автор комментария
	content: string // содержание комментария
	parent: ObjectId // ссылка на родительский комментарий, если этот комментарий является ответом
	replyCount: number // количество ответов на комментарий
}

const commentSchema = new Schema(
	{
		author: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		parent: {
			type: Types.ObjectId,
			ref: 'Comment', // Ссылка на родительский комментарий, если это ответ
			default: null,
		},
		replyCount: {
			type: Number,
			default: 0, // Начальное количество ответов
		},
	},
	{ timestamps: true }
)

export default mongoose.models.Comment ||
	mongoose.model('Comment', commentSchema)
