# CLOUDJSON

[![Build Status](https://travis-ci.org/breizoreol/cloudjson.svg?branch=master)](https://travis-ci.org/breizoreol/cloudjson) ![npm](https://img.shields.io/npm/dt/cloudjson.svg)

cloudjson is a simple module that allows you to programmatically post/get/update json data online, using the api of a free service called [MyJson](http://myjson.com/).

## Why would I need this?
This module is useful if you need to quickly store json data online, for a proof of concept project, or any not so long term project that must be done fast.

## Usage

### Post data

```javascript
const cloudJson = require('cloudjson');
var jsonData = {'foo' : 'bar', 'foo2' : 'bar2'};

// post json online (will return the url from which you'll be able to fetch your data)
cloudjson.post(jsonData).then(function(result){
	// result contains the url
});

// optionnaly, you can specify a password to encrypt the data you push online
var password = 'myPassword';
cloudjson.post(jsonData, password).then(function(result){
	// result contains the url
});
```
From here, examples will be shown using async/await instead of 'then', implying that you are inside an async function, all methods can be used in both manners, since they all return a promise.
### Fetch Data
```javascript
// to fetch data you've precedently posted, you need the previously given url
var myData = await cloudjson.get(jsonUrl);

// if you encrypted the data when you posted it, specify its password to decrypt it:
var myData = await cloudjson.get(jsonUrl, password);
````
### Update data
```javascript
// to update data, you need the url of the previously created json
var updatedData = await cloudjson.update(newJsonData, jsonUrl);

// if your json was encrypted, specify the password
var updatedData = await cloudjson.update(newJsonData, jsonUrl, password);
```