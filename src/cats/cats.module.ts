import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth, Cat } from 'src/typeorm';
import { CatsService } from './cats.service';
import { AuthGuard } from 'src/auth/auth.guard';
@Module({
  controllers: [CatsController],
  imports: [TypeOrmModule.forFeature([Cat,Auth]),],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}