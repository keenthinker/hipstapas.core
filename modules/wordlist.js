import { randomNumber } from '../helpers/random.js';
import { validate, evaluateValidation } from '../helpers/validator.js';
import { wordlistLargeMap } from '../helpers/wordlistLarge.js';
import { generationResult, emptyObject } from '../helpers/utils.js';

function generateWordlist(rolls) {
    // generate words the EFF way: https://www.eff.org/de/dice
    let words = [];
    let previousRolls = new Map();
    var i = 0;

    while (i < rolls) {
        var roll1 = randomNumber(1, 6);
        var roll2 = randomNumber(1, 6);
        var roll3 = randomNumber(1, 6);
        var roll4 = randomNumber(1, 6);
        var roll5 = randomNumber(1, 6);
        // Just to be sure there are no duplicates,
        // check that every new roll does not match previous ones! 
        let roll = `${roll1}${roll2}${roll3}${roll4}${roll5}`;
        if (!previousRolls.has(roll)) {
            previousRolls.set(roll, roll);
            words.push(wordlistLargeMap.get(roll));
            i++;
        }
    }
    
    return words.join(' ');
}

function generateWordlists(resultsCount, rolls) {
    let wordlists = []
    for (let count = 0; count < resultsCount; count++) {
        wordlists.push(generateWordlist(rolls));
    }
    
    return wordlists;
}

function validateAndGenerateWordlists(options = emptyObject()) {

    const resultsCountParameter = options.resultsCount;
    const wordsParameter = options.words;

    const minWordsCount = 1;
    const maxWordsCount = 50;

    const resultsCount = 1;
    const words = 6;  // generate 6 words by (EFF) default

    var validateWordsCount = validate(wordsParameter, {
        rules: [
                {
                    "check": function (v) { return Number.isInteger(v); },
                    "message": `Only numbers between ${minWordsCount} and ${maxWordsCount} are allowed as values for the query parameter 'words'. Example: https://hipstapas.dev/api/wordlist?words=10`  
                },
                {
                    "check": function (v) { return v >= minWordsCount && v <= maxWordsCount; },
                    "message": `The value of the query parameter 'words' must be between ${minWordsCount} and ${maxWordsCount}. Example: https://hipstapas.dev/api/wordlist?words=10`
                }
            ]
        }, words);

    var validateResultsCount = validate(resultsCountParameter, {
        rules: [
                {
                    "check": function (v) { return Number.isInteger(v); },
                    "message": "Only numbers between 1 and 100 are allowed as values for the query parameter 'resultsCount'. Example: https://hipstapas.dev/api/wordlist?resultsCount=10"  
                },
                {
                    "check": function (v) { return v >= 1 && v <= 100; },
                    "message": "The value of the query parameter 'resultsCount' must be between 1 and 100. Example: https://hipstapas.dev/api/wordlist?resultsCount=10"
                }
            ]
    }, resultsCount);

    const validateResults = evaluateValidation([ validateResultsCount, validateWordsCount ]);
    var results = [];
    if (validateResults.success) {
        results = generateWordlists(validateResultsCount.value, validateWordsCount.value);
    }

    return generationResult(validateResults, results);
}

module.exports = { validateAndGenerateWordlists }