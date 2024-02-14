import { Field, InputType } from '@nestjs/graphql'
import { RequestType } from '@prisma/client'

@InputType()
export class RequestInput {
	@Field(() => String)
	readonly name: string

	@Field(() => String, { nullable: true })
	readonly phone?: string

	@Field(() => String)
	readonly type: RequestType
}
