const crypto = require("crypto");

function sortJSONByKeys(data) {
  const result = {};

  const sortedKeys = Object.keys(data).sort();

  for (const key of sortedKeys) {
    result[key] = data[key];
  }

  return result;
}

function hashingJSON(data) {
    const flattedJSON = flattenJSON(data);
    const message = JSON.stringify(sortJSONByKeys(flattedJSON));
  
    const encrypted = crypto.createHmac('sha256', Securitykey).update(message).digest('hex');
  
    return encrypted;
}

function flattenJSON(data) {
    const result = {};
  
    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        for (var i = 0, l = cur.length; i < l; i++)
          recurse(cur[i], prop + "[" + i + "]");
        if (l == 0) result[prop] = [];
      } else {
        var isEmpty = true;
        for (var p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + ":::" + p : p);
        }
        if (isEmpty && prop) result[prop] = {};
      }
    }
  
    recurse(data, "");
  
    return result;
  }

  module.exports = { hashingJSON, flattenJSON };