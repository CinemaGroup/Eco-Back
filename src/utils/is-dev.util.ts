import { ConfigService } from '@nestjs/config'

export const isDev = (configService: ConfigService) => {
	return configService.get('NODE_ENV') === 'development'
}
