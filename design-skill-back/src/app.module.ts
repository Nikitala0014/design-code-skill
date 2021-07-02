import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChapterController } from './chapter/chapter.controller';
import { ChapterModule } from './chapter/chapter.module';
import { ChallengeModule } from './challenge/challenge.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/design'), ChapterModule, ChallengeModule],
  controllers: [AppController, ChapterController],
  providers: [AppService],
})
export class AppModule {}
