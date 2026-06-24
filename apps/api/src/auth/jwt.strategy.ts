import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super-secret-enterprise-key',
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: {
        roles: {
          include: { role: true }
        }
      }
    });

    if (!user) {
      throw new UnauthorizedException('User not found or inactive');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User account is locked or suspended');
    }

    return { 
      userId: payload.sub, 
      email: payload.email,
      tenantId: payload.tenantId,
      roles: user.roles.map(r => r.role.name)
    };
  }
}
