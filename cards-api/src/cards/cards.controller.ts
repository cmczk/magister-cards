import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CardsService } from './cards.service';
import { GetRandomCardDto } from './dto/get-random-card.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { toLanguageEnum } from 'src/utils/language';
import { GetCardForWikiDto } from './dto/get-card-for-wiki.dto';
import { GetCardDetails } from './dto/get-card-details.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiOperation({ summary: 'Получить карту дня' })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ с картой дня',
    type: GetRandomCardDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Карта дня не найдена',
  })
  @Get(':lang/card-of-the-day')
  async getCardOfTheDay(
    @Param('lang') lang: string,
  ): Promise<GetRandomCardDto> {
    const card = await this.cardsService.getCardOfTheDay(toLanguageEnum(lang));

    if (!card) {
      throw new NotFoundException();
    }

    return {
      id: card.id,
      suit: card.suit,
      rank: card.rank,
      name: card.magisterCardNames[0].name,
      slug: card.magisterCardNames[0].slug,
      shortDescription: card.magisterCardDescriptions[0].shortDescription,
    };
  }

  @ApiOperation({ summary: 'Получить карту события' })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ с картой события',
    type: GetRandomCardDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Карта события не найдена',
  })
  @Get(':lang/card-of-the-event')
  async getCardOfTheEvent(
    @Param('lang') lang: string,
  ): Promise<GetRandomCardDto> {
    const card = await this.cardsService.getCardOfTheEvent(
      toLanguageEnum(lang),
    );

    if (!card) {
      throw new NotFoundException();
    }

    return {
      id: card.id,
      suit: card.suit,
      rank: card.rank,
      name: card.magisterCardNames[0].name,
      slug: card.magisterCardNames[0].slug,
      shortDescription: card.magisterCardDescriptions[0].shortDescription,
    };
  }

  @ApiOperation({ summary: 'Получить все карты для энциклопедии' })
  @ApiResponse({
    status: 200,
    description: 'Успешно возвращает все карты',
    type: [GetCardForWikiDto],
  })
  @Get(':lang')
  async getAllCards(@Param('lang') lang: string): Promise<GetCardForWikiDto[]> {
    const cards = await this.cardsService.getAllCards(toLanguageEnum(lang));

    return cards.map((card) => ({
      id: card.id,
      suit: card.suit,
      rank: card.rank,
      name: card.magisterCardNames[0].name,
      slug: card.magisterCardNames[0].slug,
      shortDescription: card.magisterCardDescriptions[0].shortDescription,
      imageUrl: card.magisterCardImages[0].imageUrl,
    }));
  }

  @ApiOperation({ summary: 'Получить информацию об отдельной карте' })
  @ApiResponse({
    status: 200,
    description: 'Успешно возвращает полную информацию о карте',
    type: GetCardDetails,
  })
  @ApiResponse({
    status: 404,
    description: 'Информация о карте не найдена',
  })
  @Get(':lang/:slug')
  async getCardDetails(
    @Param('lang') lang: string,
    @Param('slug') slug: string,
  ): Promise<GetCardDetails> {
    const card = await this.cardsService.getCardDetails(
      toLanguageEnum(lang),
      slug,
    );

    if (!card) {
      throw new NotFoundException();
    }

    return {
      name: card.name,
      suit: card.card.suit,
      rank: card.card.rank,
      imageUrl: card.card.magisterCardImages[0].imageUrl,
      shortDescription: card.card.magisterCardDescriptions[0].shortDescription,
      longDescription: card.card.magisterCardDescriptions[0].longDescription,
      divinatoryMeaning:
        card.card.magisterCardDivinations[0]?.divinatoryMeaning,
      divinatoryInterpretation:
        card.card.magisterCardDivinations[0]?.divinatoryInterpretation,
    };
  }
}
