import { PDX } from './p-d-x.js';
export var PS =
/*#__PURE__*/
function (_PDX) {
  babelHelpers.inherits(PS, _PDX);

  function PS() {
    babelHelpers.classCallCheck(this, PS);
    return babelHelpers.possibleConstructorReturn(this, (PS.__proto__ || Object.getPrototypeOf(PS)).apply(this, arguments));
  }

  babelHelpers.createClass(PS, [{
    key: "pass",
    value: function pass(e) {
      this.passDown(e.target, e, 0);
    }
  }], [{
    key: "is",
    get: function get() {
      return 'p-s';
    }
  }]);
  return PS;
}(PDX);
if (!customElements.get(PS.is)) customElements.define(PS.is, PS); //# sourceMappingURL=p-s.js.map