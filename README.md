# hipstapas.npm
The npm module for the [Hipster Password Helper As A Service - https://hipstapas.dev](https://hipstapas.dev)

The module contains methods corresponding to the currently implemented endpoints:

* `password`
* `uuid`
* `wordlist`
* `random`


Every method accepts an object as an input parameter, that has different configuration properties described here: [https://hipstapas.dev/docs](https://hipstapas.dev/docs)

Every method has default configuration values for. To generate values using the defaults just calling the desired method:  

```JavaScript
const hipstapasCore = require('hipstapas.npm')

const password = hipstapasCore.password()
const uuid = hipstapasCore.uuid()
const wordlist =  hipstapasCore.wordlist()
const random = hipstapasCore.random()

const fiftyPasswords = hipstapasCore.password({ resultsCount: 50 })
```

The result is also an object that has three properties:
* `success`: `true` if validation and generation were successful; `false` otherwise 
* `result`: the result of the generation when `success = true`
* `error`: the error from the validation when `success = false`