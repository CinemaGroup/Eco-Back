import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth } from '../auth/decorators/auth.decorator'
import { UserRole } from '../user/enum/user-role.enum'
import { Group } from './entities/group.entity'
import { GroupService } from './group.service'
import { QueryGroupInput } from './inputs/query-group.input'
import { UpdateGroupInput } from './inputs/update-group.input'

@Resolver()
export class GroupResolver {
	constructor(private readonly groupService: GroupService) {}

	@Query(() => [Group], { name: 'groups' })
	async getAll(@Args('query') input: QueryGroupInput) {
		return this.groupService.getAll(input)
	}

	// Admin Place

	@Auth(UserRole.ADMIN)
	@Query(() => Group, { name: 'groupById' })
	async getById(@Args('id', { type: () => Int }) id: number) {
		return this.groupService.byId(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Group, { name: 'toggleGroup' })
	async togglePublished(@Args('id', { type: () => Int }) id: number) {
		return this.groupService.togglePublished(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Group, { name: 'createGroup' })
	async create() {
		return this.groupService.create()
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Group, { name: 'updateGroup' })
	async update(
		@Args('id', { type: () => Int }) id: number,
		@Args('data') input: UpdateGroupInput
	) {
		return this.groupService.update(+id, input)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Group, { name: 'deleteGroup' })
	async delete(@Args('id', { type: () => Int }) id: number) {
		return this.groupService.delete(id)
	}
}
