import { Controller, Body, Get, Post, Delete, Put, HttpStatus } from '@nestjs/common';

import { ChallengeService } from './challenge.service';
import { 
    ChallengeDto, 
    CreateChallengeDto,
    UpdateChallengeCardDto,
    ChallengeDetailsDto,
    ChallengeContentProblemDto,
    ChallengeContentCodeDto,
} from './dto'
import { ChapterDto } from 'src/chapter/dto/chapter.dto';
import { IChallenge } from './interfaces';

@Controller('challenge')
export class ChallengeController {
    constructor(private readonly challengeService: ChallengeService) {}

    @Get()
    getChallengesByChapterId (@Body() {_id}: ChapterDto): Promise<IChallenge[]> {
        return this.challengeService.gelChallengesByChapterId(_id);
    }

    @Post()
    addChallenge (@Body() createChallengeDto: CreateChallengeDto): Promise<IChallenge> {
        return this.challengeService.addChallenge(createChallengeDto);
    }

    @Delete()
    removeChallenge (@Body() { _id }: ChallengeDto): Promise<HttpStatus> {
        return this.challengeService.removeChallenge(_id);
    }

    @Put()
    updateChallengeCard (
        @Body() challengeCardDto: UpdateChallengeCardDto
    ): Promise<IChallenge> {
        return this.challengeService.updateChallengeCard(challengeCardDto);
    }

    @Put()
    updateChallengeDetails (
        @Body() challengeDetailsDto: ChallengeDetailsDto,
    ): Promise<IChallenge> {
        return this.challengeService.updateChallengeDetails(challengeDetailsDto);
    }

    @Put()
    updateChallengeContentProblem (
        @Body() contentProblemDto: ChallengeContentProblemDto,
    ): Promise<IChallenge> {
        return this.challengeService.updateChallengeContentProblem(contentProblemDto);
    }

    @Put()
    updateChallengeContentCode (
        @Body() contentCodeDto: ChallengeContentCodeDto,
    ): Promise<IChallenge> {
        return this.challengeService.updateChallengeContentCode(contentCodeDto);
    }
}
