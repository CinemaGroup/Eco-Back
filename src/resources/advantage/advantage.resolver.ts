import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { QueryInput } from 'src/global/inputs/query.input'
import { Auth } from '../auth/decorators/auth.decorator'
import { UserRole } from '../user/enum/user-role.enum'
import { AdvantageService } from './advantage.service'
import { Advantage } from './entities/advantage.entity'
import { UpdateAdvantageInput } from './inputs/update-advantage.input'

@Resolver()
export class AdvantageResolver {
	constructor(private readonly advantageService: AdvantageService) {}

	@Query(() => [Advantage], { name: 'advantages' })
	async getAll(@Args('query') input: QueryInput) {
		return this.advantageService.getAll(input)
	}

	// Admin Place

	@Auth(UserRole.ADMIN)
	@Query(() => Advantage, { name: 'advantageById' })
	async getById(@Args('id', { type: () => Int }) id: number) {
		return this.advantageService.byId(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Advantage, { name: 'toggleAdvantage' })
	async togglePublished(@Args('id', { type: () => Int }) id: number) {
		return this.advantageService.togglePublished(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Advantage, { name: 'createAdvantage' })
	async create() {
		return this.advantageService.create()
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Advantage, { name: 'updateAdvantage' })
	async update(
		@Args('id', { type: () => Int }) id: number,
		@Args('data') input: UpdateAdvantageInput
	) {
		return this.advantageService.update(+id, input)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Advantage, { name: 'deleteAdvantage' })
	async delete(@Args('id', { type: () => Int }) id: number) {
		return this.advantageService.delete(id)
	}
}
