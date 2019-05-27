import { IConfig } from 'config';
import * as _ from 'lodash';

export function autoFindConfigDir(config: IConfig) {
    const locations = [
        config.util.loadFileConfigs('./config/'),
        config.util.loadFileConfigs('../config/'),
        config.util.loadFileConfigs('./'),
        config.util.loadFileConfigs('../'),
    ];
    for (const location of locations) {
        if (_.isEmpty(location)) continue;
        config.util.setModuleDefaults('main', location);
        break;
    }
}