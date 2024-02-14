import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { PaginationService } from '../pagination/pagination.service'
import { OrderResolver } from './order.resolver'
import { OrderService } from './order.service'

@Module({
	providers: [OrderResolver, OrderService, PrismaService, PaginationService],
})
export class OrderModule {}
