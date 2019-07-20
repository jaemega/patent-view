## Classes

<dl>
<dt><a href="#PatentView">PatentView</a></dt>
<dd><p>The Patent View application class</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#$CONTROLLER">$CONTROLLER</a></dt>
<dd><p>Exported reference to application model and controller</p>
</dd>
</dl>

<a name="PatentView"></a>

## PatentView
The Patent View application class

**Kind**: global class  

* [PatentView](#PatentView)
    * [.render()](#PatentView+render) ⇒ <code>undefined</code>
    * [.getDefaultDOM()](#PatentView+getDefaultDOM) ⇒ <code>undefined</code>
    * [.updateDOM(nodeUpdater, selector)](#PatentView+updateDOM) ⇒ <code>undefined</code>
    * [.getSettings(url)](#PatentView+getSettings) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getPage(page, query)](#PatentView+getPage) ⇒ <code>Promise.&lt;undefined&gt;</code>
    * [.router([e])](#PatentView+router) ⇒ <code>undefined</code>
    * [.init()](#PatentView+init) ⇒ <code>Promise.&lt;undefined&gt;</code>

<a name="PatentView+render"></a>

### patentView.render() ⇒ <code>undefined</code>
Render Page

Attach the virtual DOM children to the page DOM

**Kind**: instance method of [<code>PatentView</code>](#PatentView)  
**Access**: public  
<a name="PatentView+getDefaultDOM"></a>

### patentView.getDefaultDOM() ⇒ <code>undefined</code>
Get Default Page DOM

Retrieve the page's default content from the configured application wrapper

**Kind**: instance method of [<code>PatentView</code>](#PatentView)  
**Access**: public  
<a name="PatentView+updateDOM"></a>

### patentView.updateDOM(nodeUpdater, selector) ⇒ <code>undefined</code>
Update Stored DOM

Update the virtual DOM with new content

**Kind**: instance method of [<code>PatentView</code>](#PatentView)  

| Param | Type | Description |
| --- | --- | --- |
| nodeUpdater | <code>Node</code> | node containing updated content |
| selector | <code>string</code> | string identifier of target element that will be updated |

<a name="PatentView+getSettings"></a>

### patentView.getSettings(url) ⇒ <code>Promise.&lt;object&gt;</code>
Get Settings

**Kind**: instance method of [<code>PatentView</code>](#PatentView)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Parsed JSON object  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | settings path |

<a name="PatentView+getPage"></a>

### patentView.getPage(page, query) ⇒ <code>Promise.&lt;undefined&gt;</code>
Get Page

Retrieve the requested view

**Kind**: instance method of [<code>PatentView</code>](#PatentView)  
**Returns**: <code>Promise.&lt;undefined&gt;</code> - Promise  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>string</code> | page path |
| query | <code>string</code> | query string |

<a name="PatentView+router"></a>

### patentView.router([e]) ⇒ <code>undefined</code>
Router

The application router

**Kind**: instance method of [<code>PatentView</code>](#PatentView)  

| Param | Type | Description |
| --- | --- | --- |
| [e] | <code>Event</code> | optional event object |

<a name="PatentView+init"></a>

### patentView.init() ⇒ <code>Promise.&lt;undefined&gt;</code>
Initializer

**Kind**: instance method of [<code>PatentView</code>](#PatentView)  
**Returns**: <code>Promise.&lt;undefined&gt;</code> - Promise  
<a name="$CONTROLLER"></a>

## $CONTROLLER
Exported reference to application model and controller

**Kind**: global constant  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| $CONTROLLER | <code>object</code> | 

