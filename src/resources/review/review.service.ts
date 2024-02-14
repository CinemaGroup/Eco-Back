import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Sort, Status } from 'src/global/enums/query.enum'
import { QueryInput } from 'src/global/inputs/query.input'
import { PrismaService } from 'src/prisma/prisma.service'
import { getDate } from 'src/utils/get-date'
import { PaginationService } from '../pagination/pagination.service'
import { UpdateReviewInput } from './inputs/update-review.input'

@Injectable()
export class ReviewService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(input: QueryInput) {
		const { perPage, skip } = this.paginationService.getPagination(input)

		const filters = this.createFilter(input)

		return this.prisma.review.findMany({
			where: filters,
			orderBy: this.getAllSortOption(input.sort),
			skip,
			take: perPage,
		})
	}

	private createFilter(input: QueryInput): Prisma.ReviewWhereInput {
		const filters: Prisma.ReviewWhereInput[] = []

		if (input.searchTerm)
			filters.push(this.getSearchTermFilter(input.searchTerm))

		if (input.status) filters.push(this.getPublishedFilter(input.status))

		return filters.length ? { AND: filters } : {}
	}

	private getAllSortOption(
		sort: Sort
	): Prisma.ReviewOrderByWithRelationInput[] {
		switch (sort) {
			case Sort.NEWEST:
				return [{ createdAt: 'desc' }]
			case Sort.OLDEST:
				return [{ createdAt: 'asc' }]
		}
	}

	private getPublishedFilter(status: Status): Prisma.ReviewWhereInput {
		return {
			status,
		}
	}

	private getSearchTermFilter(searchTerm: string): Prisma.ReviewWhereInput {
		return {
			author: {
				contains: searchTerm,
				mode: 'insensitive',
			},
		}
	}

	// Admin Place
	async byId(id: number) {
		const review = await this.prisma.review.findUnique({
			where: {
				id,
			},
		})

		if (!review) throw new NotFoundException('Отзыв не найден.')

		return review
	}

	async togglePublished(id: number) {
		const review = await this.byId(id)

		return this.prisma.review.update({
			where: {
				id,
			},
			data: {
				status:
					review.status === Status.PUBLISHED ? Status.HIDDEN : Status.PUBLISHED,
			},
		})
	}

	async create() {
		const isExists = await this.prisma.review.findFirst({
			where: {
				author: '',
			},
		})

		if (isExists) throw new BadRequestException('Отзыв уже существует.')

		return this.prisma.review.create({
			data: {
				author: '',
				authorAvatar: '',
				rating: 5,
				date: getDate(),
				review: '',
			},
			select: {
				id: true,
			},
		})
	}

	async update(id: number, input: UpdateReviewInput) {
		return this.prisma.review.update({
			where: {
				id,
			},
			data: {
				author: input.author,
				authorAvatar: input.authorAvatar,
				rating: input.rating,
				review: input.review,
				date: input.date,
				status: Status.PUBLISHED,
			},
		})
	}

	async delete(id: number) {
		return this.prisma.review.delete({
			where: {
				id,
			},
		})
	}
}
