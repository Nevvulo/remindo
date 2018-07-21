const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Storage {
  constructor(options) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path = path.join(userDataPath, `${options.name}.json`);
    this.data = parseDataFile(this.path, options.defaults);
    this.options = options || {};
  }
  
  update() {
    this.data = parseDataFile(this.path, this.options.defaults || {});
  }

  save() {
    fs.writeFileSync(this.path, JSON.stringify(this.data))
    this.update();
  }

  get(key) {
    return this.data[key];
  }
  
  set(key, val) {
    this.data[key] = val;
    this.save();
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