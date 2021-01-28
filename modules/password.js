const { randomNumber, randomCharacter } = require('../helpers/random');
const { validate, evaluateValidation } = require('../helpers/validator');
const { generationResult, isBoolean, emptyObject } = require('../helpers/utils');

/**
 * Validates and calculates the upper and the lower bound for the generator function 
 * regarding the specified min and max values
 * @param {!number} lmin 
 * @param {!number} lmax
 * @return {{ lower: !number, upper: !number }} 
 */
function calculateLowerAndUpperBound(lmin, lmax) {
  let randomUpperBound = 251;
  
  let lowerBound = 0;
  let upperBound = 0;
  let minLength = lmin;
  // force min length to be always smaller or equal to max length.
  let maxLength = Math.max(minLength, lmax);
  // 
  if ((minLength <= 0) && (maxLength <= 0))
  {
    lowerBound = randomNumber(1, randomUpperBound);
    upperBound = Math.max(lowerBound, randomNumber(1, randomUpperBound));
  }
  else if ((minLength <= 0) && (maxLength > 0))
  {
    lowerBound = randomNumber(1, maxLength);
    upperBound = randomNumber(lowerBound, maxLength);
  }
  else if ((minLength > 0) && (maxLength <= 0))
  {
    lowerBound = minLength;
    upperBound = randomNumber(minLength, randomUpperBound);
  }
  else
  {
    lowerBound = randomNumber(minLength, maxLength);
    var max = Math.max(lowerBound, maxLength);
    upperBound = randomNumber(lowerBound, max);
  }

  return { "lower": lowerBound, "upper": upperBound };
}

function generatePhrase(alphabet, lengthMin, lengthMax) {
  let text = [];
  var bounds = calculateLowerAndUpperBound(lengthMin, lengthMax);
  let lowerBound = bounds.lower;
  for (let i = 0; i < lowerBound; i++) {
    text.push(randomCharacter(alphabet));
  }
  while (lowerBound < bounds.upper) {
    text.push(randomCharacter(alphabet));
    lowerBound++;
  }
  return text.join('');
}

/**
 * Generates a random string considering the specified options
 * @param {Object} options 
 */
function generate(options) {
  let lengthMin = options.lengthMin;
  let lengthMax = options.lengthMax;
  let resultsCount = options.resultsCount;
  let includeAlphabetSmall = options.alphabetSmall;
  let includeAlphabetCapital = options.alphabetCapital;
  let includeAlphabetNumber = options.alphabetNumber;
  let includeAlphabetSpecial = options.alphabetSpecial;

  const alphabetSmall = "abcdefghijklmnopqrstuvwxyz";
  const alphabetCapital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphabetNumber = "0123456789";
  const alphabetSpecial = ".,+-*/!?;:{}()[]%$&~#@|";

  let alphabet = "";
  
  if (includeAlphabetSmall) {
    alphabet += alphabetSmall;
  }
  if (includeAlphabetCapital) {
    alphabet += alphabetCapital;
  }
  if (includeAlphabetNumber) {
    alphabet += alphabetNumber;
  }
  if (includeAlphabetSpecial) {
    alphabet += alphabetSpecial;
  }

  let passPhrases = [];
  for (let count = 0; count < resultsCount; count++) {
    passPhrases.push(generatePhrase(alphabet, lengthMin, lengthMax));
  }

  return passPhrases;
}

function validateAndGeneratePassphrases(options = emptyObject()) {
  const resultsCount = 1;
  const lengthMin = 16;
  const lengthMax = 32;
  const alphabetSmall = true;
  const alphabetCapital = true;
  const alphabetNumber = true;
  const alphabetSpecial = true;

  var validateLengthMin = validate(options.lengthMin, {
    rules: [
      {
        "check": function (v) { return Number.isInteger(v); },
        "message": "Only numbers between 1 and 2048 are allowed as values for the query parameter 'lengthMin'. Example: https://hipstapas.dev/api/?lengthMin=10"  
      },
      {
        "check": function (v) { return v >= 1 && v <= 2048; },
        "message": "The value of the query parameter 'lengthMin' must be between 1 and 2048. Example: https://hipstapas.dev/api/?lengthMin=10"
      }
    ]
  }, lengthMin);

  var validateLengthMax = validate(options.lengthMax, {
    rules: [
      {
        "check": function (v) { return Number.isInteger(v); },
        "message": "Only numbers between 1 and 2048 are allowed as values for the query parameter 'lengthMax'. Example: https://hipstapas.dev/api/?lengthMax=10"  
      },
      {
        "check": function (v) { return v >= 1 && v <= 2048; },
        "message": "The value of the query parameter 'lengthMax' must be between 1 and 2048. Example: https://hipstapas.dev/api/?lengthMax=10"
      }
    ]
  }, lengthMax);

  var validateResultsCount = validate(options.resultsCount, {
    rules: [
      {
        "check": function (v) { return Number.isInteger(v); },
        "message": "Only numbers between 1 and 100 are allowed as values for the query parameter 'resultsCount'. Example: https://hipstapas.dev/api/?resultsCount=10"  
      },
      {
        "check": function (v) { return v >= 1 && v <= 100; },
        "message": "The value of the query parameter 'resultsCount' must be between 1 and 100. Example: https://hipstapas.dev/api/?resultsCount=10"
      }
    ]
  }, resultsCount);

  var validateAlphabetSmall = validate(options.alphabetSmall, {
    rules: [
      {
        "check": function (v) { return isBoolean(v) },
        "message": "Query parameter 'alphabetSmall' is of type boolean and its value should be either 'true' or 'false'. Example: https://hipstapas.dev/api/?alphabetSmall=true"  
      }
    ]
  }, alphabetSmall);

  var validateAlphabetCapital = validate(options.alphabetCapital, {
    rules: [
      {
        "check": function (v) { return isBoolean(v) },
        "message": "Query parameter 'alphabetCapital' is of type boolean and its value should be either 'true' or 'false'. Example: https://hipstapas.dev/api/?alphabetCapital=true"  
      }
    ]
  }, alphabetCapital);

  var validateAlphabetNumber = validate(options.alphabetNumber, {
    rules: [
      {
        "check": function (v) { return isBoolean(v) },
        "message": "Query parameter 'alphabetNumber' is of type boolean and its value should be either 'true' or 'false'. Example: https://hipstapas.dev/api/?alphabetNumber=true"  
      }
    ]
  }, alphabetNumber);

  var validateAlphabetSpecial = validate(options.alphabetSpecial, {
    rules: [
      {
        "check": function (v) { return isBoolean(v) },
        "message": "Query parameter 'alphabetSpecial' is of type boolean and its value should be either 'true' or 'false'. Example: https://hipstapas.dev/api/?alphabetSpecial=true"  
      }
    ]
  }, alphabetSpecial);

  const validateResults = evaluateValidation([validateLengthMin, validateLengthMax, validateResultsCount, validateAlphabetSmall, validateAlphabetCapital, validateAlphabetNumber, validateAlphabetSpecial]);
  var results = [];
  if (validateResults.success) {
    results = generate({ 
      lengthMin: validateLengthMin.value, 
      lengthMax: validateLengthMax.value,
      resultsCount: validateResultsCount.value,
      alphabetSmall: validateAlphabetSmall.value,
      alphabetCapital: validateAlphabetCapital.value,
      alphabetNumber: validateAlphabetNumber.value,
      alphabetSpecial: validateAlphabetSpecial.value
     });
  }

  return generationResult(validateResults, results);
}

module.exports = { validateAndGeneratePassphrases }