const utils = require('../helpers/utils')
const { uuid } = require('../index')

describe('uuid generation', () => {
    describe('no object options', () => {
        const uuidWithDefaultOptions = uuid()
        test('property success is true', () => {
            expect(uuidWithDefaultOptions.success).toBe(true)
        })
        test('result is of type string', () => {
            expect(utils.isString(uuidWithDefaultOptions.result)).toBe(true)
        })
        test('result length is 36 characters', () => {
            expect(uuidWithDefaultOptions.result.length).toBe(36)
        })
    })

    describe('empty object options', () => {
        const uuidWithDefaultOptions = uuid({})
        test('property success is true', () => {
            expect(uuidWithDefaultOptions.success).toBe(true)
        })
        test('result is of type string', () => {
            expect(utils.isString(uuidWithDefaultOptions.result)).toBe(true)
        })
        test('result length is 36 characters', () => {
            expect(uuidWithDefaultOptions.result.length).toBe(36)
        })
    })

    describe('object options: resultsCount = 1', () => {
        const uuidWithDefaultOptions = uuid({
            resultsCount: 1
        })
        test('property success is true', () => {
            expect(uuidWithDefaultOptions.success).toBe(true)
        })
        test('result is of type string', () => {
            expect(utils.isString(uuidWithDefaultOptions.result)).toBe(true)
        })
        test('result is of type string', () => {
            expect(utils.isString(uuidWithDefaultOptions.result)).toBe(true)
        })
        test('result length is 36 characters', () => {
            expect(uuidWithDefaultOptions.result.length).toBe(36)
        })
    })

    describe('object options: resultsCount = 5', () => {
        const optionResultsCount = 5
        const uuidWithDefaultOptions = uuid({
            resultsCount: optionResultsCount
        })
        test('property success is true', () => {
            expect(uuidWithDefaultOptions.success).toBe(true)
        })
        test('result is of type array', () => {
            expect(Array.isArray(uuidWithDefaultOptions.result)).toBe(true)
        })
        test('result array length is 36 characters', () => {
            expect(uuidWithDefaultOptions.result.length).toBe(optionResultsCount)
        })
    })

    describe('correct format', () => {
        const uuidWithDefaultOptions = uuid()
        test('result contains 4 hyphens', () => {
            const pattern = /\-/g
            const matchResult = uuidWithDefaultOptions.result.match(pattern)
            expect(Array.isArray(matchResult)).toBe(true)
            expect(matchResult.length).toBe(4)
            expect(matchResult[0]).toBe('-')
            expect(matchResult[1]).toBe('-')
            expect(matchResult[2]).toBe('-')
            expect(matchResult[3]).toBe('-')
        })
    })

    describe('correct validation', () => {
        test('value of parameter resultsCount is too large', () => {
            const uuidWithDefaultOptions = uuid({
                resultsCount: 1000
            })
            expect(uuidWithDefaultOptions.success).toBe(false)
            expect(uuidWithDefaultOptions.error.length).toBeGreaterThan(0)
            expect(Array.isArray(uuidWithDefaultOptions.result)).toBe(true)
            expect(uuidWithDefaultOptions.result.length).toBe(0)
        })
        test('value of parameter resultsCount is not numeric', () => {
            const uuidWithDefaultOptions = uuid({
                resultsCount: "1"
            })
            expect(uuidWithDefaultOptions.success).toBe(false)
            expect(uuidWithDefaultOptions.error.length).toBeGreaterThan(0)
            expect(Array.isArray(uuidWithDefaultOptions.result)).toBe(true)
            expect(uuidWithDefaultOptions.result.length).toBe(0)
        })
    })
})
