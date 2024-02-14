import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class UpdateReviewInput {
	@Field(() => String)
	readonly author: string

	@Field(() => String)
	readonly authorAvatar: string

	@Field(() => Int)
	readonly rating: number

	@Field(() => String)
	readonly date: string

	@Field(() => String)
	readonly review: string
}
