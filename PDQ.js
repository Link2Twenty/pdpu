import { XtallatX } from 'xtal-latx/xtal-latx.js';
import { define } from 'xtal-latx/define.js';
export class PDQ {
    static define(name, fn, adjustClass) {
        class newClass extends XtallatX(HTMLElement) {
            constructor() {
                super();
                this._connected = false;
                this.style.display = 'none';
            }
            static get is() { return name; }
            connectedCallback() {
                this._upgradeProperties(['input', 'disabled']);
                this._connected = true;
            }
            get input() {
                return this._input;
            }
            set input(val) {
                this._input = val;
                this.value = fn(val);
                this.onPropsChange();
            }
            attributeChangedCallback(name, oldVal, newVal) {
                super.attributeChangedCallback(name, oldVal, newVal);
                switch (name) {
                    case 'input':
                        this.input = JSON.parse(newVal);
                        break;
                    default:
                        this.onPropsChange();
                }
            }
            onPropsChange() {
                if (this._disabled)
                    return;
                const val = this.value;
                this.de('value', {
                    value: val
                });
                let valueSummary = null;
                switch (typeof (val)) {
                    case 'string':
                    case 'boolean':
                    case 'number':
                        valueSummary = val.toString().substr(0, 10);
                        break;
                    case 'object':
                        if (!val)
                            return;
                        if (Array.isArray(val)) {
                            valueSummary = val.length;
                        }
                        else {
                            valueSummary = Object.keys(val).toString();
                        }
                }
                if (valueSummary !== null)
                    this.setAttribute('value-ish', valueSummary);
            }
        }
        if (adjustClass) {
            if (!adjustClass(newClass))
                return;
        }
        define(newClass);
    }
    static $(str) {
        return str.replace(/(<([^>]+)>)/ig, '');
    }
}
customElements['PDQ'] = PDQ; // for ES6 Module challenged browsers.
//# sourceMappingURL=PDQ.js.map