/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { IEditor } from './interfaces';

@Injectable()
export class EditorService {

    async submitCodeToValidate(payload: IEditor) {
        const { _id, code } = payload;
        fs.writeFileSync('src/editor/editor.code.ts', `export default ${code}`)
        console.log('bad')
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const userFunction = require('./editor.code');
        const result = userFunction.default('space is really dark and cold');
        console.log('result user code', result);
        return result;
    }
}
