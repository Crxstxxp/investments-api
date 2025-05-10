import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from '../DTOs/CreateUserDto';
import { AuthService } from '../../auth/services/auth/auth.service';
import { UsersService } from '../services/users/users.service';

@Controller('auth')
export class UsersController {

    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) { }

    @Get('users')
    async getUsers(): Promise<any> {
        try {
            const users = await this.usersService.getAllUsers();
            return {
                data: users,
            };
        } catch (error) {
            return {
                message: 'Error fetching users',
                error: error.message,
            };
        }
    }

    @Post('register')
    async register(@Body() user: CreateUserDto): Promise<any> {
        try {
            const newUser = await this.authService.registerUser(user);
            return {
                user: newUser,
            };
        } catch (error) {
            return {
                message: 'Error registering user',
                error: error.message,
            };
        }
    }

    @Post('login')
    async login(@Body() user: any): Promise<any> {
        try {
            const token = await this.authService.loginUser(user.email, user.password);
            return {
                token: token,
                expiresIn: process.env.JWT_EXPIRES_IN,
            };
        } catch (error) {
            return {
                message: 'Error logging in',
                error: error.message,
            };
        }
    }

}