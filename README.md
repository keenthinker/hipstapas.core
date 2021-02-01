# hipstapas.core

![Node.js CI](https://github.com/keenthinker/hipstapas.core/workflows/Node.js%20CI/badge.svg)

# 
Easy and unobtrusive generation of secure strings, uuids, passphrases using EFF wordlists and random numbers.

This package is the core behind [hipstapas.dev](https://hipstapas.dev) - the Hipster Password Helper As A Service, that lets you generate passphrases from anywhere in a second.

## Table of content

- [Installation](#installation)
- [Features](#features)
- [Quick Start](#quick-start)
- [Basic concepts](#basic-concepts)
  - [Input](#input)
  - [Validation](#validation)
  - [Output](#output)
- [Configuration Properties](#configuration-properties)
  - [password](#password)
  - [uuid](#uuid)
  - [wordlist](#wordlist)
  - [random](#random)
- [Examples](#examples)
- [License](#license)

# Installation
This is a Node.js module.

Installation is done using the npm install command:

```
npm install hipstapas.core
```

# Features

* Default configurations - generation is as simple as calling a method
* Four different generators
  
  1.Passphrases/Passwords generator
  
  2.UUID v4 generator
  
  3.[EFF dice-generated passhprases](https://www.eff.org/dice)
  
  4.[Cryptographically secure pseudo-random number generator](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback)

# Quick Start

Import the module and call the generator (the default configuration values are documented in the [Configuration Properties](#configuration-properties) section):

1. `password`
2. `uuid`
3. `wordlist`
4. `random`

```JavaScript
const hipstapasCore = require('hipstapas.core')

const password = hipstapasCore.password() 
// sample output: C7j|do]t!aj5r]#Od)&R+1UHC

const uuid = hipstapasCore.uuid()
// sample output: 43bf1afd-f9f5-4546-85ea-481b064d6d56

const wordlist =  hipstapasCore.wordlist()
// sample output: companion cope undermine tipoff calamari eternity

const random = hipstapasCore.random()
// sample output: 618554
```

# Basic concepts

## Input

Every method accepts an object as an input parameter, that has different configuration properties described in # Configuration options.

## Validation
Every configuration property is of specific **type** and has a **range** of acceptable values. On each generation call, the passed values are validated regarding type and value range. If either of the two checks fails, the entire validation fails. 

## Output
The generation result is an object, that has three properties:
* `success`: set to `true` if validation and generation were successful; `false` otherwise 
* `result`: an array with generated values when `success = true`
* `error`: validation error description when `success = false`

Example of a *successful* uuid generation:

```JavaScript
{
  success: true,
  result: [ '72e2aecd-3f5b-45c6-abe6-a438428822b3' ],
  error: ''
}
``` 
Examples of a *failed* uuid generation: 

```JavaScript
// wrong parameter type
{
  success: false,
  result: [],
  error: "Only numbers between 1 and 100 are allowed as values for the query parameter 'resultsCount'."
}
// wrong value range
{
  success: false,
  result: [],
  error: "The value of the query parameter 'resultsCount' must be between 1 and 100."
}
```

# Configuration properties

One configuration property is supported by every generator:

|Parameter name|Type|Allowed values|Default value|
|----|----|----|----|
|`resultsCount`|Number|1..100|1|
|Defines how many results should be generated at once|

## `password`

|Parameter name|Type|Allowed values|Default value|
|----|----|----|----|
|`alphabetSmall`|Boolean|true..false|true|
|If set to true the generation alphabet contains small characters: *abcdefghijklmnopqrstuvwxyz*|
|`alphabetCapital`|Boolean|true..false|true|
|If set to true the generation alphabet contains capital characters: *ABCDEFGHIJKLMNOPQRSTUVWXYZ*|
|`alphabetNumber`|Boolean|true..false|true|
|If set to true the generation alphabet contains numbers: *0123456789*|
|`alphabetSpecial`|Boolean|true..false|true|
|If set to true the generation alphabet contains special characters: <em>.,+-*/!?;:{}()[]%$&~#@</em>||
|`lengthMin`|Number|1..2048|16
|Defines the minimal length of the generated phrase|
|`lengthMax`|Number|1..2048|32
|Defines the maximal length of the generated phrase|
|`resultsCount`|Number|1..100|1|
|Defines how many results should be generated at once|

## `uuid`

|Parameter name|Type|Allowed values|Default value|
|----|----|----|----|
|`resultsCount`|Number|1..100|1|
|Defines how many results should be generated at once|

## `wordlist`

|Parameter name|Type|Allowed values|Default value|
|----|----|----|----|
|`words`|Number|1..50|6|
|Defines how many results should be generated at once|
|`resultsCount`|Number|1..100|1|
|Defines how many results should be generated at once|

## `random`

|Parameter name|Type|Allowed values|Default value|
|----|----|----|----|
|`min`|Number|1..1048576|1|
|Defines the lower bound of the number generator|
|`max`|Number|1..1048576|1048576|
|Defines the upper bound of the number generator|
|`sort`|Boolean|true..false|false|
|Sorts the generated number sequence|
|`noDuplicates`|Boolean|true..false|false|
|The generated number sequence should contain only unique numbers|
|`resultsCount`|Number|1..100|1|
|Defines how many results should be generated at once|

# Examples

```JavaScript
const fiftyPasswords = hipstapasCore.password({ resultsCount: 50 })
const fiftyUuids = hipstapasCore.uuid({ resultsCount: 50 })
const fiftyPassphrases = hipstapasCore.wordlist({ resultsCount: 50 })
const fiftyRandomNumbers = hipstapasCore.random({ resultsCount: 50 })

/*
- generate 10 passphrases at once
- where each phrase is exactly 5 characters long
- excluding special and capital characters = using only small characters and numbers
*/
const options = {
  resultsCount: 10,
  lengthMin: 5,
  lengthMax: 5,
  alphabetSpecial: false,
  alphabetCapital: false
}
const passwords = hipstapasCore.password(options)
/* sample output:
{
  success: true,
  result: [
    '1p9d7', 'h88a2',
    'j6yzp', 'fftkg',
    '8d40c', 'uqp3q',
    'yj9wc', 'qjsch',
    'qnlrk', 'men3u'
  ],
  error: ''
}
*/

/*
- generate 5 random numbers at once
- every number should be >= 10 and <= 100
- sort the result sequence
- there should be no duplicates in the result sequence
*/
const optionsRandom = {
  resultsCount: 5,
  min: 10,
  max: 100,
  sort: true,
  noDuplicates: true
}
const randomNumbers = hipstapasCore.random(optionsRandom)
/* sample output: 
{ 
  success: true, 
  result: [ 30, 35, 52, 86, 88 ], 
  error: '' 
}
*/
```

# License

[MIT License](https://github.com/keenthinker/hipstapas.core/blob/main/LICENSE)
