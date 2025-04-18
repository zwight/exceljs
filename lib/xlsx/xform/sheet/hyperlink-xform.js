const BaseXform = require('../base-xform');
const utils = require('../../../utils/utils');

class HyperlinkXform extends BaseXform {
  get tag() {
    return 'hyperlink';
  }

  render(xmlStream, model) {
    if (this.isInternalLink(model)) {
      xmlStream.leafNode('hyperlink', {
        ref: model.address,
        // 'r:id': model.rId,
        tooltip: model.tooltip,
        location: utils.xmlDecode(model.target),
        display: model.display,
      });
    } else {
      xmlStream.leafNode('hyperlink', {
        ref: model.address,
        'r:id': model.rId,
        tooltip: model.tooltip,
        display: model.display,
      });
    }
  }

  parseOpen(node) {
    if (node.name === 'hyperlink') {
      this.model = {
        address: node.attributes.ref,
        rId: node.attributes['r:id'],
        tooltip: node.attributes.tooltip,
        display: node.attributes.display,
      };

      // This is an internal link
      if (node.attributes.location) {
        this.model.target = node.attributes.location;
      }
      return true;
    }
    return false;
  }

  parseText() {}

  parseClose() {
    return false;
  }

  isInternalLink(model) {
    // @example: Sheet2!D3, return true
    return model.target && /^[^!]+![a-zA-Z]+[\d]+$/.test(model.target);
  }
}

module.exports = HyperlinkXform;
