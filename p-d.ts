//import {XtallatX} from 'xtal-latx/xtal-latx.js';
import {PrevElementListener} from './PrevElListener.js';

export interface ICssPropMap {
    cssSelector: string;
    propTarget: string;
    propSource?: string;
}

const to = 'to';
const m = 'm';
export class PD extends PrevElementListener{
    static get is(){return 'p-d';}
    _to: string;
    get to(){
        return this._to;
    }
    set to(val){
        this.setAttribute(to, val);
    }
    _hasMax: boolean;
    _m: number
    get m(){
        return this._m;
    }
    set m(val){
        this.setAttribute(val.toString());
    }
    static get observedAttributes(){
        return super.observedAttributes.concat([to, m]);
    }
    _cssPropMap: ICssPropMap[];
    // detatchEventListeners(){
    //     if(this._siblingObserver) this._siblingObserver.disconnect();
    //     const prevSibling = (<any>this as HTMLElement).previousElementSibling;
    //     this._on.split('|').forEach(token =>{
    //         if(!token.startsWith('@')){
    //             prevSibling.removeEventListener(token, this._handleEvent);
    //         }
    //     })
    // }
    getPreviousSib() : HTMLElement{
        let prevSibling = this;
        while(prevSibling && prevSibling.tagName === 'P-D'){
            prevSibling = prevSibling.previousElementSibling;
        }
        return <any>prevSibling as HTMLElement;
    }
    detach(prevSibling: HTMLElement){
        prevSibling.removeEventListener(this._on, this._boundHandleEvent);
    }

    _lastEvent: Event;
    
    _handleEvent(e: Event){
        if(e.stopPropagation) e.stopPropagation();
        this._lastEvent = e;
        if(!this._cssPropMap){
            return;
        }
        //const prevSibling = this.getPreviousSib();
        let nextSibling = this.nextElementSibling;
        let count = 0;
        while (nextSibling) {
            this._cssPropMap.forEach(map => {
                if (map.cssSelector === '*' || nextSibling.matches(map.cssSelector)) {
                    count++;
                    if(!map.propSource){
                        let defaultProp = this.getPropFromPath(e, 'detail.value');
                        if(!defaultProp) defaultProp = this.getPropFromPath(e, 'target.value');
                        nextSibling[map.propTarget] = defaultProp;
                    }
                    nextSibling[map.propTarget] = this.getPropFromPath(e, map.propSource);
                }
            })
            if(this._hasMax && count >= this._m) break;
            nextSibling = nextSibling.nextElementSibling;
        }
    }

    getPropFromPath(val: any, path: string){
        if(!path) return val;
        let context = val;
        path.split('.').forEach(token =>{
            if(context) context = context[token];
        })
        return context;
    }
    attributeChangedCallback(name: string, oldVal: string, newVal: string){
        switch(name){
            case to:
                if(newVal.endsWith('}')) newVal += ';';
                this._to = newVal;
                this.parseTo();
                if(this._lastEvent) this._handleEvent(this._lastEvent);
                break;
            case m:
                if(newVal !== null){
                    this._m = parseInt(newVal);
                    this._hasMax = true;
                }else{
                    this._hasMax = false;
                }
        }
        super.attributeChangedCallback(name, oldVal, newVal);
        this.onPropsChange();
    }
    _connected: boolean;
    connectedCallback(){
        this._upgradeProperties([to,m])
        this._connected = true;
        this.onPropsChange();
    }
    disconnectedCallback(){
        const prevSibling = this.getPreviousSib();
        if(prevSibling && this._boundHandleEvent) this.detach(prevSibling);
        this.disconnectSiblingObserver();
    }

    onPropsChange(){
        if(!this._connected || !this._on || !this._to) return;
        //this.parseTo();
        this.attachEventListeners();
    }

    _addedSiblingMutationObserver: boolean;
    addMutationObserver(){
        if(!this.parentElemen) return; //TODO
        const config = { childList: true};
        this._siblingObserver =  new MutationObserver((mutationsList: MutationRecord[]) =>{
            if(!this._lastEvent) return;
            //this.passDownProp(this._lastResult);
            this._handleEvent(this._lastEvent);
        });
        this._siblingObserver.observe(this.parentElement, config);
    }
    disconnectSiblingObserver(){
        if(this._siblingObserver)  this._siblingObserver.disconnect();
    }
    _lastTo: string;
    parseTo() {
        if(this._cssPropMap && this._to === this._lastTo) return;
        this._lastTo = this._to;
        this._cssPropMap = [];
        const splitPassDown = this._to.split('};');
        splitPassDown.forEach(passDownSelectorAndProp => {
            if (!passDownSelectorAndProp) return;
            const mapTokens = passDownSelectorAndProp.split('{');
            const splitPropPointer = mapTokens[1].split(':');
            let cssSelector = mapTokens[0];
            if(!cssSelector){
                cssSelector = "*";
                this._m = 1;
                this._hasMax = true;
            }
            this._cssPropMap.push({
                cssSelector: cssSelector,
                propTarget:splitPropPointer[0],
                propSource: splitPropPointer.length > 0 ? splitPropPointer[1] : null
            });
        })
        if(!this._addedSiblingMutationObserver){
            this.addMutationObserver();
        }
    }
    _siblingObserver: MutationObserver;

}
if(!customElements.get(PD.is)){
    customElements.define(PD.is, PD);
}
