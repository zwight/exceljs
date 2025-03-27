const BaseXform = require('../base-xform');
const StaticXform = require('../static-xform');
const ExtXform = require('./ext-xform');

class XfrmXform extends BaseXform {
  constructor() {
    super();

    this.map = {
      'a:off': new StaticXform({tag: 'a:off', $: {x: '0', y: '0'}}),
      'a:ext': new ExtXform({tag: 'a:ext'}),
    };
  }

  get tag() {
    return 'a:xfrm';
  }

  render(xmlStream, model) {
    xmlStream.openNode(this.tag);

    this.map['a:off'].render(xmlStream, model);
    this.map['a:ext'].render(xmlStream, model.ext || {width: 0, height: 0});

    xmlStream.closeNode();
  }

  parseOpen() {
    return true;
  }

  parseText() {}

  parseClose(name) {
    switch (name) {
      case this._model.tag:
        return false;
      default:
        return true;
    }
  }
}

module.exports = XfrmXform;
