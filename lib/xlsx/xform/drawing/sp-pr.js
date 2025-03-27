const BaseXform = require('../base-xform');
const StaticXform = require('../static-xform');
const prstgepmXform = require('./prstgepm-xform');
const XfrmXform = require('./xfrm-xform');

// module.exports = function (xfrm = {}) {
//   const x = xfrm.left || 0;
//   const y = xfrm.top || 0;
//   const cx = xfrm.width || 0;
//   const cy = xfrm.height || 0;
//   return {
//     tag: 'xdr:spPr',
//     c: [
//       {
//         tag: 'a:xfrm',
//         c: [
//           {tag: 'a:off', $: {x: x, y: y}},
//           {tag: 'a:ext', $: {cx: cx, cy: cy}},
//         ],
//       },
//       {
//         tag: 'a:prstGeom',
//         $: {prst: 'rect'},
//         c: [{tag: 'a:avLst'}],
//       },
//     ],
//   }
// };

class SpPrXform extends BaseXform {
  constructor() {
    super();

    this.map = {
      'a:xfrm': new XfrmXform(),
      'a:prstGeom': new StaticXform(prstgepmXform),
    };
  }

  get tag() {
    return 'xdr:spPr';
  }

  render(xmlStream, model) {
    xmlStream.openNode(this.tag);

    this.map['a:xfrm'].render(xmlStream, model);
    this.map['a:prstGeom'].render(xmlStream, model);

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

module.exports = SpPrXform;
