import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { 
    ChallengeDetailsDto,
    ChallengeDto, 
    CreateChallengeDto, 
    UpdateChallengeCardDto 
} from './dto';
import { IChallenge } from './interfaces';
import { Challenge, ChallengeDocument } from './schemas/challenge.schema';
import { EChallengeKeys } from './constants';

@Injectable()
export class ChallengeService {
    constructor (@InjectModel(Challenge.name) private challengeModel: Model<ChallengeDocument>) {}

    gelChallengesByChapterId (_id: string): Promise<IChallenge[]> {
        return this.challengeModel.find({chapterId: _id}).exec();
    }

    addChallenge (challenge: CreateChallengeDto): Promise<IChallenge> {
        const createdChallenge = new this.challengeModel(challenge);
        return createdChallenge.save();
    }

    async removeChallenge (_id: ChallengeDto["_id"]): Promise<HttpStatus> {
        await this.challengeModel.findByIdAndDelete(_id);
        return HttpStatus.OK;
    }

    async updateChallengeCard (
        _id: ChallengeDto["_id"],
        updateChallengeCardDto: UpdateChallengeCardDto,
    ): Promise<IChallenge> 
    {
        const { field, value } = updateChallengeCardDto;
        return field === EChallengeKeys.TITLE
            ? await this.challengeModel.findByIdAndUpdate({_id, title: value})
            : await this.challengeModel.findByIdAndUpdate({_id, preview: value});
    }

    async updateChallengeDetails (
        _id: ChallengeDto["_id"],
        challengeDetailsDto: ChallengeDetailsDto,
    ): Promise<IChallenge> {
        return await this.challengeModel
            .findByIdAndUpdate({_id, details: challengeDetailsDto});
    }

    async updateChallengeContentProblem (
        _id: ChallengeDto["_id"], contentProblem: string,
    ): Promise<IChallenge> {
        return await this.challengeModel.findByIdAndUpdate({_id, contentProblem})
    }

    async updateChallengeContentCode (
        _id: ChallengeDto["_id"], contentCode: string,
    ): Promise<IChallenge> {
        return await this.challengeModel.findByIdAndUpdate({_id, contentCode});
    }
}
