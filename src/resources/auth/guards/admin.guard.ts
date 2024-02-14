import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from 'src/resources/user/entities/user.entity'
import { UserRole } from 'src/resources/user/enum/user-role.enum'

export class OnlyAdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const ctx = GqlExecutionContext.create(context)
		const user = ctx.getContext().req.user as User
		if (user.role !== UserRole.ADMIN)
			throw new ForbiddenException('У вас нет прав')

		return true
	}
}
