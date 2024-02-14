import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Status } from 'src/global/enums/query.enum'

@ObjectType()
export class Offer {
	@Field(() => Int)
	id: Number

	@Field(() => Int)
	sale: number

	@Field(() => String)
	description: string

	@Field(() => String)
	about: string

	@Field(() => String)
	imagePath: string

	@Field(() => String)
	color: string

	@Field(() => String)
	backgroundColor: string

	@Field(() => Status)
	status: Status

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}
