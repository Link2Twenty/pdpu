[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/p-d.p-u)

<a href="https://nodei.co/npm/p-d.p-u/"><img src="https://nodei.co/npm/p-d.p-u.png"></a>

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/p-d.p-u@0.0.78/dist/p-d.iife.min.js?compression=gzip">

# \<p-d\>, \<p-u\>


This package contains two primary custom elements:  p-d and p-u, which stand for "pass down" and "pass up."

These two components dream the impossible dream -- be able to progressively, declaratively, glue native DOM / web components together, regardless of how the elements got there.

Use cases:

1.  If you just need to connect some elements of a mostly static or server-rendered web site, these components provide a light weight way of doing that.
2.  These components allow you to keep code-centric **builds** at bay as much as possible.  Why is this important?  Because browsers can process HTML signicantly faster than JS.  That doesn't mean you have to edit HTML files.  Theoretically, you could edit in JavaScript and benefit from the tooling (type checks, etc), but compile to HTML for optimum performance.  

Both p-d and p-u have an attribute/property, "on" that specifies an event to monitor for.  They both attach an event listener for the specified event to the previous (non p-*) element.

When this event monitoring is enabled, if the previous element is disabled, the disabled attribute is removed (more on that later).

##  Downward flow amongst siblings with p-d. 

p-d  passes information from that previous sibling's event down the p-d instance's sibling list.  It stops event propagation (by default).  Sample markup is shown below: 

```html
<!--- verbose syntax -->
<div style="display:grid">
    <input/>                                                                    
    <p-d on="input" to="url-builder" prop="input" val="target.value" m="1"></p-d>
    <url-builder prepend="api/allEmployees?startsWith="></url-builder>    
    <p-d on="value-changed" to="fetch-data" prop="url" val="detail.value" m="1"></p-d>
    <fetch-data></fetch-data>                                                   
    <p-d on="fetch-complete" to="my-filter" prop="input" val="detail.value" m="2"></p-d>
    <my-filter select="isActive"></my-filter>                                   
    <p-d on="value-changed"  to="#activeList" prop="items" val="detail.value" m="1"></p-d>
    <my-filter select="!isActive"></my-filter>                                  
    <p-d on="value-changed"  to="#inactiveList" prop="items" val="target.value" m="1"></p-d>
    <h3>Active</h3>
    <my-grid id="activeList"></my-grid>
    <h3>Inactive</h3>
    <my-grid id="inactiveList"><my-grid>
</div>
```

##  The anatomy of the p-d attributes / properties.

"m" is an optional attribute/property that indicates the maximum number of matching elements that are expected to be found.  If not specified, all the downstream siblings are checked, which can be wasteful.

"on" specifies the name of the event to listen for.

"to" is a css selector, similar to css selectors in a css file.  Only the way that selector is used is as a test on each of the next siblings after the p-d element.  The code uses the "matches" method to test each element for a match.

"prop" refers to the name of a property on the matching elements which need setting.  

"val" is a JavaScript path / expression for where to get the value used for setting.  The path is evaluated from the JavaScript event that gets fired.  Only very simple "a.b.c" type expressions are allowed.  No ! or other JavaScript expressions is currently supported.  If the path is a single ., then it will pass the entire event object.

All the components described in this document support an attribute (not a property), "debug".  If the attribute is present, the code will break everytime the event it is monitoring for fires.

##  But what if the way my elements should display isn't related to how data should flow?

Note that we are suggesting, in the markup above, the use of the CSS grid (display: grid).  The CSS grid allows you to specify where each element inside the CSS Grid container should be displayed.

It appears that the css flex/grid doesn't count elements with display:none as columns or rows.  So all the non visual components, which haven't seen the light on the benefit of setting display:none, could be marked with an attribute, nv (non visual) and apply a style for them, i.e.: 

```html
<style>
[nv]{
    display: none;
}
</style>
```

Since p-* are all non visual components, they are given display:none style by default.

Another benefit of making this explicit:  There is likely less overhead from components with display:none, as they may not get added to the [rendering tree](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Render_tree_construction).



## Compact notation
One can't help noticing quite a bit of redundancy in the markup above.  We can reduce this redundancy if we apply some default settings.

