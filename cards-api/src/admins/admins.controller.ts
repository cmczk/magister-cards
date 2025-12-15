import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
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
import { GetCardForUpdateDto } from './dto/get-card-for-update.dto';
import { Language } from 'src/generated/prisma/enums';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получить информацию о карте для редактирования' })
  @Get('cards/:id')
  async getCardInfoForUpdate(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetCardForUpdateDto> {
    const card = await this.adminsService.getMagisterCardForUpdate(id);

    if (!card) {
      throw new NotFoundException();
    }

    return {
      suit: card.suit,
      rank: card.rank,
      nameBe:
        card.magisterCardNames.find((name) => name.language === Language.BE)
          ?.name ?? '',
      nameRu:
        card.magisterCardNames.find((name) => name.language === Language.RU)
          ?.name ?? '',
      nameEn:
        card.magisterCardNames.find((name) => name.language === Language.EN)
          ?.name ?? '',
      slugBe:
        card.magisterCardNames.find((name) => name.language === Language.BE)
          ?.slug ?? '',
      slugRu:
        card.magisterCardNames.find((name) => name.language === Language.RU)
          ?.slug ?? '',
      slugEn:
        card.magisterCardNames.find((name) => name.language === Language.EN)
          ?.slug ?? '',
      shortDescriptionBe:
        card.magisterCardDescriptions.find(
          (desc) => desc.language === Language.BE,
        )?.shortDescription ?? '',
      shortDescriptionRu:
        card.magisterCardDescriptions.find(
          (desc) => desc.language === Language.RU,
        )?.shortDescription ?? '',
      shortDescriptionEn:
        card.magisterCardDescriptions.find(
          (desc) => desc.language === Language.EN,
        )?.shortDescription ?? '',
      longDescriptionBe:
        card.magisterCardDescriptions.find(
          (desc) => desc.language === Language.BE,
        )?.longDescription ?? '',
      longDescriptionRu:
        card.magisterCardDescriptions.find(
          (desc) => desc.language === Language.RU,
        )?.longDescription ?? '',
      longDescriptionEn:
        card.magisterCardDescriptions.find(
          (desc) => desc.language === Language.EN,
        )?.longDescription ?? '',
      divinatoryMeaningBe:
        card.magisterCardDivinations.find((div) => div.language === Language.BE)
          ?.divinatoryMeaning ?? '',
      divinatoryMeaningRu:
        card.magisterCardDivinations.find((div) => div.language === Language.RU)
          ?.divinatoryMeaning ?? '',
      divinatoryMeaningEn:
        card.magisterCardDivinations.find((div) => div.language === Language.EN)
          ?.divinatoryMeaning ?? '',
      divinatoryInterpretationBe:
        card.magisterCardDivinations.find((div) => div.language === Language.BE)
          ?.divinatoryInterpretation ?? '',
      divinatoryInterpretationRu:
        card.magisterCardDivinations.find((div) => div.language === Language.RU)
          ?.divinatoryInterpretation ?? '',
      divinatoryInterpretationEn:
        card.magisterCardDivinations.find((div) => div.language === Language.EN)
          ?.divinatoryInterpretation ?? '',
    };
  }

  @Patch('cards/:id/edit')
  async updateCard(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCardDto,
  ) {
    await this.adminsService.updateCard(id, data);
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
  @Post('logout')
  logoutAdmin(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('attn');
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() request: Request) {
    return request.user;
  }
}
