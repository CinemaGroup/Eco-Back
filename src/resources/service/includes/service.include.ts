import { Prisma } from '@prisma/client'

export const serviceInclude: Prisma.ServiceInclude = {
	groups: true,
	orderItems: true,
}
