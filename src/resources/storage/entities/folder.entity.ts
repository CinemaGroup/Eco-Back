import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Folder {
	@Field(() => String)
	name: string

	@Field(() => String)
	size: string

	@Field(() => Int)
	count: number

	@Field(() => String)
	path: string

	@Field(() => Date)
	createdAt: Date
}
