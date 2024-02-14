import { Prisma } from '@prisma/client'

export const orderInclude: Prisma.OrderInclude = {
	items: {
		include: {
			service: true,
		},
	},
}
