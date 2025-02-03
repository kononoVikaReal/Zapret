import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
	login: string
	password: string
	email: string
	isAdmin: boolean
}

const userSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
		},
	},
	{ timestamps: true }
)

//If the User collection does not exist create a new one.
export default mongoose.models.User || mongoose.model('User', userSchema)
