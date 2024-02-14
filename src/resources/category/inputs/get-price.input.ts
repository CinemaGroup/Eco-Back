import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class GetCategoryPriceInput {
	@Field(() => Int)
	readonly quantity: number

	@Field(() => String)
	readonly slug: string
}
