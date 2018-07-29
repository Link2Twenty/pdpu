(function(){var disabled="disabled";function XtallatX(superClass){return function(_superClass){babelHelpers.inherits(_class,_superClass);function _class(){var _this;babelHelpers.classCallCheck(this,_class);_this=babelHelpers.possibleConstructorReturn(this,(_class.__proto__||Object.getPrototypeOf(_class)).apply(this,arguments));_this._evCount={};return _this}babelHelpers.createClass(_class,[{key:"attr",value:function attr(name,val,trueVal){if(val){this.setAttribute(name,trueVal||val)}else{this.removeAttribute(name)}}},{key:"incAttr",value:function incAttr(name){var ec=this._evCount;if(name in ec){ec[name]++}else{ec[name]=0}this.attr(name,ec[name].toString())}},{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldVal,newVal){switch(name){case disabled:this._disabled=null!==newVal;break;}}},{key:"de",value:function de(name,detail){var eventName=name+"-changed",newEvent=new CustomEvent(eventName,{detail:detail,bubbles:!0,composed:!1});this.dispatchEvent(newEvent);this.incAttr(eventName);return newEvent}},{key:"_upgradeProperties",value:function _upgradeProperties(props){var _this2=this;props.forEach(function(prop){if(_this2.hasOwnProperty(prop)){var value=_this2[prop];delete _this2[prop];_this2[prop]=value}})}},{key:"disabled",get:function get(){return this._disabled},set:function set(val){this.attr(disabled,val,"")}}],[{key:"observedAttributes",get:function get(){return[disabled]}}]);return _class}(superClass)}var on="on",noblock="noblock",iff="if",to="to",P=function(_XtallatX){babelHelpers.inherits(P,_XtallatX);function P(){babelHelpers.classCallCheck(this,P);return babelHelpers.possibleConstructorReturn(this,(P.__proto__||Object.getPrototypeOf(P)).apply(this,arguments))}babelHelpers.createClass(P,[{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldVal,newVal){var f="_"+name;switch(name){case iff:case on:this[f]=newVal;break;case to:this._destIsNA="{NA}"===newVal;if(newVal.endsWith("}"))newVal+=";";this._to=newVal;this.parseTo();if(this._lastEvent)this._handleEvent(this._lastEvent);break;case noblock:this[f]=null!==newVal;}babelHelpers.get(P.prototype.__proto__||Object.getPrototypeOf(P.prototype),"attributeChangedCallback",this).call(this,name,oldVal,newVal)}},{key:"getPreviousSib",value:function getPreviousSib(){var prevSibling=this;while(prevSibling&&prevSibling.tagName.startsWith("P-")){prevSibling=prevSibling.previousElementSibling}return prevSibling}},{key:"connectedCallback",value:function connectedCallback(){var _this3=this;this._upgradeProperties([on,to,noblock,"input",iff]);setTimeout(function(){return _this3.doFake()},50)}},{key:"doFake",value:function doFake(){if(!this._if&&!this.hasAttribute("skip-init")){var lastEvent=this._lastEvent;if(!lastEvent){lastEvent={target:this.getPreviousSib(),isFake:!0}}if(this._handleEvent)this._handleEvent(lastEvent)}if(!this._addedSMO&&this.addMutationObserver){this.addMutationObserver(this,!1);this._addedSMO=!0}}},{key:"detach",value:function detach(prevSibling){prevSibling.removeEventListener(this._on,this._boundHandleEvent)}},{key:"disconnectedCallback",value:function disconnectedCallback(){var prevSibling=this.getPreviousSib();if(prevSibling&&this._boundHandleEvent)this.detach(prevSibling);this.disconnectSiblingObserver()}},{key:"_handleEvent",value:function _handleEvent(e){if(this.hasAttribute("debug"))debugger;if(!e)return;if(e.stopPropagation&&!this._noblock)e.stopPropagation();if(this._if&&!e.target.matches(this._if))return;this._lastEvent=e;if(!this._cssPropMap){return}this.pass(e)}},{key:"attachEventListeners",value:function attachEventListeners(){var attrFilters=[],prevSibling=this.getPreviousSib();if(!prevSibling)return;if("eval"===this._on&&"SCRIPT"===prevSibling.tagName){var evalObj=eval(prevSibling.innerHTML);if("function"===typeof evalObj){this._evalFn=evalObj;if(!this._destIsNA&&!this.hasAttribute("skip-init")){evalObj(this)}}else{this._handleEvent(evalObj)}}else{if(this._boundHandleEvent){return}else{this._boundHandleEvent=this._handleEvent.bind(this)}prevSibling.addEventListener(this._on,this._boundHandleEvent);prevSibling.removeAttribute("disabled")}}},{key:"onPropsChange",value:function onPropsChange(){if(!this._connected||!this._on||!this._to)return;this.attachEventListeners()}},{key:"parseMapping",value:function parseMapping(mapTokens,cssSelector){var splitPropPointer=mapTokens[1].split(":");this._cssPropMap.push({cssSelector:cssSelector,propTarget:splitPropPointer[0],propSource:0<splitPropPointer.length?splitPropPointer[1]:void 0})}},{key:"parseTo",value:function parseTo(){var _this4=this;if(this._cssPropMap&&this._to===this._lastTo)return;this._lastTo=this._to;this._cssPropMap=[];var splitPassDown=this._to.split("};"),onlyOne=2>=splitPassDown.length;splitPassDown.forEach(function(passDownSelectorAndProp){if(!passDownSelectorAndProp)return;var mapTokens=passDownSelectorAndProp.split("{"),cssSelector=mapTokens[0];if(!cssSelector&&onlyOne){cssSelector="*";_this4._m=1;_this4._hasMax=!0}_this4.parseMapping(mapTokens,cssSelector)})}},{key:"setVal",value:function setVal(e,target,map){var gpfp=this.getPropFromPath.bind(this),propFromEvent=map.propSource?gpfp(e,map.propSource):gpfp(e,"detail.value")||gpfp(e,"target.value");this.commit(target,map,propFromEvent)}},{key:"commit",value:function commit(target,map,val){target[map.propTarget]=val}},{key:"getPropFromPath",value:function getPropFromPath(val,path){if(!path||"."===path)return val;return this.getPropFromPathTokens(val,path.split("."))}},{key:"getPropFromPathTokens",value:function getPropFromPathTokens(val,pathTokens){var context=val,firstToken=!0,cp="composedPath";pathTokens.forEach(function(token){if(context){if(firstToken&&context[cp]){firstToken=!1;var cpath=token.split(cp+"_");if(1===cpath.length){context=context[cpath[0]]}else{context=context[cp]()[parseInt(cpath[1])];debugger}}else{context=context[token]}}});return context}},{key:"disconnectSiblingObserver",value:function disconnectSiblingObserver(){if(this._siblingObserver)this._siblingObserver.disconnect()}},{key:"on",get:function get(){return this._on},set:function set(val){this.attr(on,val)}},{key:"to",get:function get(){return this._to},set:function set(val){this.attr(to,val)}},{key:"noblock",get:function get(){return this._noblock},set:function set(val){this.attr(noblock,val,"")}},{key:"if",get:function get(){return this._if},set:function set(val){this.attr(iff,val)}},{key:"input",get:function get(){return this._input},set:function set(val){this._input=val;if(this._evalFn&&(!this._destIsNA||val&&!val.isFake)){var returnObj=this._evalFn(this);if(returnObj){this._handleEvent(returnObj)}}}}],[{key:"observedAttributes",get:function get(){return babelHelpers.get(P.__proto__||Object.getPrototypeOf(P),"observedAttributes",this).concat([on,to,noblock,iff])}}]);return P}(XtallatX(HTMLElement)),m="m",p_d_if="p-d-if",PDIf="PDIf",_addedSMO="_addedSMO",PD=function(_P){babelHelpers.inherits(PD,_P);function PD(){babelHelpers.classCallCheck(this,PD);return babelHelpers.possibleConstructorReturn(this,(PD.__proto__||Object.getPrototypeOf(PD)).apply(this,arguments))}babelHelpers.createClass(PD,[{key:"pass",value:function pass(e){this.passDown(this.nextElementSibling,e,0)}},{key:"passDown",value:function passDown(start,e,count){var _this5=this,nextSibling=start;while(nextSibling){if("SCRIPT"!==nextSibling.tagName){this._cssPropMap.forEach(function(map){if("*"===map.cssSelector||nextSibling.matches&&nextSibling.matches(map.cssSelector)){count++;_this5.setVal(e,nextSibling,map)}var fec=nextSibling.firstElementChild;if(_this5.id&&fec&&nextSibling.hasAttribute(p_d_if)){if(_this5.matches(nextSibling.getAttribute(p_d_if))){_this5.passDown(fec,e,count);var addedSMOTracker=nextSibling[_addedSMO];if(!addedSMOTracker)addedSMOTracker=nextSibling[_addedSMO]={};if(!addedSMOTracker[_this5.id]){_this5.addMutationObserver(nextSibling,!0);nextSibling[_addedSMO][_this5.id]=!0}}}});if(this._hasMax&&count>=this._m)break}nextSibling=nextSibling.nextElementSibling}}},{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldVal,newVal){switch(name){case m:if(null!==newVal){this._m=parseInt(newVal);this._hasMax=!0}else{this._hasMax=!1}}babelHelpers.get(PD.prototype.__proto__||Object.getPrototypeOf(PD.prototype),"attributeChangedCallback",this).call(this,name,oldVal,newVal);this.onPropsChange()}},{key:"connectedCallback",value:function connectedCallback(){babelHelpers.get(PD.prototype.__proto__||Object.getPrototypeOf(PD.prototype),"connectedCallback",this).call(this);this._upgradeProperties([m]);this._connected=!0;this.onPropsChange()}},{key:"addMutationObserver",value:function addMutationObserver(baseElement,isParent){var _this6=this,elementToObserve=isParent?baseElement:baseElement.parentElement;if(!elementToObserve)return;this._siblingObserver=new MutationObserver(function(){if(!_this6._lastEvent)return;_this6._handleEvent(_this6._lastEvent)});this._siblingObserver.observe(elementToObserve,{childList:!0})}},{key:"m",get:function get(){return this._m},set:function set(val){this.setAttribute(val.toString())}}],[{key:"is",get:function get(){return"p-d"}},{key:"observedAttributes",get:function get(){return babelHelpers.get(PD.__proto__||Object.getPrototypeOf(PD),"observedAttributes",this).concat([m])}}]);return PD}(P);if(!customElements.get(PD.is)){customElements.define(PD.is,PD)}var PDX=function(_PD){babelHelpers.inherits(PDX,_PD);function PDX(){babelHelpers.classCallCheck(this,PDX);return babelHelpers.possibleConstructorReturn(this,(PDX.__proto__||Object.getPrototypeOf(PDX)).apply(this,arguments))}babelHelpers.createClass(PDX,[{key:"parseMapping",value:function parseMapping(mapTokens,cssSelector){var _this7=this,splitPropPointer1=mapTokens[1].split(";");splitPropPointer1.forEach(function(token){var splitPropPointer=token.split(":");_this7._cssPropMap.push({cssSelector:cssSelector,propTarget:splitPropPointer[0],propSource:0<splitPropPointer.length?splitPropPointer[1]:void 0})})}},{key:"commit",value:function commit(target,map,val){if("."===map.propSource&&"."===map.propTarget){Object.assign(target,val);return}var targetPath=map.propTarget;if(targetPath.startsWith(".")){var cssClass=targetPath.substr(1),method=val?"add":"remove";target.classList[method](cssClass)}else if(-1<targetPath.indexOf(".")){var pathTokens=targetPath.split(".");this.createNestedProp(target,pathTokens,val)}else{target[targetPath]=val}}},{key:"createNestedProp",value:function createNestedProp(target,pathTokens,val){var firstToken=pathTokens.shift(),tft=target[firstToken],returnObj=babelHelpers.defineProperty({},firstToken,tft?tft:{}),targetContext=returnObj[firstToken],lastToken=pathTokens.pop();pathTokens.forEach(function(token){var newContext=targetContext[token];if(!newContext){newContext=targetContext[token]={}}targetContext=newContext});targetContext[lastToken]=val;Object.assign(target,returnObj)}},{key:"attachEventListeners",value:function attachEventListeners(){var _this8=this;if("["!==this._on[0]){babelHelpers.get(PDX.prototype.__proto__||Object.getPrototypeOf(PDX.prototype),"attachEventListeners",this).call(this);return}var prevSibling=this.getPreviousSib();if(!prevSibling)return;var split=this._on.split(",").map(function(s){return s.substr(1,s.length-2)});this._attributeObserver=new MutationObserver(function(mutationRecords){var values={};split.forEach(function(attrib){values[attrib]=prevSibling.getAttribute(attrib)});_this8._handleEvent({mutationRecords:mutationRecords,values:values,target:prevSibling})});this._attributeObserver.observe(prevSibling,{attributes:!0,attributeFilter:split})}},{key:"disconnect",value:function disconnect(){if(this._attributeObserver)this._attributeObserver.disconnect()}},{key:"disconnectedCallback",value:function disconnectedCallback(){this.disconnect();babelHelpers.get(PDX.prototype.__proto__||Object.getPrototypeOf(PDX.prototype),"disconnectedCallback",this).call(this)}}],[{key:"define",value:function define(name,fn){var newClass=function(_XtallatX2){babelHelpers.inherits(newClass,_XtallatX2);function newClass(){var _this9;babelHelpers.classCallCheck(this,newClass);_this9=babelHelpers.possibleConstructorReturn(this,(newClass.__proto__||Object.getPrototypeOf(newClass)).apply(this,arguments));_this9._connected=!1;return _this9}babelHelpers.createClass(newClass,[{key:"connectedCallback",value:function connectedCallback(){this._upgradeProperties(["input","disabled"]);this._connected=!0}},{key:"attributeChangedCallback",value:function attributeChangedCallback(name,oldVal,newVal){babelHelpers.get(newClass.prototype.__proto__||Object.getPrototypeOf(newClass.prototype),"attributeChangedCallback",this).call(this,name,oldVal,newVal);switch(name){case"input":this.input=JSON.parse(newVal);break;default:this.onPropsChange();}}},{key:"onPropsChange",value:function onPropsChange(){if(!this._disabled)return;this.de("value",{value:this.value})}},{key:"input",get:function get(){return this._input},set:function set(val){this._input=val;this.value=fn(val);this.onPropsChange()}}]);return newClass}(XtallatX(HTMLElement));customElements.define(name,newClass)}},{key:"is",get:function get(){return"p-d-x"}}]);return PDX}(PD);if(!customElements.get(PDX.is))customElements.define(PDX.is,PDX);var PU=function(_P2){babelHelpers.inherits(PU,_P2);function PU(){babelHelpers.classCallCheck(this,PU);return babelHelpers.possibleConstructorReturn(this,(PU.__proto__||Object.getPrototypeOf(PU)).apply(this,arguments))}babelHelpers.createClass(PU,[{key:"pass",value:function pass(e){var _this10=this;this._cssPropMap.forEach(function(map){var cssSel=map.cssSelector,targetElement,split=cssSel.split("/"),id=split[split.length-1];if(cssSel.startsWith("/")){targetElement=self[id]}else{var len=cssSel.startsWith("./")?0:split.length,host=_this10.getHost(_this10,0,split.length);if(host){if(host.shadowRoot){targetElement=host.shadowRoot.getElementById(id);if(!targetElement)targetElement=host.querySelector("#"+id)}else{targetElement=host.querySelector("#"+id)}}else{throw"Target Element Not found"}}_this10.setVal(e,targetElement,map)})}},{key:"getHost",value:function getHost(el,level,maxLevel){var parent=el;while(parent=parent.parentElement){if(11===parent.nodeType){var newLevel=level+1;if(newLevel>=maxLevel)return parent.host;return this.getHost(parent.host,newLevel,maxLevel)}else if("HTML"===parent.tagName){return parent}}}},{key:"connectedCallback",value:function connectedCallback(){babelHelpers.get(PU.prototype.__proto__||Object.getPrototypeOf(PU.prototype),"connectedCallback",this).call(this);this._connected=!0;this.onPropsChange()}}],[{key:"is",get:function get(){return"p-u"}}]);return PU}(P);if(!customElements.get(PU.is)){customElements.define(PU.is,PU)}var PDestal=function(_PDX){babelHelpers.inherits(PDestal,_PDX);function PDestal(){var _this11;babelHelpers.classCallCheck(this,PDestal);_this11=babelHelpers.possibleConstructorReturn(this,(PDestal.__proto__||Object.getPrototypeOf(PDestal)).apply(this,arguments));_this11._previousValues={};return _this11}babelHelpers.createClass(PDestal,[{key:"getPreviousSib",value:function getPreviousSib(){var parent=this;while(parent=parent.parentNode){if(11===parent.nodeType){return parent.host}else if(-1<parent.tagName.indexOf("-")){return parent}else if("HTML"===parent.tagName){this.watchLocation();return null}}this._useLocation}},{key:"doFakeEvent",value:function doFakeEvent(){var _this12=this,split=this._on.split(","),searchParams=new URLSearchParams(location.search),changedVal=!1;split.forEach(function(param){var trimmedParam=param.substr(1,param.length-2),searchParm=searchParams.get(trimmedParam);if(!changedVal&&searchParm!==_this12._previousValues[trimmedParam]){changedVal=!0}_this12._previousValues[trimmedParam]=searchParm});if(changedVal){var fakeEvent={target:this._previousValues};this._handleEvent(fakeEvent)}}},{key:"watchLocation",value:function watchLocation(){var _this13=this;window.addEventListener("popstate",function(){_this13.doFakeEvent()});this.doFakeEvent()}}],[{key:"is",get:function get(){return"p-destal"}}]);return PDestal}(PDX);if(!customElements.get(PDestal.is))customElements.define(PDestal.is,PDestal);var PS=function(_PDX2){babelHelpers.inherits(PS,_PDX2);function PS(){babelHelpers.classCallCheck(this,PS);return babelHelpers.possibleConstructorReturn(this,(PS.__proto__||Object.getPrototypeOf(PS)).apply(this,arguments))}babelHelpers.createClass(PS,[{key:"pass",value:function pass(e){this.passDown(e.target,e,0)}}],[{key:"is",get:function get(){return"p-s"}}]);return PS}(PDX);if(!customElements.get(PS.is))customElements.define(PS.is,PS)})();