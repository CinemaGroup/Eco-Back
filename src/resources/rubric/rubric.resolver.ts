import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { QueryInput } from 'src/global/inputs/query.input'
import { Auth } from '../auth/decorators/auth.decorator'
import { UserRole } from '../user/enum/user-role.enum'
import { Rubric } from './entities/rubric.entity'
import { UpdateRubricInput } from './inputs/update-rubric.input'
import { RubricService } from './rubric.service'

@Resolver()
export class RubricResolver {
	constructor(private readonly rubricService: RubricService) {}

	@Query(() => [Rubric], { name: 'rubrics' })
	async getAll(@Args('query') input: QueryInput, @Args('type', {type: () => String, nullable: true}) type?: 'catalog' | 'default') {
		return this.rubricService.getAll(input, type)
	}

	// Admin Place

	@Auth(UserRole.ADMIN)
	@Query(() => Rubric, { name: 'rubricById' })
	async getById(@Args('id', { type: () => Int }) id: number) {
		return this.rubricService.byId(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Rubric, { name: 'toggleRubric' })
	async togglePublished(@Args('id', { type: () => Int }) id: number) {
		return this.rubricService.togglePublished(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Rubric, { name: 'createRubric' })
	async create() {
		return this.rubricService.create()
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Rubric, { name: 'updateRubric' })
	async update(
		@Args('id', { type: () => Int }) id: number,
		@Args('data') input: UpdateRubricInput
	) {
		return this.rubricService.update(+id, input)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Rubric, { name: 'deleteRubric' })
	async delete(@Args('id', { type: () => Int }) id: number) {
		return this.rubricService.delete(id)
	}
}
