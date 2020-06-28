import assert from 'assert';

describe('POC Firebase Unit Testing App', () => {
    it('Understands basic addition', () => {
        assert.strictEqual(2 + 3, 5);
    });
    it('Test fails', () => {
        assert.strictEqual(2 + 2, 5);
    });
});
