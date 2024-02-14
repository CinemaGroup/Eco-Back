import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { PaginationService } from '../pagination/pagination.service'
import { AdvantageResolver } from './advantage.resolver'
import { AdvantageService } from './advantage.service'

@Module({
	providers: [
		AdvantageResolver,
		AdvantageService,
		PrismaService,
		PaginationService,
	],
})
export class AdvantageModule {}
