function generationResult(validateResult, results) {
        return {
                "success": validateResult.success,
                "result": results.length == 1 ? results[0] : results,
                "error": validateResult.error
        };
}

function isString(p) {
        return ((typeof p) === 'string') || (p instanceof String);
}

function isBoolean(p) {
        return ((typeof p) === 'boolean') || (p instanceof Boolean);
}

function isEmptyObject(p) {
        return (Object.keys(p).length === 0) && (p.constructor === Object);        
}

function emptyObject() {
        return {}; 
}    

module.exports = { generationResult, isString, isBoolean, isEmptyObject, emptyObject };