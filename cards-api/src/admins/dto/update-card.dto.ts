import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDto {
  @ApiProperty()
  suit: string;

  @ApiProperty()
  rank: string;

  @ApiProperty()
  slugBe: string;

  @ApiProperty()
  nameBe: string;

  @ApiProperty()
  slugRu: string;

  @ApiProperty()
  nameRu: string;

  @ApiProperty()
  slugEn: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  shortDescriptionBe: string;

  @ApiProperty()
  longDescriptionBe: string;

  @ApiProperty()
  shortDescriptionRu: string;

  @ApiProperty()
  longDescriptionRu: string;

  @ApiProperty()
  shortDescriptionEn: string;

  @ApiProperty()
  longDescriptionEn: string;

  @ApiProperty()
  divinatoryMeaningBe: string;

  @ApiProperty()
  divinatoryInterpretationBe: string;

  @ApiProperty()
  divinatoryMeaningRu: string;

  @ApiProperty()
  divinatoryInterpretationRu: string;

  @ApiProperty()
  divinatoryMeaningEn: string;

  @ApiProperty()
  divinatoryInterpretationEn: string;
}
