const PicXform = require('../drawing/pic-xform');
const BaseXform = require('../base-xform');

class CellImageXform extends BaseXform {
  constructor() {
    super();

    this.map = {
      'xdr:pic': new PicXform(),
    };
  }

  get tag() {
    return 'etc:cellImage';
  }

  prepare(model, options) {
    this.map['xdr:pic'].prepare(model, options);
  }

  render(xmlStream, model) {
    xmlStream.openNode(this.tag);

    this.map['xdr:pic'].render(xmlStream, {
      ...model,
      isCell: true,
    });

    xmlStream.closeNode();
  }

  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = undefined;
      }
      return true;
    }
    switch (name) {
      case this.tag:
        this.model.picture = this.map['xdr:pic'].model;
        return false;
      default:
        // could be some unrecognised tags
        return true;
    }
  }
}

module.exports = CellImageXform;
