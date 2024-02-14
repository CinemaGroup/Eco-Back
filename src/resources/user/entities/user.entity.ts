import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserRole } from '../enum/user-role.enum'

@ObjectType()
export class User {
	@Field(() => Int)
	id: number

	@Field(() => String)
	login: string

	@Field(() => String)
	email: string

	@Field(() => String)
	password: string

	@Field(() => String)
	avatarPath: string

	@Field(() => UserRole)
	role: UserRole

	@Field(() => Date)
	updatedAt: Date

	@Field(() => Date)
	createdAt: Date
}
