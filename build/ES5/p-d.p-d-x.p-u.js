(function(){var disabled="disabled";function XtallatX(superClass){return function(_superClass){babelHelpers.inherits(_class,_superClass);function _class(){babelHelpers.classCallCheck(this,_class);return babelHelpers.possibleConstructorReturn(this,(_class.__proto__||Object.getPrototypeOf(_class)).apply(this,arguments))}babelHelpers.createClass(_class,[{key:"attr",value:function attr(name,val,trueVal){if(val){this.setAttribute(name,trueVal||val)}else{this.removeAttribute(name)}}},{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldVal,newVal){switch(name){case disabled:this._disabled=null!==newVal;break;}}},{key:"de",value:function de(name,detail){var newEvent=new CustomEvent(name+"-changed",{detail:detail,bubbles:!0,composed:!1});this.dispatchEvent(newEvent);return newEvent}},{key:"_upgradeProperties",value:function _upgradeProperties(props){var _this=this;props.forEach(function(prop){if(_this.hasOwnProperty(prop)){var value=_this[prop];delete _this[prop];_this[prop]=value}})}},{key:"disabled",get:function get(){return this._disabled},set:function set(val){this.attr(disabled,val,"")}}],[{key:"observedAttributes",get:function get(){return[disabled]}}]);return _class}(superClass)}var on="on",noblock="noblock",noinit="noinit",to="to",P=function(_XtallatX){babelHelpers.inherits(P,_XtallatX);function P(){babelHelpers.classCallCheck(this,P);return babelHelpers.possibleConstructorReturn(this,(P.__proto__||Object.getPrototypeOf(P)).apply(this,arguments))}babelHelpers.createClass(P,[{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldVal,newVal){switch(name){case on:this._on=newVal;break;case to:if(newVal.endsWith("}"))newVal+=";";this._to=newVal;this.parseTo();if(this._lastEvent)this._handleEvent(this._lastEvent);break;case noinit:case noblock:this["_"+name]=null!==newVal;}babelHelpers.get(P.prototype.__proto__||Object.getPrototypeOf(P.prototype),"attributeChangedCallback",this).call(this,name,oldVal,newVal)}},{key:"getPreviousSib",value:function getPreviousSib(){var prevSibling=this;while(prevSibling&&prevSibling.tagName.startsWith("P-")){prevSibling=prevSibling.previousElementSibling}return prevSibling}},{key:"connectedCallback",value:function connectedCallback(){var _this2=this;this._upgradeProperties([on,to,noblock,"input"]);setTimeout(function(){return _this2.doFake()},50)}},{key:"doFake",value:function doFake(){if(!this._noinit){var lastEvent=this._lastEvent;if(!lastEvent){lastEvent={target:this.getPreviousSib()}}if(this._handleEvent)this._handleEvent(lastEvent)}if(!this._addedSMO&&this.addMutationObserver){this.addMutationObserver(this,!1);this._addedSMO=!0}}},{key:"detach",value:function detach(prevSibling){prevSibling.removeEventListener(this._on,this._boundHandleEvent)}},{key:"disconnectedCallback",value:function disconnectedCallback(){var prevSibling=this.getPreviousSib();if(prevSibling&&this._boundHandleEvent)this.detach(prevSibling);this.disconnectSiblingObserver()}},{key:"_handleEvent",value:function _handleEvent(e){if(!e)return;if(e.stopPropagation&&!this._noblock)e.stopPropagation();this._lastEvent=e;if(!this._cssPropMap){return}this.pass(e)}},{key:"attachEventListeners",value:function attachEventListeners(){var attrFilters=[],prevSibling=this.getPreviousSib();if("eval"===this._on&&"SCRIPT"===prevSibling.tagName){var evalObj=eval(prevSibling.innerText);if("function"===typeof evalObj){this._evalFn=evalObj;evalObj(this)}else{this._handleEvent(evalObj)}}else{if(this._boundHandleEvent){return}else{this._boundHandleEvent=this._handleEvent.bind(this)}prevSibling.addEventListener(this._on,this._boundHandleEvent);prevSibling.removeAttribute("disabled")}}},{key:"onPropsChange",value:function onPropsChange(){if(!this._connected||!this._on||!this._to)return;this.attachEventListeners()}},{key:"parseMapping",value:function parseMapping(mapTokens,cssSelector){var splitPropPointer=mapTokens[1].split(":");this._cssPropMap.push({cssSelector:cssSelector,propTarget:splitPropPointer[0],propSource:0<splitPropPointer.length?splitPropPointer[1]:null})}},{key:"parseTo",value:function parseTo(){var _this3=this;if(this._cssPropMap&&this._to===this._lastTo)return;this._lastTo=this._to;this._cssPropMap=[];var splitPassDown=this._to.split("};"),onlyOne=2>=splitPassDown.length;splitPassDown.forEach(function(passDownSelectorAndProp){if(!passDownSelectorAndProp)return;var mapTokens=passDownSelectorAndProp.split("{"),cssSelector=mapTokens[0];if(!cssSelector&&onlyOne){cssSelector="*";_this3._m=1;_this3._hasMax=!0}_this3.parseMapping(mapTokens,cssSelector)})}},{key:"setVal",value:function setVal(e,target,map){if(!map.propSource){var defaultProp=this.getPropFromPath(e,"detail.value");if(!defaultProp)defaultProp=this.getPropFromPath(e,"target.value");this.commit(target,map,defaultProp)}else{this.commit(target,map,this.getPropFromPath(e,map.propSource))}}},{key:"commit",value:function commit(target,map,val){target[map.propTarget]=val}},{key:"getPropFromPath",value:function getPropFromPath(val,path){if(!path)return val;return this.getPropFromPathTokens(val,path.split("."))}},{key:"getPropFromPathTokens",value:function getPropFromPathTokens(val,pathTokens){var context=val;pathTokens.forEach(function(token){if(context)context=context[token]});return context}},{key:"disconnectSiblingObserver",value:function disconnectSiblingObserver(){if(this._siblingObserver)this._siblingObserver.disconnect()}},{key:"on",get:function get(){return this._on},set:function set(val){this.attr(on,val)}},{key:"to",get:function get(){return this._to},set:function set(val){this.attr(to,val)}},{key:"noblock",get:function get(){return this._noblock},set:function set(val){this.attr(noblock,val,"")}},{key:"noinit",get:function get(){return this._noinit},set:function set(val){this.attr(noinit,val,"")}},{key:"input",get:function get(){return this._input},set:function set(val){this._input=val;if(this._evalFn)this._evalFn(this)}}],[{key:"observedAttributes",get:function get(){return babelHelpers.get(P.__proto__||Object.getPrototypeOf(P),"observedAttributes",this).concat([on,to,noblock,noinit])}}]);return P}(XtallatX(HTMLElement)),m="m",p_d_if="p-d-if",PDIf="PDIf",_addedSMO="_addedSMO",PD=function(_P){babelHelpers.inherits(PD,_P);function PD(){babelHelpers.classCallCheck(this,PD);return babelHelpers.possibleConstructorReturn(this,(PD.__proto__||Object.getPrototypeOf(PD)).apply(this,arguments))}babelHelpers.createClass(PD,[{key:"pass",value:function pass(e){this.passDown(this.nextElementSibling,e,0)}},{key:"passDown",value:function passDown(start,e,count){var _this4=this,nextSibling=start;while(nextSibling){this._cssPropMap.forEach(function(map){if(!map.cssSelector)debugger;if("*"===map.cssSelector||nextSibling.matches&&nextSibling.matches(map.cssSelector)){count++;_this4.setVal(e,nextSibling,map)}var fec=nextSibling.firstElementChild;if(_this4.id&&fec&&nextSibling.hasAttribute(p_d_if)){if(_this4.matches(nextSibling.getAttribute(p_d_if))){_this4.passDown(fec,e,count);var addedSMOTracker=nextSibling[_addedSMO];if(!addedSMOTracker)addedSMOTracker=nextSibling[_addedSMO]={};if(!addedSMOTracker[_this4.id]){_this4.addMutationObserver(nextSibling,!0);nextSibling[_addedSMO][_this4.id]=!0}}}});if(this._hasMax&&count>=this._m)break;nextSibling=nextSibling.nextElementSibling}}},{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldVal,newVal){switch(name){case m:if(null!==newVal){this._m=parseInt(newVal);this._hasMax=!0}else{this._hasMax=!1}}babelHelpers.get(PD.prototype.__proto__||Object.getPrototypeOf(PD.prototype),"attributeChangedCallback",this).call(this,name,oldVal,newVal);this.onPropsChange()}},{key:"connectedCallback",value:function connectedCallback(){babelHelpers.get(PD.prototype.__proto__||Object.getPrototypeOf(PD.prototype),"connectedCallback",this).call(this);this._upgradeProperties([m]);this._connected=!0;this.onPropsChange()}},{key:"addMutationObserver",value:function addMutationObserver(baseElement,isParent){var _this5=this,elementToObserve=isParent?baseElement:baseElement.parentElement;if(!elementToObserve)return;this._siblingObserver=new MutationObserver(function(){if(!_this5._lastEvent)return;_this5._handleEvent(_this5._lastEvent)});this._siblingObserver.observe(elementToObserve,{childList:!0})}},{key:"m",get:function get(){return this._m},set:function set(val){this.setAttribute(val.toString())}}],[{key:"is",get:function get(){return"p-d"}},{key:"observedAttributes",get:function get(){return babelHelpers.get(PD.__proto__||Object.getPrototypeOf(PD),"observedAttributes",this).concat([m])}}]);return PD}(P);if(!customElements.get(PD.is)){customElements.define(PD.is,PD)}var PDX=function(_PD){babelHelpers.inherits(PDX,_PD);function PDX(){babelHelpers.classCallCheck(this,PDX);return babelHelpers.possibleConstructorReturn(this,(PDX.__proto__||Object.getPrototypeOf(PDX)).apply(this,arguments))}babelHelpers.createClass(PDX,[{key:"parseMapping",value:function parseMapping(mapTokens,cssSelector){var _this6=this,splitPropPointer1=mapTokens[1].split(";");splitPropPointer1.forEach(function(token){var splitPropPointer=token.split(":");_this6._cssPropMap.push({cssSelector:cssSelector,propTarget:splitPropPointer[0],propSource:0<splitPropPointer.length?splitPropPointer[1]:null})})}},{key:"commit",value:function commit(target,map,val){var targetPath=map.propTarget;if(targetPath.startsWith(".")){var cssClass=targetPath.substr(1),method=val?"add":"remove";target.classList[method](cssClass)}else if(-1<targetPath.indexOf(".")){var pathTokens=targetPath.split("."),lastToken=pathTokens.pop();this.getPropFromPathTokens(target,pathTokens)[lastToken]=val}else{target[targetPath]=val}}},{key:"_handleEvent",value:function _handleEvent(e){if(this.hasAttribute("debug"))debugger;babelHelpers.get(PDX.prototype.__proto__||Object.getPrototypeOf(PDX.prototype),"_handleEvent",this).call(this,e)}},{key:"attachEventListeners",value:function attachEventListeners(){if(!this._on.startsWith("@")){babelHelpers.get(PDX.prototype.__proto__||Object.getPrototypeOf(PDX.prototype),"attachEventListeners",this).call(this);return}var split=this._on.split(",").map(function(token){return token.substr(1)}),prevSibling=this.getPreviousSib();this._attributeObserver=new MutationObserver(function(mutationRecords){});this._attributeObserver.observe(prevSibling,{attributes:!0,attributeFilter:split})}},{key:"disconnect",value:function disconnect(){if(this._attributeObserver)this._attributeObserver.disconnect()}},{key:"disconnectedCallback",value:function disconnectedCallback(){this.disconnect();babelHelpers.get(PDX.prototype.__proto__||Object.getPrototypeOf(PDX.prototype),"disconnectedCallback",this).call(this)}}],[{key:"is",get:function get(){return"p-d-x"}}]);return PDX}(PD);if(!customElements.get(PDX.is))customElements.define(PDX.is,PDX);var PU=function(_P2){babelHelpers.inherits(PU,_P2);function PU(){babelHelpers.classCallCheck(this,PU);return babelHelpers.possibleConstructorReturn(this,(PU.__proto__||Object.getPrototypeOf(PU)).apply(this,arguments))}babelHelpers.createClass(PU,[{key:"pass",value:function pass(e){var _this7=this;this._cssPropMap.forEach(function(map){var cssSel=map.cssSelector,targetElement;if(cssSel.startsWith("/")){targetElement=self[cssSel.substr(1)]}else{var split=cssSel.split("/"),id=split[split.length-1],host=_this7.getHost(_this7,0,split.length);if(host){if(host.shadowRoot){targetElement=host.shadowRoot.getElementById(id);if(!targetElement)targetElement=host.getElementById(id)}else{targetElement=host.getElementById(id)}}}if(targetElement){_this7.setVal(e,targetElement,map)}})}},{key:"getHost",value:function getHost(el,level,maxLevel){var parent;do{parent=el.parentNode;if(11===parent.nodeType){var newLevel=level+1;if(newLevel===maxLevel)return parent.host;return this.getHost(parent.host,newLevel,maxLevel)}else if("BODY"===parent.tagName){return parent}}while(parent)}},{key:"connectedCallback",value:function connectedCallback(){babelHelpers.get(PU.prototype.__proto__||Object.getPrototypeOf(PU.prototype),"connectedCallback",this).call(this);this._connected=!0;this.onPropsChange()}}],[{key:"is",get:function get(){return"p-u"}}]);return PU}(P);if(!customElements.get(PU.is)){customElements.define(PU.is,PU)}})();