import { validateAndGeneratePassphrases } from './modules/password.js';
import { validateAndGenerateUuids } from './modules/uuid.js';
import { validateAndGenerateWordlists } from './modules/wordlist.js';
import { validateAndGenerateRandomNumbers } from './modules/random.js';

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
