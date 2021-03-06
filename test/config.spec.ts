import test from 'ava';
import { Config } from '../lib/config';

let config: Config;
test.beforeEach(async t => {
    config = new Config('HRM_API');
});

// 测试基础方法

test('loadFile - get', async t => {
    const result = config.get('SERVER.PORT');
    const expection = '3000';
    t.is(result, expection);
});

test('loadFile - getOrThrow', async t => {
    const result = config.getOrThrow('SERVER.PORT');
    const expection = '3000';
    t.is(result, expection);
});

test('loadFile - getOrThrow[error]', async t => {
    t.throws(() => {
        config.getOrThrow('SERVER.PORT2');
    });
});

// 测试数据准确性

test('loadFile - get - validValue1', async t => {
    const result = config.get('SERVER.PORT');
    const expection = '3000';
    t.is(result, expection);
});

test('loadFile - get - validValue2', async t => {
    const result = config.get('SERVER.PORT3');
    const expection = '8080';
    t.is(result, expection);
});

test('loadFile - get - validValue3', async t => {
    const result = config.get('SERVER.FRONTEND_URL');
    const expection = 'http://www.a.com:8080';
    t.is(result, expection);
});