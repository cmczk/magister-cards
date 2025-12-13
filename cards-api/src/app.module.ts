import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
