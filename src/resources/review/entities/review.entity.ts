import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Status } from 'src/global/enums/query.enum'

@ObjectType()
export class Review {
	@Field(() => Int)
	id: number

	@Field(() => String)
	author: string

	@Field(() => String)
	authorAvatar: string

	@Field(() => Int)
	rating: number

	@Field(() => String)
	date: string

	@Field(() => String)
	review: string

	@Field(() => Status)
	status: Status

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}
