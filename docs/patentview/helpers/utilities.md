<a name="module_helpers/utilities"></a>

## helpers/utilities
Utilities - Utility functions for PATENT VIEW


* [helpers/utilities](#module_helpers/utilities)
    * _static_
        * [.sanitizeAnchor(anchor)](#module_helpers/utilities.sanitizeAnchor) ⇒ <code>string</code>
        * [.parseToDOM(txtChild)](#module_helpers/utilities.parseToDOM) ⇒ <code>HTMLElement</code>
        * [.getChildren(parent)](#module_helpers/utilities.getChildren) ⇒ <code>Array.&lt;Node&gt;</code>
        * [.attachChildren(parent, children)](#module_helpers/utilities.attachChildren) ⇒ <code>undefined</code>
        * [.logErrors([errors])](#module_helpers/utilities.logErrors) ⇒ <code>boolean</code>
        * [.sanitizeLink(link)](#module_helpers/utilities.sanitizeLink) ⇒ <code>undefined</code>
        * [.bindAllLinks(linkTypes, callback)](#module_helpers/utilities.bindAllLinks) ⇒ <code>undefined</code>
        * [.setActiveNavItem(selector)](#module_helpers/utilities.setActiveNavItem) ⇒ <code>undefined</code>
        * [.assembleUrl(components)](#module_helpers/utilities.assembleUrl) ⇒ <code>string</code>
        * [.getRouteComponents(uri)](#module_helpers/utilities.getRouteComponents) ⇒ <code>object</code>
        * [.pageCheck(page, errorLog)](#module_helpers/utilities.pageCheck) ⇒ <code>string</code>
    * _inner_
        * [~ROUTE_QUERY](#module_helpers/utilities..ROUTE_QUERY) : <code>RegExp</code>
        * [~ROUTE_URI](#module_helpers/utilities..ROUTE_URI) : <code>string</code>
        * [~ROUTE_ANCHOR](#module_helpers/utilities..ROUTE_ANCHOR) : <code>RegExp</code>
        * [~APP](#module_helpers/utilities..APP) : <code>object</code>

<a name="module_helpers/utilities.sanitizeAnchor"></a>

### helpers/utilities.sanitizeAnchor(anchor) ⇒ <code>string</code>
Sanitize Anchor

Clean up the provided anchor string

**Kind**: static method of [<code>helpers/utilities</code>](#module_helpers/utilities)  
**Returns**: <code>string</code> - Cleaned anchor string  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| anchor | <code>string</code> | anchor string |

<a name="module_helpers/utilities.parseToDOM"></a>

### helpers/utilities.parseToDOM(txtChild) ⇒ <code>HTMLElement</code>
Parse to DOM

Transform parsable string into a DOM object

**Kind**: static method of [<code>helpers/utilities</code>](#module_helpers/utilities)  
**Returns**: <code>HTMLElement</code> - Derived body element from the newly parsed DOM  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| txtChild | <code>string</code> | string representation of a DOM object |

<a name="module_helpers/utilities.getChildren"></a>

### helpers/utilities.getChildren(parent) ⇒ <code>Array.&lt;Node&gt;</code>
Get Child Nodes

Collect a list of child nodes from the provided parent element

**Kind**: static method of [<code>helpers/utilities</code>](#module_helpers/utilities)  
**Returns**: <code>Array.&lt;Node&gt;</code> - Array of child nodes  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>HTMLElement</code> | element whose children will be gathered |

<a name="module_helpers/utilities.attachChildren"></a>

### helpers/utilities.attachChildren(parent, children) ⇒ <code>undefined</code>
Attach Child Nodes

Attach a list of child node to a new parent element

**Kind**: static method of [<code>helpers/utilities</code>](#module_helpers/utilities)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>HTMLElement</code> | container for new child nodes |
| children | <code>Array.&lt;Node&gt;</code> | array of new child nodes |

<a name="module_helpers/utilities.logErrors"></a>

### helpers/utilities.logErrors([errors]) ⇒ <code>boolean</code>
Log Errors

Display collected error logs within the console

**Kind**: static method of [<code>helpers/utilities</code>](#module_helpers/utilities)  
**Returns**: <code>boolean</code> - True/false value based on whether errors were displayed  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [errors] | <code>Array.&lt;Error&gt;</code> | <code>[]</code> | array of error logs to bed displayed |

<a name="module_helpers/utilities.sanitizeLink"></a>

### helpers/utilities.sanitizeLink(link) ⇒ <code>undefined</code>
Sanitize Link

Clean up lone hashes within link urls

**Kind**: static method of [<code>helpers/utilities</code>](#module_helpers/utilities)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| link | <code>Element</code> | link element |

<a name="module_helpers/utilities.bindAllLinks"></a>

### helpers/utilities.bindAllLinks(linkTypes, callback) ⇒ <code>undefined</code>
Bind Links

Bind application callbacks to link items

**Kind**: static method of [<code>helpers/utilities</code>](#module_helpers/utilities)  

| Param | Type | Description |
| --- | --- | --- |
| linkTypes | <code>Array.&lt;string&gt;</code> | array of element selectors to be bound |
| callback | <code>string</code> | string name of callback function to be called |

<a name="module_helpers/utilities.setActiveNavItem"></a>

### helpers/utilities.setActiveNavItem(selector) ⇒ <code>undefined</code>
Set Active Navigation Item

**Kind**: static method of [<code>helpers/utilities</code>](#module_helpers/utilities)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | string selector of navigation item |

<a name="module_helpers/utilities.assembleUrl"></a>

### helpers/utilities.assembleUrl(components) ⇒ <code>string</code>
Assemble Url

**Kind**: static method of [<code>helpers/utilities</code>](#module_helpers/utilities)  
**Returns**: <code>string</code> - Assembled URL string  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| components | <code>object</code> | object containing the url components |
| components.view | <code>string</code> | route name of the active view |

<a name="module_helpers/utilities.getRouteComponents"></a>

### helpers/utilities.getRouteComponents(uri) ⇒ <code>object</code>
Get Route Components

Gather the route uri components from the provided uri string

**Kind**: static method of [<code>helpers/utilities</code>](#module_helpers/utilities)  
**Returns**: <code>object</code> - Object containing route componet  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | string of route uri |

<a name="module_helpers/utilities.pageCheck"></a>

### helpers/utilities.pageCheck(page, errorLog) ⇒ <code>string</code>
Page Url Check

Check if the requested route exists

**Kind**: static method of [<code>helpers/utilities</code>](#module_helpers/utilities)  
**Returns**: <code>string</code> - Correct string evaluation of page url  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>string</code> | string url for requested page |
| errorLog | <code>Array</code> | reference to application error log |

<a name="module_helpers/utilities..ROUTE_QUERY"></a>

### helpers/utilities~ROUTE\_QUERY : <code>RegExp</code>
Object model for retrieving and formatting queries with the route uri

**Kind**: inner constant of [<code>helpers/utilities</code>](#module_helpers/utilities)  
**Access**: public  
<a name="module_helpers/utilities..ROUTE_URI"></a>

### helpers/utilities~ROUTE\_URI : <code>string</code>
Object model for identifying the route hash

**Kind**: inner constant of [<code>helpers/utilities</code>](#module_helpers/utilities)  
**Access**: public  
<a name="module_helpers/utilities..ROUTE_ANCHOR"></a>

### helpers/utilities~ROUTE\_ANCHOR : <code>RegExp</code>
Regex for retrieving the anchor hashe with the route URI

**Kind**: inner constant of [<code>helpers/utilities</code>](#module_helpers/utilities)  
**Access**: public  
<a name="module_helpers/utilities..APP"></a>

### helpers/utilities~APP : <code>object</code>
Object model with reference to application methods and items
needed for the utility functions

**Kind**: inner constant of [<code>helpers/utilities</code>](#module_helpers/utilities)  
**Access**: public  