1)  If no css specifier is defined, it will pass the properties to the next element.
2)  If no value is specified, it will see if detail.value exists.  If not it will try target.value.  

What we end up with is shown below:

```html
<!-- abreviated syntax -->
<style>
[nv]{
    display:none;
}
</style>
<div style="display:grid">
    <input/>                                                                    
    <p-d on="input" prop="input"></p-d>
    <url-builder prepend="api/allEmployees?startsWith=" nv></url-builder>   
    <p-d on="value-changed"  prop="url"></p-d>
    <fetch-data></fetch-data>                                                   
    <p-d on="fetch-complete" to="my-filter" prop="input" m="2"></p-d>
    <my-filter select="isActive" nv></my-filter>                                   
    <p-d on="value-changed"  to="#activeList" prop="items" m="1"></p-d>
    <my-filter select="!isActive" nv></my-filter>                                  
    <p-d on="value-changed"  to="#inactiveList" prop="items" m="1"></p-d>
    <h3>Active</h3>
    <my-grid id="activeList"></my-grid>
    <h3>Inactive</h3>
    <my-grid id="inactiveList"><my-grid>
</div>
```

## Recursive sibling drilldown with p-d-r -- Invitation Only

To keep performance optimal and scalable, the p-d element only tests downstream siblings -- not children of siblings.  However, the use case for being able to drilldown inside a DOM node is quite high.  Unlike Polymer, permission to do this must be granted explicitly, using the p-d-if attribute on elements where drilldown is needed.  The value of the attribute is used to test against the p-d element (hence you will want to specify some marker, like an ID, on the p-d element, which can be used to validate the invitation.)

```html   
    <text-box></text-box>                                                               
    <p-d-r id="myPassDownTag" on="input" to="url-builder" prop="input"></p-d-r>
    <h3>Search Employees</h3>
    <div p-d-if="#myPassDownTag">
        <url-builder></url-builder>
        <my-filter></my-filter>
    </div>
```

