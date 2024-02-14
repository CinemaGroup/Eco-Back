import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { QueryInput } from 'src/global/inputs/query.input'
import { Auth } from '../auth/decorators/auth.decorator'
import { UserRole } from '../user/enum/user-role.enum'
import { Service } from './entities/service.entity'
import { UpdateServiceInput } from './inputs/update-service.input'
import { ServiceService } from './service.service'

@Resolver()
export class ServiceResolver {
	constructor(private readonly serviceService: ServiceService) {}

	@Query(() => [Service], { name: 'services' })
	async getAll(@Args('query') input: QueryInput) {
		return this.serviceService.getAll(input)
	}

	// Admin Place

	@Auth(UserRole.ADMIN)
	@Query(() => Service, { name: 'serviceById' })
	async getById(@Args('id', { type: () => Int }) id: number) {
		return this.serviceService.byId(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Service, { name: 'toggleService' })
	async togglePublished(@Args('id', { type: () => Int }) id: number) {
		return this.serviceService.togglePublished(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Service, { name: 'createService' })
	async create() {
		return this.serviceService.create()
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Service, { name: 'updateService' })
	async update(
		@Args('id', { type: () => Int }) id: number,
		@Args('data') input: UpdateServiceInput
	) {
		return this.serviceService.update(+id, input)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Service, { name: 'deleteService' })
	async delete(@Args('id', { type: () => Int }) id: number) {
		return this.serviceService.delete(id)
	}
}
