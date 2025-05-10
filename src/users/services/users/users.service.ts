import { Injectable } from '@nestjs/common';
import { Users } from '../../Models/Users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) {}

    async getAllUsers(): Promise<Users[]> {
        return await this.usersRepository.find();
    }
}
