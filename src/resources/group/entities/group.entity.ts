import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Status } from 'src/global/enums/query.enum'
import { Category } from 'src/resources/category/entities/category.entity'
import { Service } from 'src/resources/service/entities/service.entity'

@ObjectType()
export class Group {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string

	@Field(() => String)
	imagePath: string

	@Field(() => [Service])
	services: Service[]

	@Field(() => [Category])
	categories: Category[]

	@Field(() => Status)
	status: Status

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}
