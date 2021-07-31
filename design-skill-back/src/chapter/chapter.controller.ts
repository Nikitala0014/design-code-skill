import { 
    Controller, 
    Body, 
    Post, 
    Get, 
    Delete, 
    Put, 
    UseGuards, 
    Param, 
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { IChapter } from './interfaces/chapter.interface';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterCardDto } from './dto/update-chapter-card.dto';

@Controller('chapters')
export class ChapterController {
    constructor(private chapterService: ChapterService) {}

    @UseGuards(JwtAuthGuard)
    @Get('fetchChapters')
    getChapters() {
        return this.chapterService.getChapters();
    }

    @Post('saveNewChapter')
    async addChapter(@Body() createChapterDto: CreateChapterDto) {
        return await this.chapterService.addChapter(createChapterDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('saveEditChapterCard/:_id')
    async saveEditChapterCard (
        @Param('_id') _id: string,
        @Body() items: string[],
    ): Promise<IChapter> {
        return this.chapterService.saveEditChapterCard({_id, items})
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
