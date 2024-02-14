import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Status } from 'src/global/enums/query.enum'
import { Group } from 'src/resources/group/entities/group.entity'
import { OrderItem } from 'src/resources/order/entities/order-item.entity'

@ObjectType()
export class Service {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string

	@Field(() => String)
	term: string

	@Field(() => String)
	description: string

	@Field(() => Int)
	price: number

	@Field(() => String)
	imagePath: string

	@Field(() => [Group])
	groups: Group[]

	@Field(() => [OrderItem])
	orderItems: OrderItem[]

	@Field(() => Status)
	status: Status

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}