<!--
```
<custom-element-demo>
  <template>
    <div>
  
    <xtal-state-watch watch level="global"></xtal-state-watch>
    <p-d on="history-changed" to="xtal-tree" prop="firstVisibleIndex" val="target.history.firstVisibleIndex"></p-d>
    <h3>Basic xtal-tree demo</h3>
   
    <!--   Expand All / Collapse All / Sort  / Search Buttons -->
    
    <button disabled data-expand-cmd="allExpandedNodes">Expand All</button>
    <p-d on="click" to="xtal-tree" prop="expandCmd" val="target.dataset.expandCmd" m="1" skip-init></p-d>
    <button disabled data-expand-cmd="allCollapsedNodes">Collapse All</button>
    <p-d on="click" to="xtal-tree" prop="expandCmd" val="target.dataset.expandCmd" m="1" skip-init></p-d>
    <button disabled data-dir="asc">Sort Asc</button>
    <p-d on="click" to="xtal-tree" prop="sorted" val="target.dataset.dir" m="1" skip-init></p-d>
    <button disabled data-dir="desc">Sort Desc</button>
    <p-d on="click" to="xtal-tree" prop="sorted" val="target.dataset.dir" m="1" skip-init></p-d>
    <input disabled type="text" placeholder="Search">
    <p-d-r on="input" to="xtal-split" prop="search" val="target.value"></p-d-r>
    <p-d on="input" to="xtal-tree" prop="searchString" val="target.value"></p-d>

    <!-- ================= Get Sample JSON with Tree Structure (File Directory), Pass to xtal-tree -->
    <xtal-fetch fetch href="https://unpkg.com/xtal-tree@0.0.34/demo/directory.json" as="json"></xtal-fetch>
    <!-- =================  Pass JSON object to xtal-tree for processing ========================= -->
    <p-d on="fetch-complete" to="xtal-tree" prop="nodes" val="target.value" m="1"></p-d>

    <!-- ================= Train xtal-tree how to expand / collapse nodes ========================= -->
    <xtal-deco>
      <script nomodule>
        ({
          childrenFn: node => node.children,
          isOpenFn: node => node.expanded,
          levelSetterFn: function (nodes, level) {
            nodes.forEach(node => {
              node.style = 'margin-left:' + (level * 12) + 'px';
              if (node.children) this.levelSetterFn(node.children, level + 1)
            })
          },
          toggleNodeFn: node => {
            node.expanded = !node.expanded;
          },
          testNodeFn: (node, search) => {
            if (!search) return true;
            if (!node.nameLC) node.nameLC = node.name.toLowerCase();
            return node.nameLC.indexOf(search.toLowerCase()) > -1;
          },
          compareFn: (lhs, rhs) => {
            if (lhs.name < rhs.name) return -1;
            if (lhs.name > rhs.name) return 1;
            return 0;
          },
          props:{
              expandCmd: '',
              fistVisibleIndex: -1
            },
            onPropsChange(name, newVal){
              switch(name){
                case 'expandCmd':
                  this[this.expandCmd] = this.viewableNodes;
                  break;
                  
              }
            }
        })
      </script>
    </xtal-deco>
    <xtal-tree id="myTree"></xtal-tree>
    <p-d on="viewable-nodes-changed" to="iron-list" prop="items" val="target.viewableNodes" m="1"></p-d>
    <p-d on="viewable-nodes-changed" to="iron-list" prop="newFirstVisibleIndex" val="target.firstVisibleIndex" m="1"></p-d>
    <!-- ==============  Styling of iron-list ================== -->
    <style>
      div.node {
        cursor: pointer;
      }

      span.match {
        font-weight: bold;
        background-color: yellowgreen;
      }

      span[data-has-children="1"][data-is-expanded="1"]::after{
        content: "📖";
      }

      span[data-has-children="1"][data-is-expanded="-1"]::after{
        content: "📕";
      }

      span[data-has-children="-1"]::after{
        content: "📝";
      }
    </style>
    
    <xtal-deco><script nomodule>
      ({
        props: {
          newFirstVisibleIndex: -1,
        },
        onPropsChange: function (name, newVal) {
          switch (name) {
            case 'newFirstVisibleIndex':
              if(!this.items || this.newFirstVisibleIndex < 0) return;
              this.scrollToIndex(this.newFirstVisibleIndex);
          }
        }
      })
    </script></xtal-deco>
    <iron-list style="height:400px;overflow-x:hidden" id="nodeList" mutable-data p-d-if="p-d-r">
      <template>
        <div class="node" style$="[[item.style]]" p-d-if="p-d-r">
          <span node="[[item]]" p-d-if="p-d-r">
            <if-diff if="[[item.children]]" tag="hasChildren" m="1"></if-diff>
            <if-diff if="[[item.expanded]]" tag="isExpanded" m="1"></if-diff>
            <span data-has-children="-1" data-is-expanded="-1" node="[[item]]"></span>
          </span>
          <p-u on="click" to="myTree" prop="toggledNode" val="target.node" skip-init></p-u>
          <xtal-split node="[[item]]" search="[[search]]" text-content="[[item.name]]"></xtal-split>
          <p-u on="click" to="myTree" prop="toggledNode" val="target.node" skip-init></p-u>
          
        </div>
      </template>
    </iron-list>
    <p-d on="scroll" to="xtal-state-commit" prop="history" val="target.firstVisibleIndex"></p-d>
    <xtal-state-commit level="global" rewrite href="/scroll" with-path="firstVisibleIndex"></xtal-state-commit>
    <!-- Polyfill for retro browsers -->
    <script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
    <!-- End Polyfill for retro browsers -->

    <!-- Polymer Elements -->
    <script type="module" src="https://unpkg.com/@polymer/iron-list@3.0.1/iron-list.js?module"></script>
    <!-- End Polymer Elements -->

    <script type="module" src="https://cdn.jsdelivr.net/npm/xtal-splitting@0.0.8/xtal-splitting.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/xtal-fetch@0.0.52/xtal-fetch.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/xtal-decorator@0.0.27/xtal-decorator.iife.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/xtal-tree@0.0.38/xtal-tree.iife.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/xtal-state@0.0.42/xtal-state.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/purr-sist@0.0.13/purr-sist.iife.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/if-diff@0.0.11/if-diff.iife.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/p-d.p-u@0.0.79/dist/p-all.iife.js"></script>
  </div>
  </template>
</custom-element-demo>
```
-->

