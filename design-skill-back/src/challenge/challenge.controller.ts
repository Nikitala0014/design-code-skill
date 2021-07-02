import { Controller, Body, Get, Post } from '@nestjs/common';

import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
// import { ChallengeDto } from './dto/challenge.dto'
import { ChapterDto } from 'src/chapter/dto/chapter.dto';

@Controller('challenge')
export class ChallengeController {
    constructor(private readonly challengeService: ChallengeService) {}

    @Get()
    getChallengesByChapterId(@Body() {_id}: ChapterDto) {
        return this.challengeService.gelChallengesByChapterId(_id);
    }

    @Post()
    addChallenge(@Body() createChallengeDto: CreateChallengeDto) {
        return this.challengeService.addChallenge(createChallengeDto);
    }
}
