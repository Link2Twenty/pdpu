import {XtallatX} from 'xtal-latx/xtal-latx.js';
import {define} from 'xtal-latx/define.js';

export class PDQ{
    static define(name: string, fn: (input: any) => any, adjustClass?: (newClass: any) => boolean){
        class newClass extends XtallatX(HTMLElement) {
            static get is(){return name;}
            constructor(){
                super();
                this.style.display = 'none';
            }
            _connected = false;
            value!: any;
            connectedCallback() {
                this._upgradeProperties(['input', 'disabled']);
                this._connected = true;
            }
            _input: any;
            get input(){
                return this._input;
            }
            set input(val){
                this._input = val;
                this.value = fn(val);
                this.onPropsChange();
            }
            attributeChangedCallback(name: string, oldVal: string, newVal: string) {
                super.attributeChangedCallback(name, oldVal, newVal);
                switch(name){
                    case 'input':
                        this.input = JSON.parse(newVal);
                        break;
                    default:
                        this.onPropsChange();
                }
            }
            onPropsChange(){
                if(this._disabled) return;
                const val = this.value;
                this.de('value', {
                    value: val
                });
                let valueSummary: any = null;
                switch(typeof(val)){
                    case 'string':
                    case 'boolean':
                    case 'number':
                        valueSummary =  val.toString().substr(0, 10);
                        break;
                    case 'object':
                        if(!val) return;
                        if(Array.isArray(val)) {
                            valueSummary = val.length;
                        }else{
                            valueSummary = Object.keys(val).toString()
                        }
                }
                if(valueSummary !== null) this.setAttribute('value-ish', valueSummary);
            }
        }
        if(adjustClass){
            if(!adjustClass(newClass)) return;
        }
        define(newClass);

    }
    public static $(str: string){
        return str.replace(/(<([^>]+)>)/ig, '');
    }
}
(<any>customElements)['PDQ'] = PDQ; // for ES6 Module challenged browsers.