const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Storage {
  constructor(options) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path = path.join(userDataPath, `${options.name}.json`);
    this.data = parseDataFile(this.path, options.defaults);
  }
  
  get(key) {
    return this.data[key];
  }
  
  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    // if there was some kind of error, return the passed in defaults instead
    return defaults;
  }
}

module.exports = Storage;