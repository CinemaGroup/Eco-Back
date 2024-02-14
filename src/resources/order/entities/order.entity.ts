import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from 'src/resources/user/entities/user.entity'
import { OrderStatus } from '../enums/order-status.enum'
import { PaymentMethod } from '../enums/payment-method.enum'
import { OrderItem } from './order-item.entity'

@ObjectType()
export class Order {
	@Field(() => Int)
	id: number

	@Field(() => OrderStatus)
	orderStatus: OrderStatus

	@Field(() => Int)
	total: number

	@Field(() => String)
	name: string

	@Field(() => String)
	phone: string

	@Field(() => [OrderItem])
	items: OrderItem[]

	@Field(() => User)
	user: User

	@Field(() => Int)
	userId: number

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}
