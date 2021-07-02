import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChapterDocument = Chapter & Document;

@Schema()
export class Chapter {
    @Prop()
    title: string;

    @Prop()
    detail: string;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);