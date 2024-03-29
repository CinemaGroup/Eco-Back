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
import { rubricCatalogInclude, rubricInclude } from './includes/rubric.include'
import { UpdateRubricInput } from './inputs/update-rubric.input'

@Injectable()
export class RubricService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(input: QueryInput, type: 'catalog' | 'default' = 'default') {
		const { perPage, skip } = this.paginationService.getPagination(input)

		const filters = this.createFilter(input)

		return this.prisma.rubric.findMany({
			where: filters,
			orderBy: this.getAllSortOption(input.sort),
			skip,
			take: perPage,
			include: type === 'catalog' ? rubricCatalogInclude: rubricInclude,
		})
	}

	private createFilter(input: QueryInput): Prisma.RubricWhereInput {
		const filters: Prisma.RubricWhereInput[] = []

		if (input.searchTerm)
			filters.push(this.getSearchTermFilter(input.searchTerm))

		if (input.status) filters.push(this.getPublishedFilter(input.status))

		return filters.length ? { AND: filters } : {}
	}

	private getAllSortOption(
		sort: Sort
	): Prisma.RubricOrderByWithRelationInput[] {
		switch (sort) {
			case Sort.NEWEST:
				return [{ createdAt: 'desc' }]
			case Sort.OLDEST:
				return [{ createdAt: 'asc' }]
		}
	}

	private getPublishedFilter(status: Status): Prisma.RubricWhereInput {
		return {
			status,
		}
	}

	private getSearchTermFilter(searchTerm: string): Prisma.RubricWhereInput {
		return {
			name: {
				contains: searchTerm,
				mode: 'insensitive',
			},
		}
	}

	// Admin Place
	async byId(id: number) {
		const rubric = await this.prisma.rubric.findUnique({
			where: {
				id,
			},
			include: rubricInclude,
		})

		if (!rubric) throw new NotFoundException('Рубрика не найдена.')

		return rubric
	}

	async togglePublished(id: number) {
		const rubric = await this.byId(id)

		return this.prisma.rubric.update({
			where: {
				id,
			},
			data: {
				status:
					rubric.status === Status.PUBLISHED ? Status.HIDDEN : Status.PUBLISHED,
			},
		})
	}

	async create() {
		const isExists = await this.prisma.rubric.findUnique({
			where: {
				slug: '',
			},
		})

		if (isExists) throw new BadRequestException('Рубрика уже существует.')

		return this.prisma.rubric.create({
			data: {
				name: '',
				slug: '',
				imagePath: '',
			},
			select: {
				id: true,
			},
		})
	}

	async update(id: number, input: UpdateRubricInput) {
		const rubric = await this.byId(id)

		const isExists = await this.prisma.rubric.findUnique({
			where: {
				slug: generateSlug(input.name),
				NOT: {
					slug: rubric.slug,
				},
			},
		})

		if (isExists) throw new BadRequestException('Рубрика уже существует.')

		return this.prisma.rubric.update({
			where: {
				id,
			},
			data: {
				name: input.name,
				slug: generateSlug(input.name),
				imagePath: input.imagePath,
				status: Status.PUBLISHED,
			},
		})
	}

	async delete(id: number) {
		return this.prisma.rubric.delete({
			where: {
				id,
			},
		})
	}
}
