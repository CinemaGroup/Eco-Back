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
import { groupInclude } from './includes/group.include'
import { UpdateGroupInput } from './inputs/update-group.input'
import { QueryGroupInput } from './inputs/query-group.input'

@Injectable()
export class GroupService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(input: QueryGroupInput) {
		const { perPage, skip } = this.paginationService.getPagination(input)

		const filters = this.createFilter(input)

		return this.prisma.group.findMany({
			where: filters,
			orderBy: this.getAllSortOption(input.sort),
			skip,
			take: perPage,
			include: groupInclude,
		})
	}

	private createFilter(input: QueryGroupInput): Prisma.GroupWhereInput {
		const filters: Prisma.GroupWhereInput[] = []

		if (input.searchTerm)
			filters.push(this.getSearchTermFilter(input.searchTerm))
		if(input.categorySlug) filters.push(this.getCategoryFilter(input.categorySlug))

		if (input.status) filters.push(this.getPublishedFilter(input.status))

		return filters.length ? { AND: filters } : {}
	}

	private getAllSortOption(sort: Sort): Prisma.GroupOrderByWithRelationInput[] {
		switch (sort) {
			case Sort.NEWEST:
				return [{ createdAt: 'desc' }]
			case Sort.OLDEST:
				return [{ createdAt: 'asc' }]
		}
	}

	private getPublishedFilter(status: Status): Prisma.GroupWhereInput {
		return {
			status,
		}
	}

	private getCategoryFilter(categorySlug: string): Prisma.GroupWhereInput {
		return {
			categories: {
				some: {
					slug: categorySlug
				}
			}
		}
	}

	private getSearchTermFilter(searchTerm: string): Prisma.GroupWhereInput {
		return {
			name: {
				contains: searchTerm,
				mode: 'insensitive',
			},
		}
	}

	// Admin Place
	async byId(id: number) {
		const group = await this.prisma.group.findUnique({
			where: {
				id,
			},
			include: groupInclude,
		})

		if (!group) throw new NotFoundException('Группа не найдена.')

		return group
	}

	async togglePublished(id: number) {
		const group = await this.byId(id)

		return this.prisma.group.update({
			where: {
				id,
			},
			data: {
				status:
					group.status === Status.PUBLISHED ? Status.HIDDEN : Status.PUBLISHED,
			},
		})
	}

	async create() {
		const isExists = await this.prisma.group.findUnique({
			where: {
				slug: '',
			},
		})

		if (isExists) throw new BadRequestException('Группа уже существует.')

		return this.prisma.group.create({
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

	async update(id: number, input: UpdateGroupInput) {
		const group = await this.byId(id)

		const isExists = await this.prisma.group.findUnique({
			where: {
				slug: generateSlug(input.name),
				NOT: {
					slug: group.slug,
				},
			},
		})

		if (isExists) throw new BadRequestException('Группа уже существует.')

		return this.prisma.group.update({
			where: {
				id,
			},
			data: {
				name: input.name,
				slug: generateSlug(input.name),
				imagePath: input.imagePath,
				categories: {
					connect: input.categories.map((item) => ({ id: item.id })),
				},
				status: Status.PUBLISHED,
			},
		})
	}

	async delete(id: number) {
		return this.prisma.group.delete({
			where: {
				id,
			},
		})
	}
}
