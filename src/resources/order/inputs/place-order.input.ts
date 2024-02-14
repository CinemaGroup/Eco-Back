import { Field, InputType, Int } from '@nestjs/graphql'
import { OrderStatus } from '../enums/order-status.enum'
import { PaymentMethod } from '../enums/payment-method.enum'
import { PlaceOrderItemInput } from './place-order-item.input'

@InputType()
export class PlaceOrderInput {
	@Field(() => OrderStatus)
	readonly orderStatus: OrderStatus

	@Field(() => String)
	readonly name: string

	@Field(() => String)
	readonly phone: string

	@Field(() => Int)
	readonly total: number

	@Field(() => [PlaceOrderItemInput])
	readonly items: PlaceOrderItemInput[]
}
