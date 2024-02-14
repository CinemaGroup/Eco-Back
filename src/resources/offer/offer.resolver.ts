import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { QueryInput } from 'src/global/inputs/query.input'
import { Auth } from '../auth/decorators/auth.decorator'
import { UserRole } from '../user/enum/user-role.enum'
import { Offer } from './entities/offer.entity'
import { UpdateOfferInput } from './inputs/update-offer.input'
import { OfferService } from './offer.service'

@Resolver()
export class OfferResolver {
	constructor(private readonly offerService: OfferService) {}

	@Query(() => [Offer], { name: 'offers' })
	async getAll(@Args('query') input: QueryInput) {
		return this.offerService.getAll(input)
	}

	// Admin Place

	@Auth(UserRole.ADMIN)
	@Query(() => Offer, { name: 'offerById' })
	async getById(@Args('id', { type: () => Int }) id: number) {
		return this.offerService.byId(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Offer, { name: 'toggleOffer' })
	async togglePublished(@Args('id', { type: () => Int }) id: number) {
		return this.offerService.togglePublished(id)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Offer, { name: 'createOffer' })
	async create() {
		return this.offerService.create()
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Offer, { name: 'updateOffer' })
	async update(
		@Args('id', { type: () => Int }) id: number,
		@Args('data') input: UpdateOfferInput
	) {
		return this.offerService.update(+id, input)
	}

	@Auth(UserRole.ADMIN)
	@Mutation(() => Offer, { name: 'deleteOffer' })
	async delete(@Args('id', { type: () => Int }) id: number) {
		return this.offerService.delete(id)
	}
}
