import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { PrismaService } from 'src/prisma/prisma.service'
import { StorageResolver } from './storage.resolver'
import { StorageService } from './storage.service'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads',
		}),
	],
	providers: [StorageResolver, StorageService, PrismaService],
})
export class StorageModule {}
