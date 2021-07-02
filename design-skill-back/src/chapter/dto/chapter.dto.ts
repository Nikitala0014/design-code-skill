import { ObjectId } from "mongoose";

export class ChapterDto {
    readonly _id: ObjectId;
    readonly title: string;
    readonly detail: string;
}