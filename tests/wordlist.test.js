const utils = require('../helpers/utils')
const { wordlist } = require('../index')

describe('wordlist generation', () => {
    describe('no object options', () => {
        const wordlistWithDefaultOptions = wordlist()
        test('property success is true', () => {
            expect(wordlistWithDefaultOptions.success).toBe(true)
        })
        test('result is of type array', () => {
            expect(Array.isArray(wordlistWithDefaultOptions.result)).toBe(true)
        })
        test('result is of type string', () => {
            expect(utils.isString(wordlistWithDefaultOptions.result[0])).toBe(true)
        })
        test('result is containing 6 words', () => {
            expect(wordlistWithDefaultOptions.result[0].split(' ').length).toBe(6)
        })
    })
})

/// to be extended