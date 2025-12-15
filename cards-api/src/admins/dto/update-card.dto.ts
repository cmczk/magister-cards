import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { CardRank, CardSuit } from 'src/generated/prisma/enums';

export class UpdateCardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CardSuit)
  suit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CardRank)
  rank: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(250)
  nameBe: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(250)
  nameRu: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(250)
  nameEn: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(1000)
  shortDescriptionBe: string;

  @ApiProperty()
  @MaxLength(5000)
  longDescriptionBe: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(1000)
  shortDescriptionRu: string;

  @ApiProperty()
  @MaxLength(5000)
  longDescriptionRu: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(1000)
  shortDescriptionEn: string;

  @ApiProperty()
  @MaxLength(5000)
  longDescriptionEn: string;

  @ApiProperty()
  @MaxLength(1000)
  divinatoryMeaningBe: string;

  @ApiProperty()
  @MaxLength(5000)
  divinatoryInterpretationBe: string;

  @ApiProperty()
  @MaxLength(1000)
  divinatoryMeaningRu: string;

  @ApiProperty()
  @MaxLength(5000)
  divinatoryInterpretationRu: string;

  @ApiProperty()
  @MaxLength(1000)
  divinatoryMeaningEn: string;

  @ApiProperty()
  @MaxLength(5000)
  divinatoryInterpretationEn: string;
}
