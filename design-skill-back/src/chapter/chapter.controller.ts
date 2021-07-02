import { Controller, Body, Post, Get } from '@nestjs/common';

import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';

@Controller('chapter')
export class ChapterController {
    constructor(private chapterService: ChapterService) {}

    @Get()
    getAllChapters() {
        return this.chapterService.getAllChapters();
    }

    @Post()
    addChapter(@Body() createChapterDto: CreateChapterDto) {
        return this.chapterService.addChapter(createChapterDto);
    }
}
