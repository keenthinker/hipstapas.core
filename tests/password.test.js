const utils = require('../helpers/utils')
const { password } = require('../index')

describe('password generation', () => {
    describe('no object options', () => {
        const passwordWithDefaultOptions = password()
        test('property success is true', () => {
            expect(passwordWithDefaultOptions.success).toBe(true)
        })
        test('result is of type array', () => {
            expect(Array.isArray(passwordWithDefaultOptions.result)).toBe(true)
        })
        test('result is of type string', () => {
            expect(utils.isString(passwordWithDefaultOptions.result[0])).toBe(true)
        })
        test('result length is within default range', () => {
            expect(passwordWithDefaultOptions.result[0].length).toBeGreaterThanOrEqual(16)
            expect(passwordWithDefaultOptions.result[0].length).toBeLessThanOrEqual(32)
        })
    })
})

/// to be extended