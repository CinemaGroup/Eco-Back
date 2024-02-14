import { Field, InputType } from '@nestjs/graphql'
import { PaginationInput } from 'src/resources/pagination/inputs/pagination.input'
import { Sort, Status } from '../enums/query.enum'

@InputType()
export class QueryInput extends PaginationInput {
	@Field(() => Sort)
	sort: Sort

	@Field(() => String, { nullable: true })
	searchTerm?: string

	@Field(() => Status, { nullable: true })
	status?: Status
}
