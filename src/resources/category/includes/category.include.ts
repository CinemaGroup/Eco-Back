import { Prisma } from '@prisma/client'

export const categoryInclude: Prisma.CategoryInclude = {
	rubrics: true,
}

export const categoryCatalogInclude: Prisma.CategoryInclude = {
	groups: {
		include: {
			categories: {
				include: {
					groups: {
						include: {
							services: true,
						},
					},
				},
			},
		},
	},
	rubrics: true,
}
