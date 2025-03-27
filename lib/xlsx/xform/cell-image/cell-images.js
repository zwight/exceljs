const XmlStream = require('../../../utils/xml-stream');

const BaseXform = require('../base-xform');
const CellImageXform = require('./cell-image');

class CellImagesform extends BaseXform {
  constructor() {
    super();

    this.map = {
      'etc:cellImage': new CellImageXform(),
    };
  }

  prepare(model) {
    model.forEach((element, index) => {
      this.map['etc:cellImage'].prepare(element, {index});
    });
  }

  get tag() {
    return 'etc:cellImages';
  }

  render(xmlStream, model) {
    xmlStream.openXml(XmlStream.StdDocAttributes);
    xmlStream.openNode(this.tag, CellImagesform.CELLIMAGES_ATTRIBUTES);

    model.forEach(element => {
      this.map['etc:cellImage'].render(xmlStream, element);
    });

    xmlStream.closeNode();
  }

  parseClose(name) {
    switch (name) {
      case this.tag:
        return false;
      default:
        // could be some unrecognised tags
        return true;
    }
  }
}

CellImagesform.CELLIMAGES_ATTRIBUTES = {
  'xmlns:xdr': 'http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing',
  'xmlns:a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
  'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
  'xmlns:etc': 'http://www.wps.cn/officeDocument/2017/etCustomData',
};

module.exports = CellImagesform;
