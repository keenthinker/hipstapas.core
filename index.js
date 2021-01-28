const { validateAndGeneratePassphrases } = require('./modules/password')
const { validateAndGenerateUuids } = require('./modules/uuid')
const { validateAndGenerateWordlists } = require('./modules/wordlist')
const { validateAndGenerateRandomNumbers } = require('./modules/random')

function password(options) {
    return validateAndGeneratePassphrases(options);
}

function uuid(options) {
    return validateAndGenerateUuids(options)
}

function wordlist(options) {
    return validateAndGenerateWordlists(options)
}

function random(options) {
    return validateAndGenerateRandomNumbers(options)
}

module.exports = { password, uuid, wordlist, random }
