import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { Challenge, ChallengeSchema } from './schemas/challenge.schema';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([
    {name: Challenge.name, schema: ChallengeSchema}
  ])],
  controllers: [ChallengeController],
  providers: [ChallengeService]
})
export class ChallengeModule {}
