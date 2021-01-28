const { random } = require('../index')

describe('random generation', () => {
    describe('no object options', () => {
        const randomWithDefaultOptions = random()
        test('property success is true', () => {
            expect(randomWithDefaultOptions.success).toBe(true)
        })
        test('result is of type int', () => {
            expect(Number.isInteger(randomWithDefaultOptions.result)).toBe(true)
        })
        test('result is within default range', () => {
            expect(randomWithDefaultOptions.result).toBeGreaterThanOrEqual(1)
            expect(randomWithDefaultOptions.result).toBeLessThanOrEqual(1048576)
        })
    })
})

/// to be extended