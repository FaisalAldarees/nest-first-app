import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Email or password is wrong');
    }
    const isPasswordValid = await argon.verify(user.hash, dto.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Email or password is wrong');
    }
    return { token: await this.signToken(user.id, user.email) };
  }
  async signup(dto: AuthDto) {
    try {
      const hashedPassword = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
        },
      });
      return { token: await this.signToken(user.id, user.email) };
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ForbiddenException('Email already exists');
      } else {
        throw new ForbiddenException('Something went wrong');
      }
    }
  }

  signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email: email,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
