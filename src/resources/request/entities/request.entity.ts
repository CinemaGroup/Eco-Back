import { Field, Int, ObjectType } from '@nestjs/graphql'
import { RequestType } from '../enum/request-type.enum'

@ObjectType()
export class Request {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	phone: string

	@Field(() => RequestType)
	type: RequestType

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}
