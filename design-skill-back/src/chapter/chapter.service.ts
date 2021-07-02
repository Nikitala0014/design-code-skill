import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IChapter } from './interfaces/chapter.interface';
import { Chapter, ChapterDocument } from './schemas/chapter.schema';

@Injectable()
export class ChapterService {
    constructor(@InjectModel(Chapter.name) private chapterModel: Model<ChapterDocument>) {}

    async getAllChapters(): Promise<IChapter[]> {
        return this.chapterModel.find().exec();
    }

    async addChapter(chapter: IChapter): Promise<IChapter> {
        const { title, detail } = chapter;
        const createdChapter = new this.chapterModel({title, detail});
        return createdChapter.save();
    }
}
