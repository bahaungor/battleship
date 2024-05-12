// const deneme = require('../src/module')
import { deneme } from "../src/module";

test('two plus two is four', () => {
    expect(deneme()).toBe('Deneme');
});