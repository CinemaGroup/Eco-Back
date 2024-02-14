import { Field, InputType } from '@nestjs/graphql'
import { QueryInput } from 'src/global/inputs/query.input'

@InputType()
export class QueryGroupInput extends QueryInput {
	@Field(() => String, { nullable: true })
	categorySlug?: string
}
