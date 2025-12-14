import { Injectable } from '@nestjs/common';
import { UserType } from 'src/generated/prisma/enums';
import { PrismaService } from 'src/prisma.service';

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
}
