import { ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'

export const getGraphQLConfig = async (
	configService: ConfigService
): Promise<ApolloDriverConfig> => ({
	path: '/mygraphql',
	playground: true,
	autoSchemaFile: join(process.cwd(), 'src/scheme/scheme.gql'),
	context: ({ req, res }) => ({
		req,
		res,
	}),
	sortSchema: true,
})
