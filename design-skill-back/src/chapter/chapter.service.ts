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

    async saveEditChapterCard(payload: {_id, items}): Promise<IChapter> {
        const { _id, items } = payload;
        const [ name, value ] = [items[0], items[1]];
        console.log('name', name);
        console.log('value', value);
        
        switch (name) {
            case 'chapter-title':
                return await this.chapterModel.findByIdAndUpdate(_id, {title: value}, {new: true});
            case 'chapter-detail':
                return await this.chapterModel.findByIdAndUpdate(_id, {detail: value}, {new: true});
            default:
                break;
        }
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
