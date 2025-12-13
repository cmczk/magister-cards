import { ApiProperty } from '@nestjs/swagger';
import { CardRank, CardSuit } from 'src/generated/prisma/enums';

export class GetRandomCardDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  coverUrl: string;

  @ApiProperty()
  suit: CardSuit;

  @ApiProperty()
  rank: CardRank;

  @ApiProperty()
  shortDescription: string;
}
