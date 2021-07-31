import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as fs from 'fs';
import {generate} from 'shortid';

import { AuthService } from '../auth/auth.service'
import { 
    ChallengeDetailsDto,
    ChallengeDto, 
    CreateChallengeDto, 
    UpdateChallengeCardDto,
    ChallengeSubmitedCodeDto
} from './dto';
import { IChallenge, IContentSubmission } from './interfaces';
import { Challenge, ChallengeDocument } from './schemas/challenge.schema';
import { EChallengeKeys } from './constants';

@Injectable()
export class ChallengeService {
    constructor (
        @InjectModel(Challenge.name) private challengeModel: Model<ChallengeDocument>,
        private authService: AuthService
    ) {}

    async getChallengesByChapterId (_id: string): Promise<IChallenge[]> {
        return await this.challengeModel.find({chapterId: _id}).exec();
    }
    
    async getChallengesByChapterName (name: string): Promise<IChallenge[]> {
        return await this.challengeModel.find({chapterName: name}).exec()
    }

    async addChallenge (challenge: CreateChallengeDto): Promise<IChallenge> {
        const createdChallenge = new this.challengeModel(challenge);
        return await createdChallenge.save();
    }

    async valideSubmitedCode (
        payload: ChallengeSubmitedCodeDto,
    ): Promise<IContentSubmission> {
        const { challengeId, userId, submitedCode } = payload;
        const challenge = await this.challengeModel.findById(challengeId);
        const { chapterName, title, details, preview } = challenge;
        const score = details.maxScore;
        const {case_0, case_1, case_2} = challenge.content.contentCode.cases;
        const case_0_input = case_0.input.split(`,`).map((num) => parseInt(num))
        const case_1_input = case_1.input.split(`,`).map((num) => parseInt(num))
        const case_2_input = case_2.input.split(`,`).map((num) => parseInt(num))

        // fs.writeFileSync('src/challenge/editor.code.ts', `export default ${submitedCode}`)
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const userFunction = require('./editor.code');
        const result_0 = userFunction.default(case_0_input);
        const result_1 = userFunction.default(case_1_input);
        const result_2 = userFunction.default(case_2_input);

        const cases = {
            case_result_0: {
                status: (result_0 == parseInt(case_0.expectedOutput) ? 'Success' : 'Error'),
                input: case_0.input,
                result: result_0,
                expected: parseInt(case_0.expectedOutput)
            },
            case_result_1: {
                status: (result_1 == parseInt(case_1.expectedOutput) ? 'Success' : 'Error'), 
                input: case_1.input,
                result: result_1,
                expected: parseInt(case_1.expectedOutput)
            },
            case_result_2: {
                status: (result_2 == parseInt(case_2.expectedOutput) ? 'Success' : 'Error' ), 
                input: case_2.input,
                result: result_2,
                expected: parseInt(case_2.expectedOutput)
            }
        }
        let status = 'Success';
        for (const key in cases) {
            (cases[key].status === 'Error') && (status = 'Error');
        }
        const shortId = generate()
        const submission: IContentSubmission = {
            challengeId,
            userId,
            status,
            score: status === 'Error' ? 0.0 : score,
            date: Date.now(),
            submitedCodeId: shortId,
            submissionDetails: {
                submitedCode,
                submissionData: cases,
            }
        }

        try {
            await this.challengeModel.findByIdAndUpdate(
                challengeId,
                {$push: {
                    'challengeCodeSubmissions': submission,
                }},
                { new: true },
            );
            const userChallenge = {
                _id: challengeId,
                chapterName,
                title,
                details,
                preview
            }

            status === 'Success' 
                ? this.authService.addSolvedChallenge({userId, userChallenge})
                : this.authService.addAttemtedChallenge({userId, userChallenge});
            
            return submission;
        } catch (error) {
            throw new Error(error)
        }
    }

    async saveEditContentProblem (payload: {
        _id: string, contentProblem: IChallenge["content"]["contentProblem"]}
    ): Promise<IChallenge> {
        const { _id, contentProblem } = payload;
        return await this.challengeModel.findByIdAndUpdate(
            _id, 
            { $set: {'content.contentProblem': contentProblem} },
            { new: true },
        );
    }

    async saveEditContentCode (payload: {
        _id: string, contentCode: IChallenge["content"]["contentCode"]}
    ): Promise<IChallenge> {
        const { _id, contentCode } = payload;
        return await this.challengeModel.findByIdAndUpdate(
            _id, 
            { $set: {'content.contentCode': contentCode} },
            { new: true },
        );
    }

    async saveEditContentEditorial (payload: {
        _id: string, contentEditorial: IChallenge["content"]["contentEditorial"]}
    ): Promise<IChallenge> {
        const { _id, contentEditorial } = payload;
        return await this.challengeModel.findByIdAndUpdate(
            _id,
            { $set: {'content.contentEditorial': contentEditorial} },
            { new: true },
        );
    }

    async saveEditChallengeCard (
        payload: {_id: string, items: string[]}
    ): Promise<IChallenge> {
        const { _id, items } = payload;
        const [name, value] = [items[0], items[1]]
        console.log('name', name);
        console.log('value', value);
        switch (name) {
            case 'challenge-title':
                return this.challengeModel.findByIdAndUpdate(_id, {title: value}, {new: true});
            case 'challenge-difficulty':
                return this.challengeModel.findByIdAndUpdate(_id, {'details.difficulty': value}, {new: true});
            case 'challenge-skill':
                return this.challengeModel.findByIdAndUpdate(_id, {'details.skill': value}, {new: true});
            case 'challenge-maxScore':
                return this.challengeModel.findByIdAndUpdate(_id, {'details.maxScore': value}, {new: true});
            case 'challenge-successRatio':
                return this.challengeModel.findByIdAndUpdate(_id, {'details.successRatio': value}, {new: true});
            case 'challenge-preview':
                return this.challengeModel.findByIdAndUpdate(_id, {preview: value}, {new: true});
            default:
                break;
        }
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
