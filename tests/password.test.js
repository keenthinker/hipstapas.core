const utils = require('../helpers/utils')
const { password } = require('../index')

describe('password generation', () => {
    describe('no object options', () => {
        const passwordWithDefaultOptions = password()
        test('property success is true', () => {
            expect(passwordWithDefaultOptions.success).toBe(true)
        })
        test('result is of type string', () => {
            expect(utils.isString(passwordWithDefaultOptions.result)).toBe(true)
        })
        test('result length is within default range', () => {
            expect(passwordWithDefaultOptions.result.length).toBeGreaterThanOrEqual(16)
            expect(passwordWithDefaultOptions.result.length).toBeLessThanOrEqual(32)
        })
    })
})

/// to be extended