import { Injectable } from '@nestjs/common';
import { Language, UserType } from 'src/generated/prisma/enums';
import { PrismaService } from 'src/prisma.service';
import { UpdateCardDto } from './dto/update-card.dto';
import slugify from 'slugify';

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}

  async saveAdmin(passwordHash: string) {
    await this.prisma.user.create({
      data: {
        email: 'magister@admin.com',
        passwordHash: passwordHash,
        userType: UserType.ADMIN,
      },
    });
  }

  async getAdmin(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        passwordHash: true,
      },
    });
  }

  async getMagisterCardForUpdate(id: number) {
    return await this.prisma.magisterCard.findUnique({
      where: {
        id: id,
      },
      select: {
        suit: true,
        rank: true,
        magisterCardNames: {
          select: {
            name: true,
            slug: true,
            language: true,
          },
        },
        magisterCardDescriptions: {
          select: {
            shortDescription: true,
            longDescription: true,
            language: true,
          },
        },
        magisterCardDivinations: {
          select: {
            divinatoryMeaning: true,
            divinatoryInterpretation: true,
            language: true,
          },
        },
        magisterCardImages: {
          select: {
            imageUrl: true,
            deckType: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async updateCard(id: number, data: UpdateCardDto) {
    await this.prisma.$transaction([
      this.prisma.magisterCardName.update({
        where: {
          magisterCardId_language: {
            magisterCardId: id,
            language: Language.BE,
          },
        },
        data: {
          name: data.nameBe,
          slug: slugify(data.nameBe, { lower: true }),
        },
      }),

      this.prisma.magisterCardName.update({
        where: {
          magisterCardId_language: {
            magisterCardId: id,
            language: Language.RU,
          },
        },
        data: {
          name: data.nameRu,
          slug: slugify(data.nameRu, { lower: true }),
        },
      }),

      this.prisma.magisterCardName.update({
        where: {
          magisterCardId_language: {
            magisterCardId: id,
            language: Language.EN,
          },
        },
        data: {
          name: data.nameEn,
          slug: slugify(data.nameEn, { lower: true }),
        },
      }),

      this.prisma.magisterCardDescription.update({
        where: {
          magisterCardId_language: {
            magisterCardId: id,
            language: Language.BE,
          },
        },
        data: {
          shortDescription: data.shortDescriptionBe,
          longDescription: data.longDescriptionBe,
        },
      }),

      this.prisma.magisterCardDescription.update({
        where: {
          magisterCardId_language: {
            magisterCardId: id,
            language: Language.RU,
          },
        },
        data: {
          shortDescription: data.shortDescriptionRu,
          longDescription: data.longDescriptionRu,
        },
      }),

      this.prisma.magisterCardDescription.update({
        where: {
          magisterCardId_language: {
            magisterCardId: id,
            language: Language.EN,
          },
        },
        data: {
          shortDescription: data.shortDescriptionEn,
          longDescription: data.longDescriptionEn,
        },
      }),

      this.prisma.magisterCardDivination.update({
        where: {
          magisterCardId_language: {
            magisterCardId: id,
            language: Language.BE,
          },
        },
        data: {
          divinatoryMeaning: data.divinatoryMeaningBe,
          divinatoryInterpretation: data.divinatoryInterpretationBe,
        },
      }),

      this.prisma.magisterCardDivination.update({
        where: {
          magisterCardId_language: {
            magisterCardId: id,
            language: Language.RU,
          },
        },
        data: {
          divinatoryMeaning: data.divinatoryMeaningRu,
          divinatoryInterpretation: data.divinatoryInterpretationRu,
        },
      }),

      this.prisma.magisterCardDivination.update({
        where: {
          magisterCardId_language: {
            magisterCardId: id,
            language: Language.EN,
          },
        },
        data: {
          divinatoryMeaning: data.divinatoryMeaningEn,
          divinatoryInterpretation: data.divinatoryInterpretationEn,
        },
      }),
    ]);
  }
}
