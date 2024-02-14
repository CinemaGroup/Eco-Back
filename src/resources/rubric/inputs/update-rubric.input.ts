import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateRubricInput {
	@Field(() => String)
	readonly name: string

	@Field(() => String)
	readonly imagePath: string
}
