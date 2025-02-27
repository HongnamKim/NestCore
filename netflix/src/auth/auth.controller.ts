import {
  Controller,
  Post,
  Headers,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './strategy/local.strategy';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from './strategy/jwt.strategy';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  // authorization: Basic $token
  registerUser(@Headers('authorization') token: string) {
    return this.authService.register(token);
  }

  @Post('login')
  login(@Headers('authorization') token: string) {
    return this.authService.login(token);
  }

  @Post('token/access')
  async rotateAccessToken(@Headers('authorization') token: string) {
    const payload = await this.authService.parseBearerToken(token, true);

    return {
      accessToken: await this.authService.issueToken(payload, false),
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login/passport')
  async loginUserPassport(@Req() req: Request) {
    const user = req.user as User;

    return {
      refreshToken: await this.authService.issueToken(user, true),
      accessToken: await this.authService.issueToken(user, false),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('private')
  async private(@Req() req: Request) {
    return req.user;
  }
}
