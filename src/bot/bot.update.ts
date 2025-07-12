import { Inject } from '@nestjs/common'
import { Command, Ctx, Start, Update } from 'nestjs-telegraf'
import { Context } from 'telegraf'
import { SSHService } from '../ssh/ssh.service'

@Update()
export class BotUpdate {
	constructor(
		@Inject(SSHService)
		private readonly sshService: SSHService
	) {}

	@Start()
	async onStart(@Ctx() ctx: Context) {
		await ctx.reply('Привет! Я бот для управления серверами 💻')
	}

	@Command('status')
	async onStatus(@Ctx() ctx: Context) {
		await ctx.reply('🔄 Получаю статус сервера...')
		try {
			const output = await this.sshService.executeCommand('uptime')
			await ctx.reply(`📡 *Статус сервера:*\n\`\`\`\n${output}\n\`\`\``, {
				parse_mode: 'Markdown',
			})
		} catch (error: any) {
			await ctx.reply(`❌ Ошибка:\n\`\`\`\n${error.message ?? error}\n\`\`\``, {
				parse_mode: 'Markdown',
			})
		}
	}

	@Command('reboot')
	async onReboot(@Ctx() ctx: Context) {
		await ctx.reply('♻️ Перезагружаю сервер...')
		try {
			const output = await this.sshService.executeCommand('sudo reboot')
			await ctx.reply(
				`✅ Сервер будет перезагружен.\n\`\`\`\n${output}\n\`\`\``,
				{
					parse_mode: 'Markdown',
				}
			)
		} catch (error) {
			await ctx.reply(
				`❌ Ошибка при перезагрузке:\n\`\`\`\n${error.message ?? error}\n\`\`\``,
				{
					parse_mode: 'Markdown',
				}
			)
		}
	}
}
