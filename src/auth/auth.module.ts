import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/Models/Users.entity';

@Module({
    exports: [AuthService],
    providers: [AuthService],
    imports: [TypeOrmModule.forFeature([Users])],
})
export class AuthModule { }
