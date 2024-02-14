import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Status } from 'src/global/enums/query.enum'
import { Group } from 'src/resources/group/entities/group.entity'
import { Rubric } from 'src/resources/rubric/entities/rubric.entity'

@ObjectType()
export class Category {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string

	@Field(() => String)
	imagePath: string

	@Field(() => String)
	backgroundColor: string

	@Field(() => Int)
	priceFrom: number

	@Field(() => [Group])
	groups: Group[]

	@Field(() => [Rubric])
	rubrics: Rubric[]

	@Field(() => Status)
	status: Status

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}
