import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Status } from 'src/global/enums/query.enum'

@ObjectType()
export class Advantage {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string

	@Field(() => String)
	description: string

	@Field(() => String)
	imagePath: string

	@Field(() => Status)
	status: Status

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}
