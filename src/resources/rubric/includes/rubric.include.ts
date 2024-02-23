import { Prisma } from '@prisma/client'

export const rubricInclude: Prisma.RubricInclude = {
	categories: true,
}

export const rubricCatalogInclude: Prisma.RubricInclude = {
	categories: {
		orderBy: {
			createdAt: 'asc',
		},
		include: {
			groups: {
				include: {
					services: true,
				},
			},
		},
	},
}
