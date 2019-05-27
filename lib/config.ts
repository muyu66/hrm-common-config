import * as _ from 'lodash';
import * as config from 'config';
import { Logger } from './util/logger.util';
import { IConfigOption } from './interface/config.interface';
import { autoFindConfigDir } from './auto_find';

const NAMESPACE = 'main';

export class Config {

    private readonly projectId: string;
    private readonly options: IConfigOption;

    constructor(projectId: string, options: IConfigOption = { env: true }) {
        if (projectId == null) throw Error('Config: 缺乏指定项目ID, 错误的构造方式');
        this.projectId = projectId;
        this.options = options;
        autoFindConfigDir(config);
    }

    private getEnv(key: string): string | undefined {
        if (!this.options.env) return undefined;
        if (key == null) throw Error('Config: 缺乏指定具体KEY, 错误的传参方式');
        return process.env[this.envKey(`${this.projectId}.${key}`)] || process.env[this.envKey(`COMMON.${key}`)];
    }

    private getConfig(key: string): string | undefined {
        if (key == null) throw Error('Config: 缺乏指定具体KEY, 错误的传参方式');
        try {
            return config.get(`${NAMESPACE}.${this.projectId}.${key}`) as string | undefined;
        } catch {
            return config.get(`${NAMESPACE}.COMMON.${key}`) as string | undefined;
        }
    }

    private envKey(key: string) {
        return _.replace(key, /\./g, '_');
    }

    public get(key: string): string | undefined {
        try {
            const value = this.getEnv(key);
            if (value != undefined) return value;
            return this.getConfig(key);
        } catch (e) {
            Logger.warn(`无法读取 ${key} 的配置, 使用默认项或跳过`);
            return undefined;
        }
    }

    public getOrThrow(key: string): string {
        const value = this.getEnv(key);

        if (value != undefined) {
            return value;
        } else {
            const configValue = this.getConfig(key);
            if (configValue == null) {
                Logger.warn(`无法读取 ${key} 的配置`);
                throw Error(`配置读取失败`);
            }
            return configValue;
        }
    }

}
