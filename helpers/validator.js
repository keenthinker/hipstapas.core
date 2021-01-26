function validateResultObject(validationStatus, value, errorMessage) {
  return {
    "success": validationStatus,
    "value": value,
    "error": errorMessage
  };
}

function evaluateValidation(validationResults) {
  for(let i = 0; i < validationResults.length; i++) {
      if (!validationResults[i].success) {
          return validateResultObject(false, null, validationResults[i].error);
      }
  }
  return validateResultObject(true, null, "");
}

/**
 * Validates the specified input using the validation rules. 
 * Every validation rule is applied to the input value. 
 * If a check fails, the validation breaks and the specified for the current check error message is returned.
 * @param {*} value input value to be checked
 * @param {*} validationRules object containing an array of validation rules and corresponding error messages
 * { 
 *      rules: [ 
 *              { "check": function, "message": string }, 
 *              { "check": function, "message": string } 
 *             ] 
 * }
 */
function validate(value, validationRules, defaultValue) {
  if (value === undefined) {
    return validateResultObject(true, defaultValue, "");
  }
  let validationOk = false;
  let errorMessage = "";
  for (let i = 0; i < validationRules.rules.length; i++) {
      let rule = validationRules.rules[i];
      validationOk = rule.check(value);
      if (!validationOk) {
          errorMessage = rule.message;
          break;
      }
  }
  return validateResultObject(validationOk, value, errorMessage);
}

module.exports = { validate, validateResultObject, evaluateValidation };