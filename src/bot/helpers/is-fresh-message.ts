import { Context } from 'telegraf'

/**
 * Проверяет, что сообщение не устарело
 * @param ctx - контекст Telegraf
 * @param thresholdSeconds - допустимая "свежесть" сообщения, по умолчанию 5 сек
 * @returns true если сообщение свежее
 */
export function isFreshMessage(ctx: Context, thresholdSeconds = 5): boolean {
	const messageDate = ctx.message?.date
	const now = Math.floor(Date.now() / 1000)
	return messageDate ? now - messageDate < thresholdSeconds : false
}
