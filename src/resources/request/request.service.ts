import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Sort } from 'src/global/enums/query.enum'
import { PrismaService } from 'src/prisma/prisma.service'
import { PaginationService } from '../pagination/pagination.service'
import { RequestInput } from './inputs/request.input'
import { QueryRequestInput } from './inputs/request-query.input'

@Injectable()
export class RequestService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(input: QueryRequestInput) {
		const { perPage, skip } = this.paginationService.getPagination(input)

		const filters = input.searchTerm
			? this.getSearchTermFilter(input.searchTerm)
			: {}

		const requests = await this.prisma.request.findMany({
			where: filters,
			orderBy: this.getAllSortOption(input.sort),
			skip,
			take: perPage,
		})

		return requests
	}

	async send(input: RequestInput) {
		return this.prisma.request.create({
			data: {
				name: input.name,
				phone: input.phone,
				type: input.type,
			},
		})
	}

	private getAllSortOption(
		sort: Sort
	): Prisma.RequestOrderByWithRelationInput[] {
		switch (sort) {
			case Sort.NEWEST:
				return [{ createdAt: 'desc' }]
			case Sort.OLDEST:
				return [{ createdAt: 'asc' }]
			default:
				return [{ createdAt: 'desc' }]
		}
	}

	private getSearchTermFilter(searchTerm: string): Prisma.RequestWhereInput {
		return {
			name: {
				contains: searchTerm,
				mode: 'insensitive',
			},
		}
	}

	// Admin Place

	async byId(id: number) {
		const request = await this.prisma.request.findUnique({
			where: {
				id,
			},
		})

		if (!request) throw new NotFoundException('Запрос не найден.')

		return request
	}

	async update(id: number, input: RequestInput) {
		return this.prisma.request.update({
			where: {
				id,
			},
			data: {
				name: input.name,
				phone: input.phone,
				type: input.type,
			},
		})
	}

	async delete(id: number) {
		return this.prisma.request.delete({
			where: {
				id,
			},
		})
	}
}