###  Defining a piping custom element

A convenience function is provided, that allows you to generate a "pipe" or "action" custom element with as few keystrokes as possible.

Here's what the syntax looks like in a JavaScript file:

```JavaScript
import {PDQ} from 'p-d.p-u/PDQ.js';
PDQ.define('my-pipeline-action', input => {
    // do stuff
    return myProcessedResult;
});
```

This will create a custom element with name "my-pipeline-action".  It applies the second argument, a function, to the "input" property of the custom element, every time the input changes.  It then stores the result in property "value", and emits an event with name "value-changed":

```html
<my-pipeline-action></my-pipeline-action>
<p-d on="value-changed" prop="input">
```

As with all custom element definitions, some care should be taken to ensure that the custom element names are unique.  This could be challenging if generating lots of small custom elements, like shown above, to be used in a large application, especially if that large application combines somewhat loosely coupled content from different teams, who also generate many custom elements.  Hopefully, the "Scoped Custom Element Registries" will help make this issue disappear in the future.

[TODO] Support multiple parameters like [aggregator-fn](https://www.webcomponents.org/element/aggregator-fn).

## Location, Location, Location

If the issue of mixing JavaScript script tags inside markup is *not* a serious concern for you, but you do want to reap the benefits from making the data flow unidirectionally, without having to jump away to see the code for one of these piping custom elements, you can "inline" the code quite close to where it is needed.  For now, this will only work if you essentially "hard code" the location of PDQ to a CDN with support for bare import specifiers:

```html
<p-d on="selected-root-nodes-changed" prop="input" val="target"></p-d>
<script type="module">
    import {PDQ} from 'https://unpkg.com/p-d.p-u@0.0.64/PDQ.js?module';
    PDQ.define('selected-node-change-handler', (input) =>{
        if((typeof(nodeList) === 'undefined') || !nodeList.items) return;
        const idx = nodeList.firstVisibleIndex;
        nodeList.items = nodeList.items.slice();
        nodeList.scrollToIndex(idx);
    })
</script>
<selected-node-change-handler></selected-node-change-handler>
```

With [package name map](https://github.com/domenic/package-name-maps) support, the import statement could look more like the previous example:

```JavaScript
import {PDQ} from 'p-d.p-u/PDQ.js';
```

Now if you add a breakpoint, it will take you to the code, where you can see the surrounding markup.  But you will only see the *markup*, not the actual live elements, unfortunately.  Just saying.

## Debugging Tips

Although the markup / code above is a little more verbose than standard ways of adding event handlers, it does have some benefits.  If you do view the live elements, you can sort of "walk through" the DOM elements and custom elements, and see how data is transformed from step to step.  This would be particularly easy if there were a nice browser extension that can quickly view web component properties, regardless of their flavor.  Unfortunately, [existing](https://chrome.google.com/webstore/detail/polyspector/naoehbibkfilaolkmfiehggkfjndlhpd?hl=en) [extensions](https://chrome.google.com/webstore/detail/stencil-inspector/komnnoelcbjpjfnbhmdpgmlbklmicmdi/related) don't seem to support that yet. 

But I am quite excited to see Firefox nightly making some [giant leaps forward](https://blog.nightly.mozilla.org/2018/09/06/developer-tools-support-for-web-components-in-firefox-63/) in supporting universal web component debugging.

In addition, you might find the following helpful.  What follows is Chrome-centric discussion, and requires support for dynamic import:

In the console, type:

import('https://unpkg.com/xtal-shell@0.0.7/$hell.js');

Then make you sure you select the Elements tab in the dev tools, in such a way that you can see both the elements and the console at the same time.

Then, as you inspect custom elements, you can type this in the console:

$hell.getProperties($0)

You should see an object, which you will want to expand.  This will list the values of Polymer properties, as well as observedAttributes, as well as Object.getOwnProperties.  It also displays the constructor, which you can right-click on, and go to definition to see the code for the web component.

Now as you select other elements in the elements tab, in the console, hit the up arrow and enter (so you don't have to keep typing "$hell.getProperties($0)" each time).  You will have to keep expanding the result.


## Conditional Processing

p-d can be configured to test the event target to make sure it matches a css test.  This is done with the "if" attribute / property:

```html
<div>
    <a href="link1">Link 1</a>
    <a href="link2">Link 2</a>
</div>
<p-d on="click" if="a"></p-d>
```

## Disabling the default behavior of initialization (Warning:  Wonky discussion)

One of the goals of these components is they can load asynchronously, and the output should, as much as possible, not depend on when these components load.

So what happens if an element fires an event, before p-d has loaded and started listening?  What if you want to monitor a property that starts out with some initial value?

To accommodate these difficulties, by defaut, a "fake" event is "emitted" just before the event connection is made.  I believe this default choice greatly improves the usefulness of these components.  However, there are situations where we definitely don't want to take action without actual user interaction (for example, with button clicks). To prevent that from happening, add attribute **skip-init**.

Another subtle feature you might find useful:  It was mentioned before that p-d removes the disabled attribute after latching on the event handler.  But what if you want to utilize multiple p-d's on the same element?  We don't want to remove the disabled attribute until all of the elements have latched on.  

You can specify the "depth" of disabling thusly:

```html
    <!-- Parse the address bar -->
    <xtal-state-parse disabled="2" parse="location.href" level="global" 
        with-url-pattern="id=(?<storeId>[a-z0-9-]*)">
    </xtal-state-parse>
    <!-- If no id found in address bar, create a new record ("session") -->
    <p-d on="no-match-found" to="purr-sist[write]" prop="new" val="target.noMatch"  m="1" skip-init></p-d>
    <!-- If id found in address bar, pass it to the persistence reader and writer -->
    <p-d on="match-found" to="purr-sist" prop="storeId" val="target.value.storeId" m="2" skip-init></p-d>
    <!-- Read stored history.state from remote database if saved -->
    <purr-sist read></purr-sist>
```

What if you want your element to remain disabled after all the p-d's have latched?  Just set the number one higher than the number of next sibling p-d's.


## Counter test

p-d, by itself, is not exactly turing-complete.  Even a simple "counter" is beyond its abilities.  A previous attempt to pile in enough hooks to do this proved clumsy.

A nice companion custom element that works well together with p-d is [xtal-decorator](https://www.webcomponents.org/element/xtal-decorator).

With these two combined the counter would look like:

```html
    <xtal-deco><script nomodule>
        ({
            on: {
                click:{
                    this.counter++;
                }
            },
            props:{
                counter: 0
            }
        })
    </script></xtal-deco>
    <button>Increment</button>
    <p-d on="counter-changed" prop="innerText"></p-d>
    <div></div>
```

##  Another impossible dream

p-destal (pronunced "pedestal") is another web component in shining armor.  Its quest is to allow some types of web components to serve dual roles -- they could work as stand alone web pages, but also as web components, embedded within other pages / apps.  Much like iFrames.  The type of scenario where this would be useful is *not* highly reusable generic web components, like those found on webcomponents.org, but rather business domain, markup-centric, dynamic (server-generated?) HTML content.  The definition of such a component would be in the form of an html file:  *.html, or *.cshtml, or *.jsp or *.pug, etc.

A key piece of the puzzle p-destal unlocks is how to pass information to these pages / web components that wear two hats?

Whereas p-d works at ground level -- monitoring for events from its elder sibling, and passing along information to its fellow downstream siblings -- p-destal climbs up the tree before starting its lookout.  The markup may look like this:

```html
<p-destal on="[period],[emp_id]" to="fetch-data{period:target.period,empID:target.emp_id}"></p-destal>
```

What p-destal does is:

1)  Traverses up the DOM tree, searching for a custom element container.  It identifies an element as a custom element if it either is a host of Shadow DOM, or has a dash in the element name. If it locates such a container, it monitors that element for attribute mutations (period and emp_id in this case), and passes the values to down stream siblings of the p-destal element.
2)  If no such custom element container is found, it monitors location.search (the query string in the address bar) for parameters with the same names (period, emp_id), and passes those values to downstream siblings as they change.

## Targeted, tightly-coupled passing with p-u ("partly-untested")   

I would suggest that for most applications, most of the time, data will naturally flow in one direction.  Those of us who read and write in a [downward direction](https://www.quora.com/Are-there-any-languages-that-read-from-bottom-to-top) will probably want to stick with that direction when arranging our elements.  But there will inevitably be points where the data flow must go up -- typically in response to a user action.  

That's what p-u provides.  As the name suggests, it should be used sparingly.  

p-u can pass data in any direction, but the primary intent is to pass it up the DOM tree to a precise single target.  What *was* the CSS selector, before the opening brace, now becomes a simple ID.  No # before the ID is required (in fact it will assume the ID starts with # if you do this).  If the selector starts with  a slash, it searches for an element with that ID from (root) document, outside any shadow DOM.  If it starts with ./, it searches within the shadow DOM it belongs to  ../ goes up one level. ../../ goes up two levels, etc.  Basically we are emulating the path syntax for imports.

Sample markup:

```html
 <p-u on="click" to="/myTree" prop="toggledNode" val="target.node"></p-u>
```

Unlike p-d, p-u doesn't worry about DOM nodes getting created after any passing of data takes place.  If you are using p-u to pass data to previous siblings, or parents of the p-u element,or previous siblings of the parent, etc, then it is quite likely that the DOM element will already have been created, as a natural result of how the browser, and frameworks, typically render DOM.  If, however, you choose to target DOM elements out of this range, it's more of a crapshoot, and do so at your own risk.

Another objection to this approach is that there needs to be coordination between  these potentially disparate areas of the DOM, as far as what the agreed ID should be.  This is obviously not a good approach if you are designing a generic component.  Do you really want to tell the person using your component that they need to plop a DOM element with a specific ID, in order to receive the data?  I didn't think you would.  So p-u should probably not be used for this use case (a way of passing information from a generic, reusable component).

For that we have:

## Punting [Untested]

```html
<p-unt on="click" dispatch to="myEventName" detail-prop="toggledNode" val="target.node" composed bubbles></p-unt>
```


## Deluxe version [partially untested]

Another custom element, p-d-x, extends p-d and adds these additional features;

1)  You can specify adding / removing a css class (untested).
2)  You can specify a nested path that needs setting (tested).
3)  You can  specify multiple properties that need setting on the same element, more compactly (tested).
4)  You can observe attribute changes, in lieu of listening for an event (tested).
5)  You can copy all properties of the source to the target if you specify to="{.:.}" (partly tested).


