import{PD}from"./p-d.js";export var PDX=function(_PD){babelHelpers.inherits(PDX,_PD);function PDX(){babelHelpers.classCallCheck(this,PDX);return babelHelpers.possibleConstructorReturn(this,(PDX.__proto__||Object.getPrototypeOf(PDX)).apply(this,arguments))}babelHelpers.createClass(PDX,[{key:"parseMapping",value:function parseMapping(mapTokens,cssSelector){var _this=this,splitPropPointer1=mapTokens[1].split(";");splitPropPointer1.forEach(function(token){var splitPropPointer=token.split(":");_this._cssPropMap.push({cssSelector:cssSelector,propTarget:splitPropPointer[0],propSource:0<splitPropPointer.length?splitPropPointer[1]:void 0})})}},{key:"commit",value:function commit(target,map,val){if("."===map.propSource&&"."===map.propTarget){Object.assign(target,val);return}var targetPath=map.propTarget;if(targetPath.startsWith(".")){var cssClass=targetPath.substr(1),method=val?"add":"remove";target.classList[method](cssClass)}else if(-1<targetPath.indexOf(".")){var pathTokens=targetPath.split(".");this.createNestedProp(target,pathTokens,val)}else{target[targetPath]=val}}},{key:"createNestedProp",value:function createNestedProp(target,pathTokens,val){var firstToken=pathTokens.shift(),tft=target[firstToken],returnObj=babelHelpers.defineProperty({},firstToken,tft?tft:{}),targetContext=returnObj[firstToken],lastToken=pathTokens.pop();pathTokens.forEach(function(token){var newContext=targetContext[token];if(!newContext){newContext=targetContext[token]={}}targetContext=newContext});targetContext[lastToken]=val;Object.assign(target,returnObj)}},{key:"attachEventListeners",value:function attachEventListeners(){var _this2=this;if("["!==this._on[0]){babelHelpers.get(PDX.prototype.__proto__||Object.getPrototypeOf(PDX.prototype),"attachEventListeners",this).call(this);return}var prevSibling=this.getPreviousSib();if(!prevSibling)return;var split=this._on.split(",").map(function(s){return s.substr(1,s.length-2)});this._attributeObserver=new MutationObserver(function(mutationRecords){var values={};split.forEach(function(attrib){values[attrib]=prevSibling.getAttribute(attrib)});_this2._handleEvent({mutationRecords:mutationRecords,values:values,target:prevSibling})});this._attributeObserver.observe(prevSibling,{attributes:!0,attributeFilter:split})}},{key:"disconnect",value:function disconnect(){if(this._attributeObserver)this._attributeObserver.disconnect()}},{key:"disconnectedCallback",value:function disconnectedCallback(){this.disconnect();babelHelpers.get(PDX.prototype.__proto__||Object.getPrototypeOf(PDX.prototype),"disconnectedCallback",this).call(this)}}],[{key:"is",get:function get(){return"p-d-x"}}]);return PDX}(PD);if(!customElements.get(PDX.is))customElements.define(PDX.is,PDX);