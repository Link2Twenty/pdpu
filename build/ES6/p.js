import{XtallatX}from"./node_modules/xtal-latx/xtal-latx.js";const on="on",noblock="noblock",noinit="noinit",to="to";export class P extends XtallatX(HTMLElement){get on(){return this._on}set on(val){this.attr(on,val)}get to(){return this._to}set to(val){this.attr(to,val)}get noblock(){return this._noblock}set noblock(val){this.attr(noblock,val,"")}get noinit(){return this._noinit}set noinit(val){this.attr(noinit,val,"")}get input(){return this._input}set input(val){this._input=val;this._handleEvent(this._lastEvent)}static get observedAttributes(){return super.observedAttributes.concat([on,to,noblock,noinit])}attributeChangedCallback(name,oldVal,newVal){switch(name){case on:this._on=newVal;break;case to:if(newVal.endsWith("}"))newVal+=";";this._to=newVal;this.parseTo();if(this._lastEvent)this._handleEvent(this._lastEvent);break;case noinit:case noblock:this["_"+name]=null!==newVal;}super.attributeChangedCallback(name,oldVal,newVal)}getPreviousSib(){let prevSibling=this;while(prevSibling&&prevSibling.tagName.startsWith("P-")){prevSibling=prevSibling.previousElementSibling}return prevSibling}connectedCallback(){this._upgradeProperties([on,to,noblock,"input"]);if(!this._noinit){const prevSibling=this.getPreviousSib();if(this._handleEvent)this._handleEvent({target:prevSibling})}if(!this._addedSMO&&this.addMutationObserver){this.addMutationObserver(this);this._addedSMO=!0}}disconnectedCallback(){const prevSibling=this.getPreviousSib();if(prevSibling&&this._boundHandleEvent)this.detach(prevSibling);this.disconnectSiblingObserver()}_handleEvent(e){if(e.stopPropagation&&!this._noblock)e.stopPropagation();this._lastEvent=e;if(!this._cssPropMap){return}this.pass(e)}attachEventListeners(){const attrFilters=[],prevSibling=this.getPreviousSib();if("eval"===this._on&&"SCRIPT"===prevSibling.tagName){let evalObj=eval(prevSibling.innerText);if("function"===typeof evalObj){evalObj=evalObj(this)}this._handleEvent(evalObj)}else{if(this._boundHandleEvent){return}else{this._boundHandleEvent=this._handleEvent.bind(this)}prevSibling.addEventListener(this._on,this._boundHandleEvent);prevSibling.removeAttribute("disabled")}}onPropsChange(){if(!this._connected||!this._on||!this._to)return;this.attachEventListeners()}parseMapping(mapTokens,cssSelector){const splitPropPointer=mapTokens[1].split(":");this._cssPropMap.push({cssSelector:cssSelector,propTarget:splitPropPointer[0],propSource:0<splitPropPointer.length?splitPropPointer[1]:null})}parseTo(){if(this._cssPropMap&&this._to===this._lastTo)return;this._lastTo=this._to;this._cssPropMap=[];const splitPassDown=this._to.split("};"),onlyOne=2>=splitPassDown.length;splitPassDown.forEach(passDownSelectorAndProp=>{if(!passDownSelectorAndProp)return;const mapTokens=passDownSelectorAndProp.split("{");let cssSelector=mapTokens[0];if(!cssSelector&&onlyOne){cssSelector="*";this._m=1;this._hasMax=!0}this.parseMapping(mapTokens,cssSelector)})}setVal(e,target,map){if(!map.propSource){let defaultProp=this.getPropFromPath(e,"detail.value");if(!defaultProp)defaultProp=this.getPropFromPath(e,"target.value");this.commit(target,map,defaultProp)}else{this.commit(target,map,this.getPropFromPath(e,map.propSource))}}commit(target,map,val){target[map.propTarget]=val}getPropFromPath(val,path){if(!path)return val;return this.getPropFromPathTokens(val,path.split("."))}getPropFromPathTokens(val,pathTokens){let context=val;pathTokens.forEach(token=>{if(context)context=context[token]});return context}disconnectSiblingObserver(){if(this._siblingObserver)this._siblingObserver.disconnect()}}