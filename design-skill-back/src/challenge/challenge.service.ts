import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
// import { ChallengeDto } from './dto/challenge.dto';
import { CreateChallengeDto } from './dto/create-challenge.dto';

import { IChallenge } from './interfaces/challenge.interface';
import { Challenge, ChallengeDocument } from './schemas/challenge.schema';

@Injectable()
export class ChallengeService {
    constructor(@InjectModel(Challenge.name) private challengeModel: Model<ChallengeDocument>) {}

    gelChallengesByChapterId(_id: ObjectId): Promise<IChallenge[]> {
        return this.challengeModel.find({chapterId: _id}).exec();
    }

    addChallenge(challenge: CreateChallengeDto): Promise<IChallenge> {
        const createdChallenge = new this.challengeModel(challenge);
        return createdChallenge.save();
    }
}
