import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CardsModule } from './cards/cards.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
      serveRoot: '/static',
      serveStaticOptions: {
        index: false,
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '12h' },
    }),
    CardsModule,
    AdminsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
