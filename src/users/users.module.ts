import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './Controllers/UsersController';
import { UsersService } from './services/users/users.service';
import { Users } from './Models/Users.entity';

@Module({
    exports: [UsersModule],
    imports: [
        TypeOrmModule.forFeature([Users]),
        AuthModule
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }
