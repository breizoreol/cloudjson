const cloudJson = require('../index.js');
var assert = require('chai').assert;
var expect = require('chai').expect;

var data = {'foo' : 'bar', 'foo2' : 'bar2'};
var password = 'randomPassword$`^/_';
var url;

var getsUrl = async () => {
  myJsonUrl = await cloudJson.post(data);
  url = myJsonUrl.uri;
  assert.typeOf(url, 'string');
}

var getClearJson = async () => {
  jsonData = await cloudJson.get(url);
  expect(jsonData).to.deep.equal(data);
}

var updateJson = async () => {
  var updateData = {'foo' : 'bar', 'foo2' : 'bar2', 'foo3' : 'bar3'};
  jsonData = await cloudJson.update(updateData, url);
  expect(jsonData).to.deep.equal(updateData);
}

var postCrypted = async () => {
  myJsonUrl = await cloudJson.post(data, password);
  url = myJsonUrl.uri;
  assert.typeOf(url, 'string');
}

var getCrypted = async () => {
  jsonData = await cloudJson.get(url, password);
  expect(jsonData).to.deep.equal(data);
}

var updateCrypted = async () => {
  var updateData = {'foo' : 'bar', 'foo2' : 'bar2', 'foo3' : 'bar3'};
  jsonData = await cloudJson.update(updateData, url, password);
  decryptedJsonData = await cloudJson.get(url, password);
  expect(decryptedJsonData).to.deep.equal(updateData);
}

describe('Send clear json to myJson', function () {
  it('gets the url from myjson after having posted data', getsUrl);
});

describe('Fetch clear json from myJson', function() {
  it('Gets previously posted json', getClearJson);
});

describe('Update clear json with json url', function() {
  it('Gets updated json after making the update', updateJson);
});

describe('Post crypted data with a password', function() {
  it('gets the url from myjson after having posted crypted data', postCrypted);
});

describe('Fetch crypted json from myJson', function() {
  it('Gets previously posted crypted json (decrypted)', getCrypted);
});

describe('Update crypted json with json url', function() {
  it('Gets updated crypted json after making the update (decrypted)', updateCrypted);
});