There is a special string used to refer to an element of [composedPath()](https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath):

```html
<p-u on="click" if="span" to="/myTree{toggledNode:composedPath_0.node}"></p-u>
```

This pulls the node from event.composedPath()[0].node.

##  Differences to other frameworks

While these components provide a kind of "framework built with web components", similar to Polymer, there's a fundamental difference.  Unlike Polymer (and other competing frameworks), these components don't depend on the existence of a controlling component which manages state.  Instead, it is a little more JQuery like.  It is a "peer-to-peer binding framework."  This may be more appealing for some people / use cases, less appealing to others.  

And if you want to add some state management while sticking to codeless, declarative approaches, consider using [xtal-state](https://www.webcomponents.org/element/xtal-state).  You can place a history.state watcher at the top of a DOM element, for example:

```html
<div>
    <xtal-state-watch watch level="local"></xtal-state-watch>
    <p-d on="history-changed" to="#handleViewableNodesChanged" prop="firstVisibleIndex" val="target.history" m="1"></p-d>
    ...
</div>
```

Note the use of the attribute "level='local'".  This limits the scope of the state to the local div DOM element.  Then if you need to update this local state, add another tag:

```html
<div>
    ...
    <iron-list>
        ...
    </iron-list>
    <p-d on="scroll" to="{history:target.firstVisibleIndex}"></p-d>
    <xtal-state-commit level="local" rewrite href="/scroll"></xtal-state-commit>
...
</div>
```



## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ npm tests
```






