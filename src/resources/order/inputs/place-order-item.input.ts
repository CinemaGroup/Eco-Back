import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class PlaceOrderItemInput {
	@Field(() => Int)
	quantity: number

	@Field(() => Int)
	serviceId: number
}
