import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, PrismaService, AuthService],
  exports: [AdminsService],
})
export class AdminsModule {}
