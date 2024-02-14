import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { Response } from 'express'
import { EnumTokens } from 'src/global/enums/auth.enum'
import { PrismaService } from 'src/prisma/prisma.service'
import { isProd } from 'src/utils/is-prod.util'
import { AuthLoginInput } from './inputs/auth-login.input'
import { AuthRegisterInput } from './inputs/auth-register.input'

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private prisma: PrismaService,
		private configService: ConfigService
	) {}

	private EXPIRE_DAY_REFRESH_TOKEN = 1
	private EXPIRE_HOUR_ACCESS_TOKEN = 1

	async register(input: AuthRegisterInput) {
		const oldUser = await this.prisma.user.findFirst({
			where: {
				OR: [
					{
						login: input.login,
					},
					{
						email: input.email,
					},
				],
			},
		})

		if (oldUser)
			throw new BadRequestException(
				'Пользователь уже зарегистрирован.'
			)

		const newUser = await this.prisma.user.create({
			data: {
				login: input.login,
				email: input.email,
				password: await hash(input.password),
			},
		})

		const tokens = await this.issueTokens(newUser.id)

		return {
			user: newUser,
			...tokens,
		}
	}

	async login(input: AuthLoginInput) {
		const user = await this.validateUser(input)

		const tokens = await this.issueTokens(user.id)

		return {
			user,
			...tokens,
		}
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwtService.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid token or expired')

		const user = await this.prisma.user.findUnique({
			where: {
				id: result.id,
			},
		})

		const tokens = await this.issueTokens(user.id)

		return {
			user,
			...tokens,
		}
	}

	async validateUser(input: AuthLoginInput) {
		const user = await this.prisma.user.findFirst({
			where: {
				OR: [
					{
						login: input.loginOrEmail,
					},
					{
						email: input.loginOrEmail,
					},
				],
			},
		})
		if (!user) throw new UnauthorizedException('Пользователь не найден.')

		const isValidPassword = await verify(user.password, input.password)
		if (!isValidPassword) throw new UnauthorizedException('Неверный пароль.')

		return user
	}

	async issueTokens(userId: number) {
		const data = { id: userId }

		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: `${this.EXPIRE_DAY_REFRESH_TOKEN}d`,
		})

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: `${this.EXPIRE_HOUR_ACCESS_TOKEN}h`,
		})

		return { accessToken, refreshToken }
	}

	async addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(EnumTokens.REFRESH_TOKEN, refreshToken, {
			httpOnly: true,
			expires: expiresIn,
			secure: isProd(this.configService),
			sameSite: 'none',
		})
	}

	async removeRefreshTokenFromResponse(res: Response) {
		res.clearCookie(EnumTokens.REFRESH_TOKEN)
	}
}
