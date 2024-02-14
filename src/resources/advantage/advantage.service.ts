import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Sort, Status } from 'src/global/enums/query.enum'
import { QueryInput } from 'src/global/inputs/query.input'
import { PrismaService } from 'src/prisma/prisma.service'
import { generateSlug } from 'src/utils/generateSlug'
import { PaginationService } from '../pagination/pagination.service'
import { UpdateAdvantageInput } from './inputs/update-advantage.input'

@Injectable()
export class AdvantageService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(input: QueryInput) {
		const { perPage, skip } = this.paginationService.getPagination(input)

		const filters = this.createFilter(input)

		return this.prisma.advantage.findMany({
			where: filters,
			orderBy: this.getAllSortOption(input.sort),
			skip,
			take: perPage,
		})
	}

	private createFilter(input: QueryInput): Prisma.AdvantageWhereInput {
		const filters: Prisma.AdvantageWhereInput[] = []

		if (input.searchTerm)
			filters.push(this.getSearchTermFilter(input.searchTerm))

		if (input.status) filters.push(this.getPublishedFilter(input.status))

		return filters.length ? { AND: filters } : {}
	}

	private getAllSortOption(
		sort: Sort
	): Prisma.AdvantageOrderByWithRelationInput[] {
		switch (sort) {
			case Sort.NEWEST:
				return [{ createdAt: 'desc' }]
			case Sort.OLDEST:
				return [{ createdAt: 'asc' }]
		}
	}

	private getPublishedFilter(status: Status): Prisma.AdvantageWhereInput {
		return {
			status,
		}
	}

	private getSearchTermFilter(searchTerm: string): Prisma.AdvantageWhereInput {
		return {
			name: {
				contains: searchTerm,
				mode: 'insensitive',
			},
		}
	}

	// Admin Place
	async byId(id: number) {
		const advantage = await this.prisma.advantage.findUnique({
			where: {
				id,
			},
		})

		if (!advantage) throw new NotFoundException('Преимущество не найдено.')

		return advantage
	}

	async togglePublished(id: number) {
		const advantage = await this.byId(id)

		return this.prisma.advantage.update({
			where: {
				id,
			},
			data: {
				status:
					advantage.status === Status.PUBLISHED
						? Status.HIDDEN
						: Status.PUBLISHED,
			},
		})
	}

	async create() {
		const isExists = await this.prisma.advantage.findUnique({
			where: {
				slug: '',
			},
		})

		if (isExists) throw new BadRequestException('Преимущество уже существует.')

		return this.prisma.advantage.create({
			data: {
				name: '',
				slug: '',
				description: '',
				imagePath: '',
			},
			select: {
				id: true,
			},
		})
	}

	async update(id: number, input: UpdateAdvantageInput) {
		const advantage = await this.byId(id)

		const isExists = await this.prisma.advantage.findUnique({
			where: {
				slug: generateSlug(input.name),
				NOT: {
					slug: advantage.slug
				}
			},
		})

		if (isExists) throw new BadRequestException('Преимущество уже существует.')

		return this.prisma.advantage.update({
			where: {
				id,
			},
			data: {
				name: input.name,
				slug: generateSlug(input.name),
				description: input.description,
				imagePath: input.imagePath,
				status: Status.PUBLISHED,
			},
		})
	}

	async delete(id: number) {
		return this.prisma.advantage.delete({
			where: {
				id,
			},
		})
	}
}
