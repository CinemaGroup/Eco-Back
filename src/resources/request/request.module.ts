import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { PaginationService } from '../pagination/pagination.service'
import { RequestResolver } from './request.resolver'
import { RequestService } from './request.service'

@Module({
	providers: [
		RequestResolver,
		RequestService,
		PrismaService,
		PaginationService,
	],
})
export class RequestModule {}
