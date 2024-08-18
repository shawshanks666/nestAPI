import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CatsModule } from '../cats/cats.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { Auth } from 'src/typeorm/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5m' },
    }),],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard,AuthService, TypeOrmModule.forFeature([Auth])], // Export AuthRepository

  
})
export class AuthModule {}
