import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class UpdateCategoryRubricInput {
	@Field(() => Int)
	readonly id: number

	@Field(() => String)
	readonly name: string
}

@InputType()
export class UpdateCategoryInput {
	@Field(() => String)
	readonly name: string

	@Field(() => String)
	readonly imagePath: string

	@Field(() => String)
	readonly backgroundColor: string

	@Field(() => Int)
	readonly priceFrom: number

	@Field(() => [UpdateCategoryRubricInput])
	readonly rubrics: UpdateCategoryRubricInput[]
}
