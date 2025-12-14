import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService,
  ) {}

  async createAdmin(password: string) {
    await this.adminsService.saveAdmin(await this.hashPassword(password));
  }

  async loginAdmin(email: string, password: string) {
    const admin = await this.adminsService.getAdmin(email);

    if (!admin || !(await this.verifyPassword(password, admin.passwordHash))) {
      throw new UnauthorizedException();
    }

    return {
      token: await this.jwtService.signAsync({ id: admin.id }),
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  private async verifyPassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
