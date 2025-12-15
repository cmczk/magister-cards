import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(12)
  @MaxLength(50)
  password: string;
}
