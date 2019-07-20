/**
 * Application object model
 *
 * @module model/model
 */

/**
 * @constant {object} __PATENTVIEW_APP__ - Reference to application's public object
 * @private
 */
let __PATENTVIEW_APP__ = {
  settingsPath: 'js'
};

/**
 * @constant {string} pathname - Reference to window pathname
 * @private
 */
let pathname = window.location.pathname;

// check for access to public object
if ('__PATENTVIEW_APP__' in window) {
  __PATENTVIEW_APP__ = {
    ...window.__PATENTVIEW_APP__,
    settingsPath: window.__PATENTVIEW_APP__.settingsPath || __PATENTVIEW_APP__.settingsPath
  };

  if (__PATENTVIEW_APP__.debug) {
    pathname = pathname.replace('/_test', ''); // cleanup pathname
    console.log('APPLICATION: DEBUG MODE');
  }
}

/**
 * @constant {object} APP - Application model
 * @public
 */
export const APP = {
  container: null, // element that contains app content
  defaultContent: null, // default content structure to be given to the `storedDOM`
  storedDOM: document.createDocumentFragment(), // application virtual DOM
  selectors: {}, // identifiers for updatable elements/components within the DOM
  anchorAttr: 'id', // attribute name of element anchors
  errorLog: [], // an array to capture all errors to be displayed
  errMsg: { // application-specific errors
    fatal: new Error('APPLICATION ERROR ~>> An error has occurred. Application has stopped'),
    noview: new Error('APPLICATION ERROR ~>> Unable to display view'),
    nosettings: new Error('APPLICATION ERROR ~>> Unable to retrieve settings'),
    norender: new Error('APPLICATION ERROR ~>> Unable to render page'),
    noupdate: new Error('APPLICATION ERROR ~>> Unable to update DOM'),
    noinit: new Error('APPLICATION ERROR ~>> Initialization error')
  },
  settingsPath: __PATENTVIEW_APP__.settingsPath, // path where `/conf` is located
  settings: {}, // application settings
  usePageDefaultContent: true, // flag for whether to use page's defualt content
  viewDirectory: '', // view directory
  activeView: '', // active view
  viewData: {}, // page list
  routeComponents: {}, // active of page route component
  window: { // public object to be passed to the `window` object
    eventlisteners: {}, // registered event listeners for the app
    state: null, // application state
    debug: !!__PATENTVIEW_APP__.debug, // debug mode flag
    domain: `${window.location.protocol}//${window.location.host}${pathname}` || '', // app domain url
    pathname: pathname || '' // app path
  }
};
