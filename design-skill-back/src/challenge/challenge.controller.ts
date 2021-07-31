import { 
    Controller, 
    Body, 
    Get, 
    Post,
    Delete, 
    Put, 
    HttpStatus, 
    Param, 
    UseGuards 
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @Get('fetchChallenges/:chapterId')
    async getChallengesByChapterId (
        @Param('chapterId') chapterId: string
    ): Promise<{chapterId: string, challenges: IChallenge[]}> {
        return {
            chapterId: chapterId,
            challenges: await this.challengeService.getChallengesByChapterId(chapterId)
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('fetchChallengesByChapterName/:chapterName')
    async getChallengesByChapterName (
        @Param('chapterName') chapterName: string
    ): Promise<IChallenge[]> {
        return this.challengeService.getChallengesByChapterName(chapterName)
    }

    @UseGuards(JwtAuthGuard)
    @Post('saveNewChallenge')
    async addChallenge (@Body() createChallengeDto: CreateChallengeDto): Promise<IChallenge> {
        return await this.challengeService.addChallenge(createChallengeDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('valideSubmitedCode')
    valideSubmitedCode (@Body() challengeSubmitedCodeDto: ChallengeSubmitedCodeDto) {
        return this.challengeService.valideSubmitedCode(challengeSubmitedCodeDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('saveEditContentProblem/:_id')
    saveEditContentProblem (
        @Param('_id') _id: ChallengeDto["_id"],
        @Body() contentProblemDto: ChallengeContentProblemDto,
    ): Promise<IChallenge> {
        const { contentProblem } = contentProblemDto;
        return this.challengeService.saveEditContentProblem({_id, contentProblem})
    }

    @UseGuards(JwtAuthGuard)
    @Put('saveEditContentCode/:_id')
    saveEditContentCode (
        @Param('_id') _id: ChallengeDto["_id"],
        @Body() contentCodeDto: ChallengeContentCodeDto,
    ): Promise<IChallenge> {
        const { contentCode } = contentCodeDto;
        return this.challengeService.saveEditContentCode({_id, contentCode})
    }

    @UseGuards(JwtAuthGuard)
    @Put('saveEditContentEditorial/:_id')
    saveEditContentEditorial (
        @Param('_id') _id: ChallengeDto["_id"],
        @Body() contentEditorialDto: ChallengeContentEditorialDto,
    ): Promise<IChallenge> {
        const { contentEditorial } = contentEditorialDto;
        return this.challengeService.saveEditContentEditorial({_id, contentEditorial})
    }

    @UseGuards(JwtAuthGuard)
    @Put('saveEditChallengeCard/:_id')
    saveEditChallengeCard(
        @Param('_id') _id: string,
        @Body() items: string[]
    ): Promise<IChallenge> {
        console.log('work', items)
        return this.challengeService.saveEditChallengeCard({_id, items});
    }

    @UseGuards(JwtAuthGuard)
    @Delete('removeChallenge/:_id')
    removeChallenge (@Param('_id') _id: ChallengeDto["_id"]): Promise<HttpStatus> {
        return this.challengeService.removeChallenge(_id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('updateChallengeCard/:_id')
    updateChallengeCard (
        @Param('_id') _id: ChallengeDto["_id"],
        @Body() updateChallengeCardDto: UpdateChallengeCardDto,
    ): Promise<IChallenge> {
        return this.challengeService.updateChallengeCard(_id, updateChallengeCardDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('updateChallengesDetails/:_id')
    updateChallengeDetails (
        @Param('_id') _id: ChallengeDto["_id"],
        @Body() challengeDetailsDto: ChallengeDetailsDto,
    ): Promise<IChallenge> {
        return this.challengeService.updateChallengeDetails(_id, challengeDetailsDto);
    }
}
