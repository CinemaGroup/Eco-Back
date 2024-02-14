import { registerEnumType } from '@nestjs/graphql'

export enum RequestType {
	NULL = 'NULL',
	DRY_CLEANING = 'DRY_CLEANING',
	WASH = 'WASH',
}

registerEnumType(RequestType, {
	name: 'RequestType',
})
