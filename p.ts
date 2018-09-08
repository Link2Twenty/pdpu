import {XtallatX} from 'xtal-latx/xtal-latx.js';

export interface ICssPropMap {
    cssSelector: string;
    propTarget: string;
    propSource?: string;
}
const on = 'on';
const noblock = 'noblock';
const iff = 'if';
const to = 'to';
export abstract class P extends XtallatX(HTMLElement){
    constructor(){
        super();
        
    }
    _on!: string;
    get on(){
        return this._on;
    }
    set on(val){
        this.attr(on, val)
    }
    _to!: string;
    get to(){
        return this._to;
    }
    set to(val){
        this.attr(to, val);
    }
    _noblock!: boolean;
    get noblock(){
        return this._noblock;
    }
    set noblock(val){
        this.attr(noblock, val, '')
    }
    
    _if!: string;
    get if(){return this._if;}
    set if(val){
        this.attr(iff, val);
    }
    _input: any;
    get input(){
        return this._input;
    }
    set input(val){
        this._input = val;
        
    }
    static get observedAttributes(){
        return super.observedAttributes.concat([on, to, noblock, iff]);
    }
    attributeChangedCallback(name: string, oldVal: string, newVal: string){
        const f = '_' + name;
        switch(name){
            case iff:
            case on:
                (<any>this)[f] = newVal;
                break;
            case to:
                this._destIsNA = newVal === '{NA}';
                if(newVal.endsWith('}')) newVal += ';';
                this._to = newVal;
                this.parseTo();
                if(this._lastEvent) this._handleEvent(this._lastEvent);
                break;
            case noblock:
                (<any>this)[f] = newVal !== null;
                break;
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }

    getPreviousSib() : Element | null{
        let prevSibling = this as Element | null;
        while(prevSibling && prevSibling.tagName.startsWith('P-')){
            prevSibling = prevSibling.previousElementSibling!;
        }
        return prevSibling;
    }
    connectedCallback(){
        this.style.display = 'none';
        this._upgradeProperties([on, to, noblock, 'input', iff]);
        setTimeout(() => this.doFake(), 50);
    }
    _addedSMO = false;
    doFake(){
        if(!this._if && !this.hasAttribute('skip-init')){
            let lastEvent = this._lastEvent;
            if(!lastEvent){
                lastEvent = <any>{
                    target: this.getPreviousSib(),
                    isFake: true
                } as Event;
            }
            if(this._handleEvent) this._handleEvent(lastEvent);
        }        
        if(!(<any>this)._addedSMO && (<any>this).addMutationObserver){
            (<any>this).addMutationObserver(<any>this as HTMLElement, false);
            this._addedSMO = true;
        }
    }
    detach(prevSibling: Element){
        prevSibling.removeEventListener(this._on, this._boundHandleEvent);
    }
    disconnectedCallback(){
        const prevSibling = this.getPreviousSib();
        if(prevSibling && this._boundHandleEvent) this.detach(prevSibling);
        this.disconnect();
    }
    _boundHandleEvent!: any;
    abstract pass(e: Event) : void;
    _lastEvent!: Event;
    _handleEvent(e: Event){
        if(this.hasAttribute('debug')) debugger;
        if(!e) return;
        if(e.stopPropagation && !this._noblock) e.stopPropagation();
        if(this._if && !(e.target as HTMLElement).matches(this._if)) return;
        this._lastEvent = e;
        if(!this._cssPropMap){
            return;
        }
        this.pass(e);
    }
    _destIsNA!: boolean;
    attachEventListeners(){
        const attrFilters = [];
        const prevSibling = this.getPreviousSib();
        if(!prevSibling) return;
        
        if(this._boundHandleEvent){
            return;
        }else{
            this._boundHandleEvent = this._handleEvent.bind(this);
        }

        prevSibling.addEventListener(this._on, this._boundHandleEvent);
        prevSibling.removeAttribute('disabled');

    }
    _connected = false;
    onPropsChange(){
        if(!this._connected || !this._on || !this._to) return;
        this.attachEventListeners();
    }
    _cssPropMap!: ICssPropMap[];
    _lastTo!: string;
    parseMapping(mapTokens: string[], cssSelector: string){
        const splitPropPointer = mapTokens[1].split(':');
        this._cssPropMap.push({
            cssSelector: cssSelector,
            propTarget:splitPropPointer[0],
            propSource: splitPropPointer.length > 0 ? splitPropPointer[1] : undefined
        });
    }
    parseTo() {
        if(this._cssPropMap && this._to === this._lastTo) return;
        this._lastTo = this._to;
        this._cssPropMap = [];
        const splitPassDown = this._to.split('};');
        const onlyOne = splitPassDown.length <= 2;
        splitPassDown.forEach(passDownSelectorAndProp => {
            if (!passDownSelectorAndProp) return;
            const mapTokens = passDownSelectorAndProp.split('{');
            let cssSelector = mapTokens[0];
            if(!cssSelector && onlyOne){
                cssSelector = '*';
                (<any>this)._m = 1;
                (<any>this)._hasMax = true;
            }
           this.parseMapping(mapTokens, cssSelector);
        })

    }
    setVal(e: Event, target: any, map: ICssPropMap){
        const gpfp = this.getPropFromPath.bind(this);
        const propFromEvent = map.propSource ? gpfp(e, map.propSource) : gpfp(e, 'detail.value') || gpfp(e, 'target.value');
        this.commit(target, map, propFromEvent);
       
    }
    commit(target: HTMLElement, map: ICssPropMap, val: any){
        (<any>target)[map.propTarget] = val;
    }
    getPropFromPath(val: any, path: string){
        if(!path || path==='.') return val;
        return this.getProp(val, path.split('.'));
    }
    getProp(val: any, pathTokens: string[]){
        let context = val;
        let firstToken = true;
        const cp = 'composedPath';
        const cp_ = cp + '_';
        pathTokens.forEach(token => {
            if(context)  {
                if(firstToken && context[cp]){
                    firstToken = false;
                    const cpath = token.split(cp_);
                    if(cpath.length === 1){
                        context = context[cpath[0]];
                    }else{
                        context = context[cp]()[parseInt(cpath[1])];
                    }
                }else{
                    context = context[token];
                }
                
            }
        });
        return context;
    }

    disconnect(){
        if(this._sibObs)  this._sibObs.disconnect();
    }

    _sibObs!: MutationObserver;
}