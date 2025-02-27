import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // jwt 를 어디서 가져올지
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  validate(
    payload: any,
  ): Promise<false | unknown | null> | false | unknown | null {
    return payload;
  }
}
