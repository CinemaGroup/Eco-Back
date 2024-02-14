import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Order } from './order.entity'
import { Service } from 'src/resources/service/entities/service.entity'

@ObjectType()
export class OrderItem {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	quantity: number

	@Field(() => Order)
	order: Order

	@Field(() => Service)
	service: Service

	@Field(() => Int)
	orderId: number

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}
