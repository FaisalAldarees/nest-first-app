import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import {GetUser} from '../auth/decorator/user.decorator';
import { JwtGuard } from 'src/auth/gaurd';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @HttpCode(HttpStatus.OK)
    @Patch('me/edit')
    async updateUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
        return this.userService.updateUser(userId, dto)
    }
    
}
