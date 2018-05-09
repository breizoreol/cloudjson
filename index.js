var jsonController = require('./src/main.js');

exports.post = (jsonData, password = false) => {
  return jsonController.sendData(jsonData, password);
}

exports.update = (jsonData, myJsonUrl, password = false) => {
  return jsonController.sendData(jsonData, password, myJsonUrl);
}

exports.get = (myJsonUrl, password = false) => {
  return jsonController.get(myJsonUrl, password);
}