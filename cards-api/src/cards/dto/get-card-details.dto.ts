import { ApiProperty } from '@nestjs/swagger';
import { CardRank, CardSuit } from 'src/generated/prisma/enums';

export class GetCardDetails {
  @ApiProperty()
  name: string;

  @ApiProperty()
  suit: CardSuit;

  @ApiProperty()
  rank: CardRank;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  shortDescription: string;

  @ApiProperty()
  longDescription: string;

  @ApiProperty()
  divinatoryMeaning: string;

  @ApiProperty()
  divinatoryInterpretation: string;
}
