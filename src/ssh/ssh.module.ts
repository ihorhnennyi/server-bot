import { Module } from '@nestjs/common'
import { SSHService } from './ssh.service'

@Module({
	providers: [SSHService],
	exports: [SSHService],
})
export class SSHModule {}
