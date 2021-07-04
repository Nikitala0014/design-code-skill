/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Body, Param, Post, Get } from '@nestjs/common';

import { EditorService } from './editor.service';
import { EditorDto } from './dto';

@Controller('editor')
export class EditorController {
    constructor (private editorService: EditorService) {}

    @Post('submitCodeToValidate/:_id')
    submitCodeToValidate(
        @Param('_id') _id: string,
        @Body() editorDto: EditorDto
    ) {
        const { code } = editorDto;
        console.log('result: ', code);
        return this.editorService.submitCodeToValidate({_id, code});
    }
}
