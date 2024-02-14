import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class UpdateOfferInput {
	@Field(() => Int)
	readonly sale: number

	@Field(() => String)
	readonly description: string

	@Field(() => String)
	readonly about: string

	@Field(() => String)
	readonly imagePath: string

	@Field(() => String)
	readonly color: string

	@Field(() => String)
	readonly backgroundColor: string
}
