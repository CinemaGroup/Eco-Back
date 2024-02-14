import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class UpdateServiceGroupInput {
	@Field(() => Int)
	readonly id: number

	@Field(() => String)
	readonly name: string
}

@InputType()
export class UpdateServiceInput {
	@Field(() => String)
	readonly name: string

	@Field(() => String)
	readonly term: string

	@Field(() => String)
	readonly description: string

	@Field(() => Int)
	readonly price: number

	@Field(() => String)
	readonly imagePath: string

	@Field(() => [UpdateServiceGroupInput])
	readonly groups: UpdateServiceGroupInput[]
}
