import { ApiProperty } from '@nestjs/swagger';

export class GetCardForUpdateDto {
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
  divinatoryInterpretionBe: string;

  @ApiProperty()
  divinatoryMeaningRu: string;

  @ApiProperty()
  divinatoryInterpretionRu: string;

  @ApiProperty()
  divinatoryMeaningEn: string;

  @ApiProperty()
  divinatoryInterpretionEn: string;
}
