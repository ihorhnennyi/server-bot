import { config } from 'dotenv'
import * as fs from 'fs'
config()

export const MAIN_SERVER = {
	host: process.env.MAIN_SERVER_HOST!,
	port: Number(process.env.MAIN_SERVER_PORT || 22),
	username: process.env.MAIN_SERVER_USER!,
	privateKey: fs.readFileSync(
		process.env.MAIN_SERVER_PRIVATE_KEY_PATH!,
		'utf8'
	),
}
