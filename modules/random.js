import { randomNumber } from '../helpers/random.js';
import { validate, evaluateValidation, validateResultObject } from '../helpers/validator.js';
import { generationResult, isBoolean, emptyObject } from '../helpers/utils.js';

function generateRandomNumbers(min, max, noDuplicates, sort, resultsCount) {
    let randomNumbers = [];

    if (noDuplicates) {
        let previousRandomNumbers = new Map();
        let i = 0;
    
        while (i < resultsCount) {
            let roll = randomNumber(min, max);
            if (!previousRandomNumbers.has(roll)) {
                previousRandomNumbers.set(roll, roll);
                i++;
            }
        }
        randomNumbers = Array.from(previousRandomNumbers.keys());
    } else {
        for (let count = 0; count < resultsCount; count++) {
            randomNumbers.push(randomNumber(min, max));
        }
    }

    return sort ? randomNumbers.sort((a, b) => a - b) : randomNumbers;
}

function validateAndGenerateRandomNumbers(options = emptyObject()) {

    const minParameter = options.min;
    const maxParameter = options.max;
    const noDuplicatesParameter = options.noDuplicates;
    const sortParameter = options.sort;
    const resultsCountParameter = options.resultsCount;

    const resultsCount = 1;
    const min = 1;
    const max = 1048576;
    const noDuplicates = false;
    const sort = false;

    let validateResultsCount = validate(resultsCountParameter, {
        rules: [
                {
                    "check": function (v) { return Number.isInteger(v); },
                    "message": "Only numbers between 1 and 100 are allowed as values for the query parameter 'resultsCount'. Example: https://hipstapas.dev/api/random?resultsCount=10"  
                },
                {
                    "check": function (v) { return v >= 1 && v <= 100; },
                    "message": "The value of the query parameter 'resultsCount' must be between 1 and 100. Example: https://hipstapas.dev/api/random?resultsCount=10"
                }
            ]
    }, resultsCount);

    let validateMin = validate(minParameter, {
        rules: [
                {
                    "check": function (v) { return Number.isInteger(v); },
                    "message": `Only numbers between ${min} and ${max} are allowed as values for the query parameter 'min'. Example: https://hipstapas.dev/api/random?min=10`
                },
                {
                    "check": function (v) { return v >= min && v <= max; },
                    "message": `The value of the query parameter 'min' must be between ${min} and ${max}. Example: https://hipstapas.dev/api/random?min=10`
                }
            ]
    }, min);

    let validateMax = validate(maxParameter, {
        rules: [
                {
                    "check": function (v) { return Number.isInteger(v); },
                    "message": `Only numbers between ${min} and ${max} are allowed as values for the query parameter 'max'. Example: https://hipstapas.dev/api/random?max=10`
                },
                {
                    "check": function (v) { return v >= min && v <= max; },
                    "message": `The value of the query parameter 'max' must be between ${min} and ${max}. Example: https://hipstapas.dev/api/random?max=10`
                }
            ]
    }, max);

    let validateNoDuplicates = validate(noDuplicatesParameter, {
        rules: [
                {
                    "check": function (v) { return isBoolean(v) },
                    "message": "Query parameter 'noDuplicates' is of type boolean and its value should be either 'true' or 'false'. Example: https://hipstapas.dev/api/random?noDuplicates=true"
                }
            ]
    }, noDuplicates);

    let validateSort = validate(sortParameter, {
        rules: [
                {
                    "check": function (v) { return isBoolean(v) },
                    "message": "Query parameter 'sort' is of type boolean and its value should be either 'true' or 'false'. Example: https://hipstapas.dev/api/random?sort=true"
                }
            ]
    }, sort);

    let validateResults = evaluateValidation([ validateResultsCount, validateMin, validateMax, validateNoDuplicates, validateSort ]);
    var results = [];

    if ((validateNoDuplicates.success && validateMax.success) && (validateNoDuplicates.value && (validateMax.value < validateResultsCount))) {
        validateResults = validateResultObject(false, null, "No duplicates is not possible, when max < results count")
    }

    if (validateResults.success) {    
        results = generateRandomNumbers(validateMin.value, validateMax.value, validateNoDuplicates.value, validateSort.value, validateResultsCount.value);
    }

    return generationResult(validateResults, results);
}


module.exports = { validateAndGenerateRandomNumbers }