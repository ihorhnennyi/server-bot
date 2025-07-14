import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGODB_URI'),
				connectionFactory: connection => {
					connection.on('connected', () => console.log('✅ MongoDB connected'))
					connection.on('error', err => {
						console.error('❌ MongoDB connection error:', err)
					})
					connection.on('disconnected', () =>
						console.error('⚠️ MongoDB disconnected')
					)
					return connection
				},
			}),
			inject: [ConfigService],
		}),
	],
})
export class DatabaseModule {}
