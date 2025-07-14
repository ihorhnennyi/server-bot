import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schemas/user.schema'

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async findOrCreate(telegramUser: any): Promise<User> {
		const { id, username, first_name, last_name } = telegramUser

		let user = await this.userModel.findOne({ telegramId: id })
		if (!user) {
			user = await this.userModel.create({
				telegramId: id,
				username,
				firstName: first_name,
				lastName: last_name,
				role: 'owner', // 👑
			})
			console.log('👤 Новый пользователь создан:', user)
		}
		return user
	}

	async isAllowed(telegramId: number): Promise<boolean> {
		const user = await this.userModel.findOne({ telegramId, isActive: true })
		return !!user
	}
}
