import test from 'ava';
import { Config } from '../lib/config';

let config: Config;
test.beforeEach(async t => {
    config = new Config();
});

test('loadFile - get', async t => {
    const result = config.get('COMMON.SERVER.PORT');
    const expection = '80';
    t.is(result.state, expection);
});

test('loadFile - getOrThrow', async t => {
    const result = config.getOrThrow('COMMON.SERVER.PORT');
    const expection = '80';
    t.is(result.state, expection);
});

test('loadFile - getOrThrow[error]', async t => {
    t.throws(() => {
        const result = config.getOrThrow('COMMON.SERVER.PORT2');
    });
});