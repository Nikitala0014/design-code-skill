import { Controller, Body, Get, Post, Delete, Put, HttpStatus, Param } from '@nestjs/common';

import { ChallengeService } from './challenge.service';
import {
    ChallengeDto,
    CreateChallengeDto,
    UpdateChallengeCardDto,
    ChallengeDetailsDto,
} from './dto'
import { IChallenge } from './interfaces';

@Controller('challenge')
export class ChallengeController {
    constructor(private readonly challengeService: ChallengeService) {}

    @Get(':chapterId')
    getChallengesByChapterId (@Param('chapterId') chapterId: string): Promise<IChallenge[]> {
        return this.challengeService.gelChallengesByChapterId(chapterId);
    }

    @Post()
    addChallenge (@Body() createChallengeDto: CreateChallengeDto): Promise<IChallenge> {
        return this.challengeService.addChallenge(createChallengeDto);
    }

    @Delete(':_id')
    removeChallenge (@Param('_id') _id: ChallengeDto["_id"]): Promise<HttpStatus> {
        return this.challengeService.removeChallenge(_id);
    }

    @Put(':_id')
    updateChallengeCard (
        @Param('_id') _id: ChallengeDto["_id"],
        @Body() updateChallengeCardDto: UpdateChallengeCardDto,
    ): Promise<IChallenge> {
        return this.challengeService.updateChallengeCard(_id, updateChallengeCardDto);
    }

    @Put(':_id')
    updateChallengeDetails (
        @Param('_id') _id: ChallengeDto["_id"],
        @Body() challengeDetailsDto: ChallengeDetailsDto,
    ): Promise<IChallenge> {
        return this.challengeService.updateChallengeDetails(_id, challengeDetailsDto);
    }

    @Put(':_id')
    updateChallengeContentProblem (
        @Param('_id') _id: ChallengeDto["_id"],
        @Body() contentProblem: ChallengeDto["content"]["contentProblem"],
    ): Promise<IChallenge> {
        return this.challengeService.updateChallengeContentProblem(_id, contentProblem);
    }

    @Put(':_id')
    updateChallengeContentCode (
        @Param('_id') _id: ChallengeDto["_id"],
        @Body() contentCode: ChallengeDto["content"]["contentCode"],
    ): Promise<IChallenge> {
        return this.challengeService.updateChallengeContentCode(_id, contentCode);
    }
}
