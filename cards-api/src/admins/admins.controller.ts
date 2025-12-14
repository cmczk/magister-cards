import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import type { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получить информацию о карте для редактирования' })
  @Get('cards/:id')
  async getCardInfoForUpdate(@Param('id', ParseIntPipe) id: number) {
    const card = await this.adminsService.getMagisterCardForUpdate(id);

    return card;
  }

  @Post('create')
  async createAdmin(@Body() data: CreateAdminDto) {
    await this.authService.createAdmin(data.password);
  }

  @Post('login')
  async loginAdmin(
    @Body() data: LoginAdminDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const authData = await this.authService.loginAdmin(
      data.email,
      data.password,
    );

    response.cookie('attn', authData.token);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() request: Request) {
    return request.user;
  }
}
