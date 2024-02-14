import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { PaginationService } from '../pagination/pagination.service'
import { GroupResolver } from './group.resolver'
import { GroupService } from './group.service'

@Module({
	providers: [GroupResolver, GroupService, PrismaService, PaginationService],
})
export class GroupModule {}
