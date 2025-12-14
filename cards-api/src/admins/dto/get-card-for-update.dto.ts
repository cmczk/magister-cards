import { ApiProperty } from '@nestjs/swagger';

export class GetCardForUpdateDto {
  @ApiProperty()
  suit: string;
  @ApiProperty()
  rank: string;
}
