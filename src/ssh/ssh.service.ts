import { Injectable } from '@nestjs/common'
import { Client } from 'ssh2'
import { MAIN_SERVER } from './ssh.config'

@Injectable()
export class SSHService {
	executeCommand(command: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const conn = new Client()

			conn
				.on('ready', () => {
					conn.exec(command, (err, stream) => {
						if (err) return reject(err)

						let output = ''
						stream
							.on('close', () => {
								conn.end()
								resolve(output)
							})
							.on('data', data => {
								output += data.toString()
							})
							.stderr.on('data', data => {
								output += data.toString()
							})
					})
				})
				.on('error', reject)
				.connect(MAIN_SERVER)
		})
	}
}
