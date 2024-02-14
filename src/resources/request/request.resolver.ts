import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth } from '../auth/decorators/auth.decorator'
import { UserRole } from '../user/enum/user-role.enum'
import { Request } from './entities/request.entity'
import { QueryRequestInput } from './inputs/request-query.input'
import { RequestInput } from './inputs/request.input'
import { RequestService } from './request.service'

@Resolver()
export class RequestResolver {
	constructor(private readonly requestService: RequestService) {}

	@Query(() => [Request], { name: 'requests' })
	async getAll(@Args('query') input: QueryRequestInput) {
		return this.requestService.getAll(input)
	}

	@Mutation(() => Request, { name: 'sendRequests' })
	async send(@Args('data') input: RequestInput) {
		return this.requestService.send(input)
	}
	// Admin Place

	@Auth(UserRole.ADMIN)
	@Query(() => Request, { name: 'requestById' })
	async getById(@Args('id', { type: () => Int }) id: number) {
		return this.requestService.byId(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Request, { name: 'updateRequest' })
	async update(
		@Args('id', { type: () => Int }) id: number,
		@Args('data') input: RequestInput
	) {
		return this.requestService.update(+id, input)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Request, { name: 'deleteRequest' })
	async delete(@Args('id', { type: () => Int }) id: number) {
		return this.requestService.delete(id)
	}
}
