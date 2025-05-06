import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/DTOs/CreateUserDto';
import { Users } from 'src/users/Models/Users.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private dataSource: DataSource,
    ) { }


    async registerUser(user: CreateUserDto) {

        const existingUser = await this.usersRepository.findOne({ where: { email: user.email } });
        if (existingUser) {
            throw new Error('Username already exists');
        }

        user.password = await bcrypt.hash(user.password, 10);

        return await this.usersRepository.save({ ...user });
    }

    async loginUser(email: string, password: string): Promise<string> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ id: user.id }, '82nd8c2b+4f3e%4a1b]8c5f!0a7e9d6f3b2c', { expiresIn: '1h' });
        return token;
    }
}
