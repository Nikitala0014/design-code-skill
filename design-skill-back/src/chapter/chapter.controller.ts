import { Controller, Body, Post, Get, Delete, Put } from '@nestjs/common';

import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterCardDto } from './dto/update-chapter-card.dto';

@Controller('chapter')
export class ChapterController {
    constructor(private chapterService: ChapterService) {}

    @Get()
    getChapters() {
        return this.chapterService.getChapters();
    }

    @Post()
    addChapter(@Body() createChapterDto: CreateChapterDto) {
        return this.chapterService.addChapter(createChapterDto);
    }

    @Delete()
    removeChapter(@Body() chapterId: string) {
        return this.chapterService.removeChapter(chapterId)
    }

    @Put()
    updateChapterCard(@Body() updateChapterCardDto: UpdateChapterCardDto) {
        return this.chapterService.updateChapterCard(updateChapterCardDto);
    }
}
