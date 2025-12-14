import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}

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
}
