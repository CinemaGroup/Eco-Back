import { registerEnumType } from '@nestjs/graphql'

export enum Sort {
	NEWEST = 'NEWEST',
	OLDEST = 'OLDEST',
}

export enum Status {
	PUBLISHED = 'PUBLISHED',
	HIDDEN = 'HIDDEN',
}

registerEnumType(Sort, {
	name: 'Sort',
})

registerEnumType(Status, {
	name: 'Status',
})
