import{P}from"./p.js";const m="m",p_d_if="p-d-if",PDIf="PDIf",_addedSMO="_addedSMO";export class PD extends P{static get is(){return"p-d"}get m(){return this._m}set m(val){this.setAttribute(val.toString())}static get observedAttributes(){return super.observedAttributes.concat([m])}detach(prevSibling){prevSibling.removeEventListener(this._on,this._boundHandleEvent)}pass(e){this.passDown(this.nextElementSibling,e,0)}passDown(start,e,count){let nextSibling=start;console.log(start);while(nextSibling){this._cssPropMap.forEach(map=>{if(!map.cssSelector)debugger;if("*"===map.cssSelector||nextSibling.matches&&nextSibling.matches(map.cssSelector)){count++;this.setVal(e,nextSibling,map)}const fec=nextSibling.firstElementChild;if(this.id&&fec&&nextSibling.hasAttribute(p_d_if)){if(this.matches(nextSibling.getAttribute(p_d_if))){this.passDown(fec,e,count);let addedSMOTracker=nextSibling[_addedSMO];if(!addedSMOTracker)addedSMOTracker=nextSibling[_addedSMO]={};if(!addedSMOTracker[this.id]){this.addMutationObserver(fec);nextSibling[_addedSMO][this.id]=!0}}}});if(this._hasMax&&count>=this._m)break;nextSibling=nextSibling.nextElementSibling}}attributeChangedCallback(name,oldVal,newVal){switch(name){case m:if(null!==newVal){this._m=parseInt(newVal);this._hasMax=!0}else{this._hasMax=!1}}super.attributeChangedCallback(name,oldVal,newVal);this.onPropsChange()}connectedCallback(){super.connectedCallback();this._upgradeProperties([m]);this._connected=!0;this.onPropsChange()}onPropsChange(){if(!this._connected||!this._on||!this._to)return;this.attachEventListeners()}addMutationObserver(baseElement){if(!baseElement.parentElement)return;this._siblingObserver=new MutationObserver(()=>{if(!this._lastEvent)return;this._handleEvent(this._lastEvent)});this._siblingObserver.observe(this.parentElement,{childList:!0})}}if(!customElements.get(PD.is)){customElements.define(PD.is,PD)}