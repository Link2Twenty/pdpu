import { P } from './p.js';
var m = 'm';
var p_d_if = 'p-d-if';
var PDIf = 'PDIf';
var _addedSMO = '_addedSMO'; //addedSiblingMutationObserver

/**
 * `p-d`
 *  Pass data from one element down the DOM tree to other elements
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */

export var PD =
/*#__PURE__*/
function (_P) {
  babelHelpers.inherits(PD, _P);

  function PD() {
    babelHelpers.classCallCheck(this, PD);
    return babelHelpers.possibleConstructorReturn(this, (PD.__proto__ || Object.getPrototypeOf(PD)).apply(this, arguments));
  }

  babelHelpers.createClass(PD, [{
    key: "pass",
    value: function pass(e) {
      this.passDown(this.nextElementSibling, e, 0);
    }
  }, {
    key: "passDown",
    value: function passDown(start, e, count) {
      var _this = this;

      var nextSibling = start;

      while (nextSibling) {
        if (nextSibling.tagName !== 'SCRIPT') {
          this._cssPropMap.forEach(function (map) {
            if (map.cssSelector === '*' || nextSibling.matches && nextSibling.matches(map.cssSelector)) {
              count++;

              _this.setVal(e, nextSibling, map);
            }

            var fec = nextSibling.firstElementChild;

            if (_this.id && fec && nextSibling.hasAttribute(p_d_if)) {
              //if(!nextSibling[PDIf]) nextSibling[PDIf] = JSON.parse(nextSibling.getAttribute(p_d_if));
              if (_this.matches(nextSibling.getAttribute(p_d_if))) {
                _this.passDown(fec, e, count);

                var addedSMOTracker = nextSibling[_addedSMO];
                if (!addedSMOTracker) addedSMOTracker = nextSibling[_addedSMO] = {};

                if (!addedSMOTracker[_this.id]) {
                  _this.addMutationObserver(nextSibling, true);

                  nextSibling[_addedSMO][_this.id] = true;
                }
              }
            }
          });

          if (this._hasMax && count >= this._m) break;
        }

        nextSibling = nextSibling.nextElementSibling;
      }
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldVal, newVal) {
      switch (name) {
        case m:
          if (newVal !== null) {
            this._m = parseInt(newVal);
            this._hasMax = true;
          } else {
            this._hasMax = false;
          }

      }

      babelHelpers.get(PD.prototype.__proto__ || Object.getPrototypeOf(PD.prototype), "attributeChangedCallback", this).call(this, name, oldVal, newVal);
      this.onPropsChange();
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      babelHelpers.get(PD.prototype.__proto__ || Object.getPrototypeOf(PD.prototype), "connectedCallback", this).call(this);

      this._upgradeProperties([m]);

      this._connected = true;
      this.onPropsChange();
    }
  }, {
    key: "addMutationObserver",
    value: function addMutationObserver(baseElement, isParent) {
      var _this2 = this;

      var elementToObserve = isParent ? baseElement : baseElement.parentElement;
      if (!elementToObserve) return; //TODO

      this._siblingObserver = new MutationObserver(function (mutationsList) {
        if (!_this2._lastEvent) return; //this.passDownProp(this._lastResult);

        _this2._handleEvent(_this2._lastEvent);
      });

      this._siblingObserver.observe(elementToObserve, {
        childList: true
      });
    }
  }, {
    key: "m",
    get: function get() {
      return this._m;
    },
    set: function set(val) {
      this.setAttribute(val.toString());
    }
  }], [{
    key: "is",
    get: function get() {
      return 'p-d';
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      return babelHelpers.get(PD.__proto__ || Object.getPrototypeOf(PD), "observedAttributes", this).concat([m]);
    }
  }]);
  return PD;
}(P);

if (!customElements.get(PD.is)) {
  customElements.define(PD.is, PD);
} //# sourceMappingURL=p-d.js.map