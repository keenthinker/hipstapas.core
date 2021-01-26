const { v4: uuidv4 } = require('uuid');
import { validate } from '../helpers/validator.js';
import { generationResult, emptyObject } from '../helpers/utils.js';

function generateUuids(resultsCount)
{
    let uuids = [];
    for (let count = 0; count < resultsCount; count++) {
        uuids.push(uuidv4());
    }

    return uuids;
}

/**
 * Validate the input and generate UUIDs using the passed 
 * configuration or use the default configuration values if an option is missing 
 * @param {*} options 
 */
function validateAndGenerateUuids(options = emptyObject()) {
    const resultsCountParameter = options.resultsCount;
    const resultsCount = 1;
    let validateResultsCount = validate(resultsCountParameter, {
        rules: [
                {
                    "check": function (v) { return Number.isInteger(v); },
                    "message": "Only numbers between 1 and 100 are allowed as values for the query parameter 'resultsCount'. Example: https://hipstapas.dev/api/uuid?resultsCount=10"  
                },
                {
                    "check": function (v) { return v >= 1 && v <= 100; },
                    "message": "The value of the query parameter 'resultsCount' must be between 1 and 100. Example: https://hipstapas.dev/api/uuid?resultsCount=10"
                }
            ]
    }, resultsCount);

    var results = [];
    if (validateResultsCount.success) {
        results = generateUuids(validateResultsCount.value);
    }

    return generationResult(validateResultsCount, results);
}

module.exports = { validateAndGenerateUuids }