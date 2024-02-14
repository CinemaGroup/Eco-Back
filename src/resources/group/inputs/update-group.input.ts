import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class UpdateGroupCategoryInput {
	@Field(() => Int)
	readonly id: number

	@Field(() => String)
	readonly name: string
}

@InputType()
export class UpdateGroupInput {
	@Field(() => String)
	readonly name: string

	@Field(() => String)
	readonly imagePath: string

	@Field(() => [UpdateGroupCategoryInput])
	readonly categories: UpdateGroupCategoryInput[]
}
