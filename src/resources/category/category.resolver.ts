import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { QueryInput } from 'src/global/inputs/query.input'
import { Auth } from '../auth/decorators/auth.decorator'
import { UserRole } from '../user/enum/user-role.enum'
import { CategoryService } from './category.service'
import { Category } from './entities/category.entity'
import { UpdateCategoryInput } from './inputs/update-category.input'
import { GetCategoryPriceInput } from './inputs/get-price.input'

@Resolver()
export class CategoryResolver {
	constructor(private readonly categoryService: CategoryService) {}

	@Query(() => [Category], { name: 'categories' })
	async getAll(@Args('query') input: QueryInput) {
		return this.categoryService.getAll(input)
	}

	@Query(() => Category, { name: 'categoryBySlug' })
	async getBySlug(@Args('slug', { type: () => String }) slug: string) {
		return this.categoryService.getBySlug(slug)
	}

	@Mutation(() => Int, { name: 'categoryPrice' })
	async getCategoryPrice(@Args('data', { type: () => GetCategoryPriceInput }) input: GetCategoryPriceInput) {
		return this.categoryService.getPrice(input)
	}

	// Admin Place

	@Auth(UserRole.ADMIN)
	@Query(() => Category, { name: 'categoryById' })
	async getById(@Args('id', { type: () => Int }) id: number) {
		return this.categoryService.byId(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Category, { name: 'toggleCategory' })
	async togglePublished(@Args('id', { type: () => Int }) id: number) {
		return this.categoryService.togglePublished(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Category, { name: 'createCategory' })
	async create() {
		return this.categoryService.create()
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Category, { name: 'updateCategory' })
	async update(
		@Args('id', { type: () => Int }) id: number,
		@Args('data') input: UpdateCategoryInput
	) {
		return this.categoryService.update(+id, input)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Category, { name: 'deleteCategory' })
	async delete(@Args('id', { type: () => Int }) id: number) {
		return this.categoryService.delete(id)
	}
}
