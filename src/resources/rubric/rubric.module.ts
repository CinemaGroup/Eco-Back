import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { PaginationService } from '../pagination/pagination.service'
import { RubricResolver } from './rubric.resolver'
import { RubricService } from './rubric.service'

@Module({
	providers: [RubricResolver, RubricService, PrismaService, PaginationService],
})
export class RubricModule {}
