import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getGraphQLConfig } from './config/graphql.config'
import { AdvantageModule } from './resources/advantage/advantage.module'
import { AuthModule } from './resources/auth/auth.module'
import { CategoryModule } from './resources/category/category.module'
import { GroupModule } from './resources/group/group.module'
import { OfferModule } from './resources/offer/offer.module'
import { OrderModule } from './resources/order/order.module'
import { PaginationModule } from './resources/pagination/pagination.module'
import { RequestModule } from './resources/request/request.module'
import { ReviewModule } from './resources/review/review.module'
import { ServiceModule } from './resources/service/service.module'
import { StorageModule } from './resources/storage/storage.module'
import { UserModule } from './resources/user/user.module'
import { RubricModule } from './resources/rubric/rubric.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			driver: ApolloDriver,
			imports: [ConfigModule],
			useFactory: getGraphQLConfig,
			inject: [ConfigService],
		}),
		AuthModule,
		UserModule,
		PaginationModule,
		RequestModule,
		AdvantageModule,
		CategoryModule,
		GroupModule,
		ServiceModule,
		OfferModule,
		StorageModule,
		ReviewModule,
		OrderModule,
		RubricModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
