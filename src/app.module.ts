import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BotModule } from './bot/bot.module'
import { DatabaseModule } from './db/database.module'

@Module({
	imports: [ConfigModule.forRoot(), DatabaseModule, BotModule],
})
export class AppModule {}
