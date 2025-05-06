import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    exports: [],
    providers: [AuthService],
    imports: [UsersModule],
})
export class AuthModule { }
