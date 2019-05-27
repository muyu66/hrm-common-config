安装
npm install hrm-common-config

使用
import { Config } from 'hrm-common-config';
const config = new Config('XXX_API', options);
const value = config.get('SERVER.MQ.PORT')

配置
options
env: boolean // 是否支持读取env, 默认true

自动发现 (文件名规则遵循config包)
1. 优先搜索项目目录下的 config/* // 项目目录等同于 process.pwd()
2. 再搜索项目目录上一级的 config/*
3. 再搜索项目目录下的 ./*
4. 再搜索项目目录上一级的 ./*

方法
1. get(key: string): string | undefined // 根据key获取值
2. getOrThrow(key: string): string // 根据key获取值, 如果值未被设置, 则直接报错(Error)

策略
1. 优先读取 process.env
