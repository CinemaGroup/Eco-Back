import { Field, InputType } from '@nestjs/graphql'
import { Sort } from 'src/global/enums/query.enum'
import { PaginationInput } from 'src/resources/pagination/inputs/pagination.input'

@InputType()
export class QueryRequestInput extends PaginationInput {
	@Field(() => Sort, { nullable: true })
	sort?: Sort

	@Field(() => String, { nullable: true })
	searchTerm?: string
}
