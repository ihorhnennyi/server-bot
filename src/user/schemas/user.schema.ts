import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class User extends Document {
	@Prop({ required: true, unique: true }) telegramId: number
	@Prop() username?: string
	@Prop() firstName?: string
	@Prop() lastName?: string
	@Prop({ default: 'user' }) role: 'user' | 'owner'
	@Prop({ default: true }) isActive: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)
