import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { PaginationService } from '../pagination/pagination.service'
import { OfferResolver } from './offer.resolver'
import { OfferService } from './offer.service'

@Module({
	providers: [OfferResolver, OfferService, PrismaService, PaginationService],
})
export class OfferModule {}
