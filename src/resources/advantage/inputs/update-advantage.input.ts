import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateAdvantageInput {
	@Field(() => String)
	readonly name: string

	@Field(() => String)
	readonly description: string

	@Field(() => String)
	readonly imagePath: string
}
