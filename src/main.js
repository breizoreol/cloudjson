var request = require('request');
var crypter = require('./crypter');

var prepareJson = (jsonData, password = false) => {
  if (typeof jsonData == 'string') jsonData = JSON.parse(jsonData);
  if (password) {
    jsonData = crypter.encrypt(JSON.stringify(jsonData), password);
    jsonData = {data : jsonData};
  }
  return jsonData;
}

exports.sendData = (jsonData, password = false, myJsonUrl = false) => {
  var method = myJsonUrl ? 'PUT' : 'POST';
  var url = myJsonUrl || "https://api.myjson.com/bins";
  return new Promise((resolve, reject) => {
    try {
      jsonData = prepareJson(jsonData, password);
      request({
        url: url,
        method: method,
        json: true,
        body: jsonData
      }, (err, response, body) => {
        if (err) reject(err);
        var result  = (myJsonUrl && password) ? crypter.decrypt(body.data, password) : body;
        resolve(result);
      });
    } catch (e) {
      reject(e.message);
    }
  });
}

exports.get = (myJsonUrl, password = false) => {
  return new Promise((resolve, reject) => {
    try {
      request({
        url: myJsonUrl,
        method: "GET",
        json: true,
      }, (err, response, body) => {
        if (err) reject(err);
        if (password && body && typeof body.data != 'undefined') {
          resolve(JSON.parse(crypter.decrypt(body.data, password)));
        } else {
          resolve(body);
        }
      });
    } catch (e) {
      reject(e.message);
    }
  });
}