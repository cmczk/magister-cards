import { ApiProperty } from '@nestjs/swagger';
import { CardRank, CardSuit } from 'src/generated/prisma/enums';

export class GetCardForWikiDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  suit: CardSuit;

  @ApiProperty()
  rank: CardRank;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  shortDescription: string;

  @ApiProperty()
  imageUrl: string;
}
