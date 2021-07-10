import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChapterModule } from './chapter/chapter.module';
import { ChallengeModule } from './challenge/challenge.module';
import { EditorModule } from './editor/editor.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule
    .forRoot(
      'mongodb+srv://bruce00:goodlife@cluster0.kbrtk.mongodb.net/design?retryWrites=true&w=majority'), 
    ChapterModule, ChallengeModule, EditorModule, UserModule, AuthModule],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, AuthService],
})
export class AppModule {}
