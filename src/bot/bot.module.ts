import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf'
import { SSHModule } from '../ssh/ssh.module'
import { UserModule } from '../user/user.module'
import { BotUpdate } from './bot.update'

@Module({
	imports: [
		ConfigModule.forRoot(),
		SSHModule,
		UserModule,
		TelegrafModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (
				configService: ConfigService
			): Promise<{ token: string }> => {
				return {
					token: configService.get<string>('BOT_TOKEN')!,
				}
			},
			inject: [ConfigService],
		}),
	],
	providers: [BotUpdate],
})
export class BotModule {}
