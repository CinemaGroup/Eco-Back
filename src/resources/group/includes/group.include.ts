import { Prisma } from '@prisma/client'

export const groupInclude: Prisma.GroupInclude = {
	categories: true,
	services: true,
}
