安装
npm install hrm-common-config

使用
import { Config } from 'hrm-common-config';
const config = new Config('XXX_API');
const value = config.get('SERVER.MQ.PORT')

方法
1. get(key: string): string | undefined // 根据key获取值
2. getOrThrow(key: string): string // 根据key获取值, 如果值未被设置, 则直接报错(Error)

策略
1. 优先读取 process.env
2. 优先读取基于根目录的 config/* (采用config一致策略, npm install config)
3. 如果根目录没有符合config策略的文件, 则目录往上再找一级
