import * as clc from 'cli-color';

const WARN = clc.yellow;

export class Logger {
    static warn(context: any) {
        console.log(WARN(context));
    }
}
