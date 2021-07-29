import { Controller, Body, Get, Post, Delete, Put, HttpStatus, Param } from '@nestjs/common';

import { ChallengeService } from './challenge.service';
import {
    ChallengeDto,
    CreateChallengeDto,
    UpdateChallengeCardDto,
    ChallengeDetailsDto,
    ChallengeSubmitedCodeDto,
    ChallengeContentCodeDto,
    ChallengeContentProblemDto,
    ChallengeContentEditorialDto,
} from './dto'
import { IChallenge } from './interfaces';

@Controller('challenges')
export class ChallengeController {
    constructor(private readonly challengeService: ChallengeService) {}

    @Get('fetchChallenges/:chapterId')
    async getChallengesByChapterId (
        @Param('chapterId') chapterId: string
    ): Promise<{chapterId: string, challenges: IChallenge[]}> {
        return {
            chapterId: chapterId,
            challenges: await this.challengeService.gelChallengesByChapterId(chapterId)
        };
    }

    @Post('saveNewChallenge')
    async addChallenge (@Body() createChallengeDto: CreateChallengeDto): Promise<IChallenge> {
        return await this.challengeService.addChallenge(createChallengeDto);
    }

    @Post('valideSubmitedCode')
    valideSubmitedCode (@Body() challengeSubmitedCodeDto: ChallengeSubmitedCodeDto) {
        return this.challengeService.valideSubmitedCode(challengeSubmitedCodeDto);
    }

    @Put('saveEditContentProblem/:_id')
    saveEditContentProblem (
        @Param('_id') _id: ChallengeDto["_id"],
        @Body() contentProblemDto: ChallengeContentProblemDto,
    ): Promise<IChallenge> {
        const { contentProblem } = contentProblemDto;
        return this.challengeService.saveEditContentProblem({_id, contentProblem})
    }

    @Put('saveEditContentCode/:_id')
    saveEditContentCode (
        @Param('_id') _id: ChallengeDto["_id"],
        @Body() contentCodeDto: ChallengeContentCodeDto,
    ): Promise<IChallenge> {
        const { contentCode } = contentCodeDto;
        return this.challengeService.saveEditContentCode({_id, contentCode})
    }

    @Put('saveEditContentEditorial/:_id')
    saveEditContentEditorial (
        @Param('_id') _id: ChallengeDto["_id"],
        @Body() contentEditorialDto: ChallengeContentEditorialDto,
    ): Promise<IChallenge> {
        const { contentEditorial } = contentEditorialDto;
        return this.challengeService.saveEditContentEditorial({_id, contentEditorial})
    }

    @Delete('removeChallenge/:_id')
    removeChallenge (@Param('_id') _id: ChallengeDto["_id"]): Promise<HttpStatus> {
        return this.challengeService.removeChallenge(_id);
    }

    @Put('updateChallengeCard/:_id')
    updateChallengeCard (
        @Param('_id') _id: ChallengeDto["_id"],
        @Body() updateChallengeCardDto: UpdateChallengeCardDto,
    ): Promise<IChallenge> {
        return this.challengeService.updateChallengeCard(_id, updateChallengeCardDto);
    }

    @Put('updateChallengesDetails/:_id')
    updateChallengeDetails (
        @Param('_id') _id: ChallengeDto["_id"],
        @Body() challengeDetailsDto: ChallengeDetailsDto,
    ): Promise<IChallenge> {
        return this.challengeService.updateChallengeDetails(_id, challengeDetailsDto);
    }
}
