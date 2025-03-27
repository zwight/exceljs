const {v4: uuidv4} = require('uuid');
const colCache = require('../utils/col-cache');
const Anchor = require('./anchor');

class Image {
  constructor(worksheet, model) {
    this.worksheet = worksheet;
    this.model = model;
  }

  get model() {
    switch (this.type) {
      case 'background':
        return {
          type: this.type,
          imageId: this.imageId,
        };
      case 'image':
        return {
          type: this.type,
          imageId: this.imageId,
          hyperlinks: this.range.hyperlinks,
          range: {
            tl: this.range.tl.model,
            br: this.range.br && this.range.br.model,
            ext: this.range.ext,
            editAs: this.range.editAs,
          },
        };
      case 'cellimage':
        return {
          type: this.type,
          imageId: this.imageId,
          value: this.value,
          descr: this.descr,
        };
      default:
        throw new Error('Invalid Image Type');
    }
  }

  set model({type, imageId, range, hyperlinks, descr}) {
    this.type = type;
    this.imageId = imageId;

    if (type === 'image') {
      if (typeof range === 'string') {
        const decoded = colCache.decode(range);
        this.range = {
          tl: new Anchor(this.worksheet, {col: decoded.left, row: decoded.top}, -1),
          br: new Anchor(this.worksheet, {col: decoded.right, row: decoded.bottom}, 0),
          editAs: 'oneCell',
        };
      } else {
        this.range = {
          tl: new Anchor(this.worksheet, range.tl, 0),
          br: range.br && new Anchor(this.worksheet, range.br, 0),
          ext: range.ext,
          editAs: range.editAs,
          hyperlinks: hyperlinks || range.hyperlinks,
        };
      }
    }
    if (type === 'cellimage') {
      this.value = `ID_${uuidv4().replace(/-/g, '').toUpperCase()}`;
      this.descr = descr;
    }
  }
}

module.exports = Image;
