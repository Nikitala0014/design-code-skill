import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { 
    ChallengeContentCodeDto,
    ChallengeContentProblemDto,
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

    gelChallengesByChapterId (_id: ObjectId): Promise<IChallenge[]> {
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
        updateChallengeCardDto: UpdateChallengeCardDto,
    ): Promise<IChallenge> 
    {
        const { _id, field, value } = updateChallengeCardDto;
        return field === EChallengeKeys.TITLE
            ? await this.challengeModel.findByIdAndUpdate({_id, title: value})
            : await this.challengeModel.findByIdAndUpdate({_id, preview: value});
    }

    async updateChallengeDetails (
        challengeDetailsDto: ChallengeDetailsDto,
    ): Promise<HttpStatus> {
        const { _id, ...details } = challengeDetailsDto;
        await this.challengeModel.findByIdAndUpdate({_id, details: details});
        return HttpStatus.OK;
    }

    async updateChallengeContentProblem (
        challengeContentProblem: ChallengeContentProblemDto,
    ): Promise<HttpStatus> {
        const { _id, contentProblem } = challengeContentProblem;
        await this.challengeModel.findByIdAndUpdate({_id, contentProblem})
        return HttpStatus.OK;
    }

    async updateChallengeContentCode (
        challengeContentCode: ChallengeContentCodeDto,
    ): Promise<HttpStatus> {
        const { _id, contentCode } = challengeContentCode;
        await this.challengeModel.findByIdAndUpdate({_id, contentCode});
        return HttpStatus.OK;
    }
}
