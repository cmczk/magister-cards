import { Injectable } from '@nestjs/common';
import { randomInt } from 'node:crypto';
import { Language } from 'src/generated/prisma/enums';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly cardsInDeck = 52;

  async getCardOfTheDay(lang: Language) {
    const today = new Date();
    const seed = `${today.getUTCFullYear()}${today.getUTCMonth()}${today.getUTCDate()}`;

    return this.getRandomCard(seed, lang);
  }

  async getCardOfTheEvent(lang: Language) {
    return this.getRandomCard(null, lang);
  }

  async getAllCards(lang: Language) {
    return await this.prisma.magisterCard.findMany({
      select: {
        id: true,
        suit: true,
        rank: true,
        magisterCardNames: {
          where: {
            language: lang,
          },
          select: {
            name: true,
            slug: true,
          },
        },
        magisterCardDescriptions: {
          where: {
            language: lang,
          },
          select: {
            shortDescription: true,
          },
        },
        magisterCardImages: {
          where: {
            deckType: {
              name: 'METAPHORICAL',
            },
          },
          select: {
            imageUrl: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async getCardDetails(lang: Language, slug: string) {
    return await this.prisma.magisterCardName.findUnique({
      where: {
        slug: slug,
        language: lang,
      },
      select: {
        name: true,
        card: {
          select: {
            suit: true,
            rank: true,
            magisterCardDescriptions: {
              where: {
                language: lang,
              },
              take: 1,
              select: {
                shortDescription: true,
                longDescription: true,
              },
            },
            magisterCardDivinations: {
              where: {
                language: lang,
              },
              take: 1,
              select: {
                divinatoryMeaning: true,
                divinatoryInterpretation: true,
              },
            },
            magisterCardImages: {
              where: {
                deckType: {
                  name: 'METAPHORICAL',
                },
              },
              take: 1,
              select: {
                imageUrl: true,
              },
            },
          },
        },
      },
    });
  }

  private async getRandomCard(seed: string | null, lang: Language) {
    const id = !seed
      ? randomInt(1, this.cardsInDeck + 1)
      : this.generateRandomIntInRange(seed, 1, this.cardsInDeck + 1);

    return await this.prisma.magisterCard.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        suit: true,
        rank: true,
        magisterCardNames: {
          where: {
            language: lang,
          },
          select: {
            name: true,
            slug: true,
          },
        },
        magisterCardDescriptions: {
          where: {
            language: lang,
          },
          select: {
            shortDescription: true,
          },
        },
        magisterCardImages: {
          where: {
            deckType: {
              name: 'METAPHORICAL',
            },
          },
          select: {
            imageUrl: true,
          },
        },
      },
    });
  }

  private generateRandomIntInRange(
    seed: string,
    min: number,
    max: number,
  ): number {
    let currentSeed = 0;
    for (let i = 0; i < seed.length; i++) {
      currentSeed += seed.charCodeAt(i);
    }

    currentSeed = (1664525 * currentSeed + 1013904223) % 4294967296;
    const randomValue = currentSeed / 4294967296;

    return Math.floor(randomValue * (max - min + 1)) + min;
  }
}
