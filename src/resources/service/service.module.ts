import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { PaginationService } from '../pagination/pagination.service'
import { ServiceResolver } from './service.resolver'
import { ServiceService } from './service.service'

@Module({
	providers: [
		ServiceResolver,
		ServiceService,
		PrismaService,
		PaginationService,
	],
})
export class ServiceModule {}
