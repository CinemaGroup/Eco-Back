import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Sort, Status } from 'src/global/enums/query.enum'
import { QueryInput } from 'src/global/inputs/query.input'
import { PrismaService } from 'src/prisma/prisma.service'
import { PaginationService } from '../pagination/pagination.service'
import { UpdateOfferInput } from './inputs/update-offer.input'

@Injectable()
export class OfferService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(input: QueryInput) {
		const { perPage, skip } = this.paginationService.getPagination(input)

		const filters = this.createFilter(input)

		return this.prisma.offer.findMany({
			where: filters,
			orderBy: this.getAllSortOption(input.sort),
			skip,
			take: perPage,
		})
	}

	private createFilter(input: QueryInput): Prisma.OfferWhereInput {
		const filters: Prisma.OfferWhereInput[] = []

		if (input.searchTerm)
			filters.push(this.getSearchTermFilter(input.searchTerm))

		if (input.status) filters.push(this.getPublishedFilter(input.status))

		return filters.length ? { AND: filters } : {}
	}

	private getAllSortOption(sort: Sort): Prisma.OfferOrderByWithRelationInput[] {
		switch (sort) {
			case Sort.NEWEST:
				return [{ createdAt: 'desc' }]
			case Sort.OLDEST:
				return [{ createdAt: 'asc' }]
		}
	}

	private getPublishedFilter(status: Status): Prisma.OfferWhereInput {
		return {
			status,
		}
	}

	private getSearchTermFilter(searchTerm: string): Prisma.OfferWhereInput {
		return {
			sale: {
				equals: +searchTerm,
			},
		}
	}

	// Admin Place
	async byId(id: number) {
		const offer = await this.prisma.offer.findUnique({
			where: {
				id,
			},
		})

		if (!offer) throw new NotFoundException('Спец. Предложение не найдено.')

		return offer
	}

	async togglePublished(id: number) {
		const offer = await this.byId(id)

		return this.prisma.offer.update({
			where: {
				id,
			},
			data: {
				status:
					offer.status === Status.PUBLISHED ? Status.HIDDEN : Status.PUBLISHED,
			},
		})
	}

	async create() {
		const isExists = await this.prisma.offer.findFirst({
			where: {
				sale: 0,
			},
		})

		if (isExists)
			throw new BadRequestException('Спец. Предложение уже существует.')

		return this.prisma.offer.create({
			data: {
				sale: 0,
				description: '',
				about: '',
				imagePath: '',
				color: '',
				backgroundColor: '',
			},
			select: {
				id: true,
			},
		})
	}

	async update(id: number, input: UpdateOfferInput) {
		return this.prisma.offer.update({
			where: {
				id,
			},
			data: {
				sale: input.sale,
				about: input.about,
				description: input.description,
				color: input.color,
				backgroundColor: input.backgroundColor,
				imagePath: input.imagePath,
				status: Status.PUBLISHED,
			},
		})
	}

	async delete(id: number) {
		return this.prisma.offer.delete({
			where: {
				id,
			},
		})
	}
}
