import { BadRequestException } from '@nestjs/common';
import { Language } from 'src/generated/prisma/enums';

export const toLanguageEnum = (lang: string): Language => {
  switch (lang) {
    case 'be':
      return Language.BE;
    case 'ru':
      return Language.RU;
    case 'en':
      return Language.EN;
    default:
      throw new BadRequestException({
        message: 'Invalid language parameter',
      });
  }
};
