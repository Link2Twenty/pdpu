
    //@ts-check
    (function () {
    const disabled = 'disabled';
function XtallatX(superClass) {
    return class extends superClass {
        static get observedAttributes() {
            return [disabled];
        }
        get disabled() {
            return this._disabled;
        }
        set disabled(val) {
            if (val) {
                this.setAttribute(disabled, '');
            }
            else {
                this.removeAttribute(disabled);
            }
        }
        attributeChangedCallback(name, oldVal, newVal) {
            switch (name) {
                case disabled:
                    this._disabled = newVal !== null;
                    break;
            }
        }
        de(name, detail) {
            const newEvent = new CustomEvent(name + '-changed', {
                detail: detail,
                bubbles: true,
                composed: false,
            });
            this.dispatchEvent(newEvent);
            return newEvent;
        }
        _upgradeProperties(props) {
            props.forEach(prop => {
                if (this.hasOwnProperty(prop)) {
                    let value = this[prop];
                    delete this[prop];
                    this[prop] = value;
                }
            });
        }
    };
}
//# sourceMappingURL=xtal-latx.js.map
const on = 'on';
const noblock = 'noblock';
const to = 'to';
class P extends XtallatX(HTMLElement) {
    get on() {
        return this._on;
    }
    set on(val) {
        this.setAttribute(on, val);
    }
    get to() {
        return this._to;
    }
    set to(val) {
        this.setAttribute(to, val);
    }
    get noblock() {
        return this._noblock;
    }
    set noblock(val) {
        if (val) {
            this.setAttribute(noblock, '');
        }
        else {
            this.removeAttribute(noblock);
        }
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([on, to, noblock]);
    }
    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case on:
                this._on = newVal;
                //this.attachEventListeners();
                break;
            case to:
                if (newVal.endsWith('}'))
                    newVal += ';';
                this._to = newVal;
                this.parseTo();
                if (this._lastEvent)
                    this._handleEvent(this._lastEvent);
                break;
            case noblock:
                this._noblock = newVal !== null;
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }
    getPreviousSib() {
        let prevSibling = this;
        while (prevSibling && prevSibling.tagName.startsWith('P-')) {
            prevSibling = prevSibling.previousElementSibling;
        }
        return prevSibling;
    }
    connectedCallback() {
        this._upgradeProperties([on, to, noblock]);
    }
    disconnectedCallback() {
        const prevSibling = this.getPreviousSib();
        if (prevSibling && this._boundHandleEvent)
            this.detach(prevSibling);
        this.disconnectSiblingObserver();
    }
    _handleEvent(e) {
        if (e.stopPropagation && !this._noblock)
            e.stopPropagation();
        this._lastEvent = e;
        if (!this._cssPropMap) {
            return;
        }
        this.pass(e);
    }
    attachEventListeners() {
        const attrFilters = [];
        const prevSibling = this.getPreviousSib();
        if (this._on === 'eval' && prevSibling.tagName === 'SCRIPT') {
            let evalObj = eval(prevSibling.innerText);
            if (typeof (evalObj) === 'function') {
                evalObj = evalObj(this);
            }
            this._handleEvent(evalObj);
        }
        else {
            if (this._boundHandleEvent) {
                return;
            }
            else {
                this._boundHandleEvent = this._handleEvent.bind(this);
            }
            const fakeEvent = {
                target: prevSibling
            };
            this._handleEvent(fakeEvent);
            prevSibling.addEventListener(this._on, this._boundHandleEvent);
            prevSibling.removeAttribute('disabled');
        }
    }
    parseMapping(mapTokens, cssSelector) {
        const splitPropPointer = mapTokens[1].split(':');
        this._cssPropMap.push({
            cssSelector: cssSelector,
            propTarget: splitPropPointer[0],
            propSource: splitPropPointer.length > 0 ? splitPropPointer[1] : null
        });
    }
    parseTo() {
        if (this._cssPropMap && this._to === this._lastTo)
            return;
        this._lastTo = this._to;
        this._cssPropMap = [];
        const splitPassDown = this._to.split('};');
        splitPassDown.forEach(passDownSelectorAndProp => {
            if (!passDownSelectorAndProp)
                return;
            const mapTokens = passDownSelectorAndProp.split('{');
            let cssSelector = mapTokens[0];
            if (!cssSelector) {
                cssSelector = "*";
                this._m = 1;
                this._hasMax = true;
            }
            this.parseMapping(mapTokens, cssSelector);
        });
        if (!this._addedSMO) {
            this.addMutationObserver(this);
            this._addedSMO = true;
        }
    }
    setVal(e, target, map) {
        if (!map.propSource) {
            let defaultProp = this.getPropFromPath(e, 'detail.value');
            if (!defaultProp)
                defaultProp = this.getPropFromPath(e, 'target.value');
            //target[map.propTarget] = defaultProp;
            this.commit(target, map, defaultProp);
        }
        else {
            //target[map.propTarget] = this.getPropFromPath(e, map.propSource);
            this.commit(target, map, this.getPropFromPath(e, map.propSource));
        }
    }
    commit(target, map, val) {
        target[map.propTarget] = val;
    }
    getPropFromPath(val, path) {
        if (!path)
            return val;
        return this.getPropFromPathTokens(val, path.split('.'));
    }
    getPropFromPathTokens(val, pathTokens) {
        let context = val;
        pathTokens.forEach(token => {
            if (context)
                context = context[token];
        });
        return context;
    }
    disconnectSiblingObserver() {
        if (this._siblingObserver)
            this._siblingObserver.disconnect();
    }
}
//# sourceMappingURL=p.js.map
//import {XtallatX} from 'xtal-latx/xtal-latx.js';
const m = 'm';
const p_d_if = 'p-d-if';
const PDIf = 'PDIf';
const _addedSMO = '_addedSMO'; //addedSiblingMutationObserver
/**
 * `p-d`
 *  Pass data from one element down the DOM tree to other elements
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PD extends P {
    static get is() { return 'p-d'; }
    get m() {
        return this._m;
    }
    set m(val) {
        this.setAttribute(val.toString());
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([m]);
    }
    detach(prevSibling) {
        prevSibling.removeEventListener(this._on, this._boundHandleEvent);
    }
    pass(e) {
        this.passDown(this.nextElementSibling, e, 0);
    }
    passDown(start, e, count) {
        let nextSibling = start;
        while (nextSibling) {
            this._cssPropMap.forEach(map => {
                if (map.cssSelector === '*' || nextSibling.matches(map.cssSelector)) {
                    count++;
                    this.setVal(e, nextSibling, map);
                }
                const fec = nextSibling.firstElementChild;
                if (this.id && fec && nextSibling.hasAttribute(p_d_if)) {
                    //if(!nextSibling[PDIf]) nextSibling[PDIf] = JSON.parse(nextSibling.getAttribute(p_d_if));
                    if (this.matches(nextSibling.getAttribute(p_d_if))) {
                        this.passDown(fec, e, count);
                        let addedSMOTracker = nextSibling[_addedSMO];
                        if (!addedSMOTracker)
                            addedSMOTracker = nextSibling[_addedSMO] = {};
                        if (!addedSMOTracker[this.id]) {
                            this.addMutationObserver(fec);
                            nextSibling[_addedSMO][this.id] = true;
                        }
                    }
                }
            });
            if (this._hasMax && count >= this._m)
                break;
            nextSibling = nextSibling.nextElementSibling;
        }
    }
    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case m:
                if (newVal !== null) {
                    this._m = parseInt(newVal);
                    this._hasMax = true;
                }
                else {
                    this._hasMax = false;
                }
        }
        super.attributeChangedCallback(name, oldVal, newVal);
        this.onPropsChange();
    }
    connectedCallback() {
        super.connectedCallback();
        this._upgradeProperties([m]);
        this._connected = true;
        this.onPropsChange();
    }
    onPropsChange() {
        if (!this._connected || !this._on || !this._to)
            return;
        //this.parseTo();
        this.attachEventListeners();
    }
    addMutationObserver(baseElement) {
        if (!baseElement.parentElement)
            return; //TODO
        this._siblingObserver = new MutationObserver((mutationsList) => {
            if (!this._lastEvent)
                return;
            //this.passDownProp(this._lastResult);
            this._handleEvent(this._lastEvent);
        });
        this._siblingObserver.observe(this.parentElement, { childList: true });
    }
}
if (!customElements.get(PD.is)) {
    customElements.define(PD.is, PD);
}
//# sourceMappingURL=p-d.js.map
//const attrib_filter = 'attrib-filter';
class PDX extends PD {
    static get is() { return 'p-d-a'; }
    // static get observedAttributes(){
    //     return super.observedAttributes.concat([attrib_filter]);
    // }
    // _attribFilter:string;
    // get attribFilter(){return this._attribFilter;}
    // set attribFilter(newVal){
    //     this.setAttribute(attrib_filter, newVal);
    // }
    // attributeChangedCallback(name: string, oldVal: string, newVal: string){
    //     switch(name){
    //         case attrib_filter:
    //             this._attribFilter = newVal;
    //             break;
    //     }
    //     super.attributeChangedCallback(name, oldVal, newVal);
    // }
    parseMapping(mapTokens, cssSelector) {
        const splitPropPointer1 = mapTokens[1].split(';');
        splitPropPointer1.forEach(token => {
            const splitPropPointer = token.split(':');
            this._cssPropMap.push({
                cssSelector: cssSelector,
                propTarget: splitPropPointer[0],
                propSource: splitPropPointer.length > 0 ? splitPropPointer[1] : null
            });
        });
    }
    commit(target, map, val) {
        const targetPath = map.propTarget;
        if (targetPath.startsWith('.')) {
            const cssClass = targetPath.substr(1);
            const method = val ? 'add' : 'remove';
            target.classList[method](cssClass);
        }
        else if (targetPath.indexOf('.') > -1) {
            const pathTokens = targetPath.split('.');
            const lastToken = pathTokens.pop();
            this.getPropFromPathTokens(target, pathTokens)[lastToken] = val;
        }
        else {
            target[targetPath] = val;
        }
    }
    attachEventListeners() {
        if (!this._on.startsWith('@')) {
            super.attachEventListeners();
            return;
        }
        const split = this._on.split(',').map(token => token.substr(1));
        const config = {
            attributes: true,
            attributeFilter: split
        };
        const prevSibling = this.getPreviousSib();
        this._attributeObserver = new MutationObserver(mutationRecords => {
            const fakeEvent = {
                mutationRecords: mutationRecords,
                target: prevSibling
            };
        });
        this._attributeObserver.observe(prevSibling, config);
    }
    disconnect() {
        if (this._attributeObserver)
            this._attributeObserver.disconnect();
    }
    disconnectedCallback() {
        this.disconnect();
        super.disconnectedCallback();
    }
}
//# sourceMappingURL=p-d-x.js.map
/**
 * `p-u`
 *  Pass data from one element to a targeted DOM element elsewhere
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PU extends P {
    static get is() { return 'p-u'; }
    pass(e) {
        this._cssPropMap.forEach(map => {
            const cssSel = map.cssSelector;
            let targetElement;
            if (cssSel.startsWith('/')) {
                targetElement = self[cssSel.substr(1)];
            }
            else {
                const split = cssSel.split('/');
                const id = split[split.length - 1];
                const host = this.getHost(this, 0, split.length);
                if (host) {
                    if (host.shadowRoot) {
                        targetElement = host.shadowRoot.getElementById(id);
                        if (!targetElement)
                            targetElement = host.getElementById(id);
                    }
                    else {
                        targetElement = host.getElementById(id);
                    }
                }
            }
            if (targetElement) {
                this.setVal(e, targetElement, map);
            }
        });
    }
    getHost(el, level, maxLevel) {
        let parent;
        do {
            parent = el.parentNode;
            if (parent.nodeType === 11) {
                const newLevel = level + 1;
                if (newLevel === maxLevel)
                    return parent['host'];
                return this.getHost(parent['host'], newLevel, maxLevel);
            }
            else if (parent.tagName === 'BODY') {
                return parent;
            }
        } while (parent);
    }
}
if (!customElements.get(PU.is)) {
    customElements.define(PU.is, PU);
}
//# sourceMappingURL=p-u.js.map
    })();  
        