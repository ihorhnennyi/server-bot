import { Inject } from '@nestjs/common'
import { Command, Ctx, Start, Update } from 'nestjs-telegraf'
import { Context } from 'telegraf'
import { SSHService } from '../ssh/ssh.service'
import { isFreshMessage } from './helpers/is-fresh-message'

@Update()
export class BotUpdate {
	constructor(
		@Inject(SSHService)
		private readonly sshService: SSHService
	) {}

	@Start()
	async onStart(@Ctx() ctx: Context) {
		if (!isFreshMessage(ctx)) return
		await ctx.reply('Привет! Я бот для управления серверами 💻')
	}

	@Command('status')
	async onStatus(@Ctx() ctx: Context) {
		if (!isFreshMessage(ctx)) return
		await ctx.reply('🔄 Получаю статус сервера...')

		try {
			const output = await this.sshService.executeCommand('uptime')
			await ctx.reply(`📡 *Статус сервера:*\n\`\`\`\n${output}\n\`\`\``, {
				parse_mode: 'Markdown',
			})
		} catch (error: any) {
			await this.replyWithError(ctx, 'Ошибка при получении статуса', error)
		}
	}

	@Command('reboot')
	async onReboot(@Ctx() ctx: Context) {
		if (!isFreshMessage(ctx)) return
		await ctx.reply('♻️ Перезагружаю сервер...')

		try {
			const output = await this.sshService.executeCommand('sudo reboot')
			await ctx.reply(
				`✅ Сервер будет перезагружен.\n\`\`\`\n${output}\n\`\`\``,
				{
					parse_mode: 'Markdown',
				}
			)
		} catch (error: any) {
			await this.replyWithError(ctx, 'Ошибка при перезагрузке', error)
		}
	}

	@Command('shutdown')
	async onShutdown(@Ctx() ctx: Context) {
		if (!isFreshMessage(ctx)) return
		await ctx.reply('⏹️ Выключаю сервер...')

		try {
			const output = await this.sshService.executeCommand('sudo shutdown now')
			await ctx.reply(`🔌 Сервер будет выключен.\n\`\`\`\n${output}\n\`\`\``, {
				parse_mode: 'Markdown',
			})
		} catch (error: any) {
			await this.replyWithError(ctx, 'Ошибка при выключении', error)
		}
	}

	private async replyWithError(ctx: Context, message: string, error: any) {
		await ctx.reply(
			`❌ ${message}:\n\`\`\`\n${error?.message ?? error}\n\`\`\``,
			{
				parse_mode: 'Markdown',
			}
		)
	}
}
