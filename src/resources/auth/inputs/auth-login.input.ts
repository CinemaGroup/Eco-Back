import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AuthLoginInput {
	@Field(() => String)
	readonly loginOrEmail: string

	@Field(() => String)
	readonly password: string
}
