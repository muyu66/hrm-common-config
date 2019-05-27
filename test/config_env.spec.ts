import test from 'ava';
import { Config } from '../lib/config';

let config: Config;
test.beforeEach(async t => {
    config = new Config('HRM_API');
    process.env = {
        COMMON_SERVER_URL: 'http://127.0.0.1:80',
        COMMON_SERVER_PORT: '80',
        COMMON_SERVER_DEBUG: '1',
        COMMON_SERVER_PORT3: '8080',

        HRM_API_SERVER_URL: 'http://127.0.0.1:3050',
        HRM_API_SERVER_PORT: '3050',
        HRM_API_SERVER_DEBUG: '1',
        HRM_API_SERVER_FRONTEND_URL: 'http://www.a.com:8080',
    };
});

// 测试基础方法

test('loadEnv - get', async t => {
    const result = config.get('SERVER.PORT');
    const expection = '3050';
    t.is(result, expection);
});

test('loadEnv - getOrThrow', async t => {
    const result = config.getOrThrow('SERVER.PORT');
    const expection = '3050';
    t.is(result, expection);
});

test('loadEnv - getOrThrow[error]', async t => {
    t.throws(() => {
        config.getOrThrow('SERVER.PORT2');
    });
});

// 测试数据准确性

test('loadEnv - get - validValue1', async t => {
    const result = config.get('SERVER.PORT');
    const expection = '3050';
    t.is(result, expection);
});

test('loadEnv - get - validValue2', async t => {
    const result = config.get('SERVER.PORT3');
    const expection = '8080';
    t.is(result, expection);
});

test('loadEnv - get - validValue3', async t => {
    const result = config.get('SERVER.FRONTEND_URL');
    const expection = 'http://www.a.com:8080';
    t.is(result, expection);
});