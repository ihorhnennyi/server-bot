import { Inject } from '@nestjs/common'
import { Action, Ctx, Hears, Start, Update } from 'nestjs-telegraf'
import { Context, Markup } from 'telegraf'
import { SSHService } from '../ssh/ssh.service'
import { isFreshMessage } from './helpers/is-fresh-message'

@Update()
export class BotUpdate {
	constructor(@Inject(SSHService) private readonly sshService: SSHService) {}

	@Start()
	async onStart(@Ctx() ctx: Context) {
		if (!isFreshMessage(ctx)) return

		await ctx.reply('Привет! Я бот для управления серверами 💻', {
			reply_markup: {
				keyboard: [['📋 Меню']],
				resize_keyboard: true,
				one_time_keyboard: true,
			},
		})
	}

	@Hears('📋 Меню')
	async onMenu(@Ctx() ctx: Context) {
		await ctx.reply(
			'Выберите действие:',
			Markup.inlineKeyboard([
				[Markup.button.callback('📡 Статус', 'status')],
				[
					Markup.button.callback('♻️ Перезагрузка', 'reboot'),
					Markup.button.callback('⏹️ Выключение', 'shutdown'),
				],
			])
		)
	}

	@Action('status')
	async handleStatus(@Ctx() ctx: Context) {
		await ctx.answerCbQuery()
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

	@Action('reboot')
	async handleReboot(@Ctx() ctx: Context) {
		await ctx.answerCbQuery()
		await ctx.reply('♻️ Перезагружаю сервер...')
		try {
			const output = await this.sshService.executeCommand('sudo reboot')
			await ctx.reply(
				`✅ Сервер будет перезагружен.\n\`\`\`\n${output}\n\`\`\``,
				{ parse_mode: 'Markdown' }
			)
		} catch (error: any) {
			await this.replyWithError(ctx, 'Ошибка при перезагрузке', error)
		}
	}

	@Action('shutdown')
	async handleShutdown(@Ctx() ctx: Context) {
		await ctx.answerCbQuery()
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
			{ parse_mode: 'Markdown' }
		)
	}
}
