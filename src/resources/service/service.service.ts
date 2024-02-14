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
import { serviceInclude } from './includes/service.include'
import { UpdateServiceInput } from './inputs/update-service.input'

@Injectable()
export class ServiceService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(input: QueryInput) {
		const { perPage, skip } = this.paginationService.getPagination(input)

		const filters = this.createFilter(input)

		return this.prisma.service.findMany({
			where: filters,
			orderBy: this.getAllSortOption(input.sort),
			skip,
			take: perPage,
			include: serviceInclude,
		})
	}

	private createFilter(input: QueryInput): Prisma.ServiceWhereInput {
		const filters: Prisma.ServiceWhereInput[] = []

		if (input.searchTerm)
			filters.push(this.getSearchTermFilter(input.searchTerm))

		if (input.status) filters.push(this.getPublishedFilter(input.status))

		return filters.length ? { AND: filters } : {}
	}

	private getAllSortOption(
		sort: Sort
	): Prisma.ServiceOrderByWithRelationInput[] {
		switch (sort) {
			case Sort.NEWEST:
				return [{ createdAt: 'desc' }]
			case Sort.OLDEST:
				return [{ createdAt: 'asc' }]
		}
	}

	private getPublishedFilter(status: Status): Prisma.ServiceWhereInput {
		return {
			status,
		}
	}

	private getSearchTermFilter(searchTerm: string): Prisma.ServiceWhereInput {
		return {
			name: {
				contains: searchTerm,
				mode: 'insensitive',
			},
		}
	}

	// Admin Place
	async byId(id: number) {
		const service = await this.prisma.service.findUnique({
			where: {
				id,
			},
			include: serviceInclude,
		})

		if (!service) throw new NotFoundException('Услуга не найдена.')

		return service
	}

	async togglePublished(id: number) {
		const service = await this.byId(id)

		return this.prisma.service.update({
			where: {
				id,
			},
			data: {
				status:
					service.status === Status.PUBLISHED
						? Status.HIDDEN
						: Status.PUBLISHED,
			},
		})
	}

	async create() {
		const isExists = await this.prisma.service.findUnique({
			where: {
				slug: '',
			},
		})

		if (isExists) throw new BadRequestException('Услуга уже существует.')

		return this.prisma.service.create({
			data: {
				name: '',
				slug: '',
				term: '',
				description: '',
				price: 0,
				imagePath: '',
			},
			select: {
				id: true,
			},
		})
	}

	async update(id: number, input: UpdateServiceInput) {
		const service = await this.byId(id)

		const isExists = await this.prisma.service.findUnique({
			where: {
				slug: generateSlug(input.name),
				NOT: {
					slug: service.slug,
				},
			},
		})

		if (isExists) throw new BadRequestException('Услуга уже существует.')

		return this.prisma.service.update({
			where: {
				id,
			},
			data: {
				name: input.name,
				slug: generateSlug(input.name),
				term: input.term,
				description: input.description,
				price: input.price,
				imagePath: input.imagePath,
				groups: {
					connect: input.groups.map((item) => ({ id: item.id })),
				},
				status: Status.PUBLISHED,
			},
		})
	}

	async delete(id: number) {
		return this.prisma.service.delete({
			where: {
				id,
			},
		})
	}
}
