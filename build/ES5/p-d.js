import{P}from"./p.js";var m="m",p_d_if="p-d-if",PDIf="PDIf",_addedSMO="_addedSMO";export var PD=function(_P){babelHelpers.inherits(PD,_P);function PD(){babelHelpers.classCallCheck(this,PD);return babelHelpers.possibleConstructorReturn(this,(PD.__proto__||Object.getPrototypeOf(PD)).apply(this,arguments))}babelHelpers.createClass(PD,[{key:"detach",value:function detach(prevSibling){prevSibling.removeEventListener(this._on,this._boundHandleEvent)}},{key:"pass",value:function pass(e){this.passDown(this.nextElementSibling,e,0)}},{key:"passDown",value:function passDown(start,e,count){var _this=this,nextSibling=start;while(nextSibling){this._cssPropMap.forEach(function(map){if(!map.cssSelector)debugger;if("*"===map.cssSelector||nextSibling.matches&&nextSibling.matches(map.cssSelector)){count++;_this.setVal(e,nextSibling,map)}var fec=nextSibling.firstElementChild;if(_this.id&&fec&&nextSibling.hasAttribute(p_d_if)){if(_this.matches(nextSibling.getAttribute(p_d_if))){_this.passDown(fec,e,count);var addedSMOTracker=nextSibling[_addedSMO];if(!addedSMOTracker)addedSMOTracker=nextSibling[_addedSMO]={};if(!addedSMOTracker[_this.id]){_this.addMutationObserver(fec);nextSibling[_addedSMO][_this.id]=!0}}}});if(this._hasMax&&count>=this._m)break;nextSibling=nextSibling.nextElementSibling}}},{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldVal,newVal){switch(name){case m:if(null!==newVal){this._m=parseInt(newVal);this._hasMax=!0}else{this._hasMax=!1}}babelHelpers.get(PD.prototype.__proto__||Object.getPrototypeOf(PD.prototype),"attributeChangedCallback",this).call(this,name,oldVal,newVal);this.onPropsChange()}},{key:"connectedCallback",value:function connectedCallback(){babelHelpers.get(PD.prototype.__proto__||Object.getPrototypeOf(PD.prototype),"connectedCallback",this).call(this);this._upgradeProperties([m]);this._connected=!0;this.onPropsChange()}},{key:"addMutationObserver",value:function addMutationObserver(baseElement){var _this2=this;if(!baseElement.parentElement)return;this._siblingObserver=new MutationObserver(function(){if(!_this2._lastEvent)return;_this2._handleEvent(_this2._lastEvent)});this._siblingObserver.observe(this.parentElement,{childList:!0})}},{key:"m",get:function get(){return this._m},set:function set(val){this.setAttribute(val.toString())}}],[{key:"is",get:function get(){return"p-d"}},{key:"observedAttributes",get:function get(){return babelHelpers.get(PD.__proto__||Object.getPrototypeOf(PD),"observedAttributes",this).concat([m])}}]);return PD}(P);if(!customElements.get(PD.is)){customElements.define(PD.is,PD)}