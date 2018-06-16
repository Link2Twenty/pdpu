import{XtallatX}from"./node_modules/xtal-latx/xtal-latx.js";var on="on",noblock="noblock",to="to";export var P=function(_XtallatX){babelHelpers.inherits(P,_XtallatX);function P(){babelHelpers.classCallCheck(this,P);return babelHelpers.possibleConstructorReturn(this,(P.__proto__||Object.getPrototypeOf(P)).apply(this,arguments))}babelHelpers.createClass(P,[{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldVal,newVal){switch(name){case on:this._on=newVal;break;case to:if(newVal.endsWith("}"))newVal+=";";this._to=newVal;this.parseTo();if(this._lastEvent)this._handleEvent(this._lastEvent);break;case noblock:this._noblock=null!==newVal;}babelHelpers.get(P.prototype.__proto__||Object.getPrototypeOf(P.prototype),"attributeChangedCallback",this).call(this,name,oldVal,newVal)}},{key:"getPreviousSib",value:function getPreviousSib(){var prevSibling=this;while(prevSibling&&"P-D"===prevSibling.tagName){prevSibling=prevSibling.previousElementSibling}return prevSibling}},{key:"connectedCallback",value:function connectedCallback(){this._upgradeProperties([on,to,noblock])}},{key:"disconnectedCallback",value:function disconnectedCallback(){var prevSibling=this.getPreviousSib();if(prevSibling&&this._boundHandleEvent)this.detach(prevSibling);this.disconnectSiblingObserver()}},{key:"_handleEvent",value:function _handleEvent(e){if(e.stopPropagation&&!this._noblock)e.stopPropagation();this._lastEvent=e;if(!this._cssPropMap){return}this.pass(e)}},{key:"attachEventListeners",value:function attachEventListeners(){var attrFilters=[],prevSibling=this.getPreviousSib();if("eval"===this._on&&"SCRIPT"===prevSibling.tagName){var evalObj=eval(prevSibling.innerText);this._handleEvent(evalObj)}else{if(this._boundHandleEvent){return}else{this._boundHandleEvent=this._handleEvent.bind(this)}this._handleEvent({target:prevSibling});prevSibling.addEventListener(this._on,this._boundHandleEvent);prevSibling.removeAttribute("disabled")}}},{key:"parseTo",value:function parseTo(){var _this=this;if(this._cssPropMap&&this._to===this._lastTo)return;this._lastTo=this._to;this._cssPropMap=[];var splitPassDown=this._to.split("};");splitPassDown.forEach(function(passDownSelectorAndProp){if(!passDownSelectorAndProp)return;var mapTokens=passDownSelectorAndProp.split("{"),splitPropPointer=mapTokens[1].split(":"),cssSelector=mapTokens[0];if(!cssSelector){cssSelector="*";_this._m=1;_this._hasMax=!0}_this._cssPropMap.push({cssSelector:cssSelector,propTarget:splitPropPointer[0],propSource:0<splitPropPointer.length?splitPropPointer[1]:null})});if(!this._addedSMO){this.addMutationObserver(this);this._addedSMO=!0}}},{key:"setVal",value:function setVal(e,target,map){if(!map.propSource){var defaultProp=this.getPropFromPath(e,"detail.value");if(!defaultProp)defaultProp=this.getPropFromPath(e,"target.value");target[map.propTarget]=defaultProp}else{target[map.propTarget]=this.getPropFromPath(e,map.propSource)}}},{key:"getPropFromPath",value:function getPropFromPath(val,path){if(!path)return val;var context=val;path.split(".").forEach(function(token){if(context)context=context[token]});return context}},{key:"disconnectSiblingObserver",value:function disconnectSiblingObserver(){if(this._siblingObserver)this._siblingObserver.disconnect()}},{key:"on",get:function get(){return this._on},set:function set(val){this.setAttribute(on,val)}},{key:"to",get:function get(){return this._to},set:function set(val){this.setAttribute(to,val)}},{key:"noblock",get:function get(){return this._noblock},set:function set(val){if(val){this.setAttribute(noblock,"")}else{this.removeAttribute(noblock)}}}],[{key:"observedAttributes",get:function get(){return babelHelpers.get(P.__proto__||Object.getPrototypeOf(P),"observedAttributes",this).concat([on,to,noblock])}}]);return P}(XtallatX(HTMLElement));