import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({ summary: 'Получить информацию о карте для редактирования' })
  @Get('cards/:id')
  async getCardInfoForUpdate(@Param('id', ParseIntPipe) id: number) {
    const card = await this.adminsService.getMagisterCardForUpdate(id);

    return card;
  }
}
