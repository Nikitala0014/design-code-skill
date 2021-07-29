import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UpdateChapterCardDto } from './dto/update-chapter-card.dto';
import { IChapter } from './interfaces/chapter.interface';
import { Chapter, ChapterDocument } from './schemas/chapter.schema';
import { ChapterKeys } from './constants';
import { CreateChapterDto } from './dto/create-chapter.dto';

@Injectable()
export class ChapterService {
    constructor(@InjectModel(Chapter.name) private chapterModel: Model<ChapterDocument>) {}

    async getChapters(): Promise<IChapter[]> {
        return this.chapterModel.find().exec();
    }

    async addChapter(chapter: CreateChapterDto): Promise<IChapter> {
        const createdChapter = new this.chapterModel(chapter);
        return await createdChapter.save();
    }

    async removeChapter(chapterId: string): Promise<string> {
        await this.chapterModel.findByIdAndDelete(chapterId);
        return chapterId;
    }

    async updateChapterCard(updateChapterCardDto: UpdateChapterCardDto) {
        const { _id, field, value } = updateChapterCardDto;
        return field === ChapterKeys.TITLE 
            ? await this.chapterModel.findByIdAndUpdate({_id, title: value})
            : await this.chapterModel.findByIdAndUpdate({_id, detail: value}); 
    }
}
