const colCache = require('../utils/col-cache');

function getDataValidation(addr, model) {
  const addrParse = colCache.decode(addr);
  const list = Object.keys(model);
  const key = list.find(d => {
    const range = colCache.decode(d);
    if (range.dimensions) {
      if (
        addrParse.col >= range.left &&
        addrParse.col <= range.right &&
        addrParse.row >= range.top &&
        addrParse.row <= range.bottom
      ) {
        return true;
      }
    } else if (addr === d) return true;
    return false;
  });
  if (!key) return undefined;
  return model[key];
}
class DataValidations {
  constructor(model) {
    this.model = model || {};
  }

  // add(address, validation) {
  //   return (this.model[address] = validation);
  // }

  find(address) {
    // return this.model[address];
    return getDataValidation(address, this.model);
  }

  // remove(address) {
  //   this.model[address] = undefined;
  // }
}

module.exports = DataValidations;
