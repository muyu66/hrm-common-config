import * as _ from 'lodash';
import * as config from 'config';
import { Logger } from './util/logger.util';

export class Config {

    private envKey(key: string) {
        return _.replace(key, /\./g, '_');
    }

    public get(key: string): any {
        try {
            const value = process.env[this.envKey(key)];
            if (value != undefined) return value;
            return config.get(key);
        } catch (e) {
            Logger.warn(`无法读取 ${key} 的配置, 使用默认项或跳过`);
            return undefined;
        }
    }

    public getOrThrow(key: string): any {
        const value = process.env[this.envKey(key)];

        if (value != undefined) {
            return process.env[this.envKey(key)];
        } else {
            if (!config.has(key)) {
                Logger.warn(`无法读取 ${key} 的配置`);
                throw Error(`配置读取失败`);
            }
            return config.get(key);
        }
    }

}

export const ConfigStatic = new Config();