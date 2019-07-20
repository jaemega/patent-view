/**
 * Utilities - Utility functions for PATENT VIEW
 *
 * @module helpers/utilities
 */

/**
 * @constant {RegExp} ROUTE_QUERY - Object model for retrieving and formatting queries with the route uri
 * @public
 */
export const ROUTE_QUERY = {
  lookup: new RegExp(/(?:\?.*)/),
  format: '?'
};
/**
 * @constant {string} ROUTE_URI - Object model for identifying the route hash
 * @public
 */
export const ROUTE_URI = {
  lookup: '#/',
  cleaner: new RegExp(/(?:^#\/)|(?:[#?/].*)/, 'g')
};

/**
 * @constant {RegExp} ROUTE_ANCHOR - Regex for retrieving the anchor hashe with the route URI
 * @public
 */
export const ROUTE_ANCHOR = new RegExp(/#[\w\d\-_]+/, 'g');

/**
 * @constant {object} APP - Object model with reference to application methods and items
 * needed for the utility functions
 * @public
 */
export const APP = {
  PAGES: {}, // reference to router page list
  window: {}, // reference to application window
  router: () => {} // reference to router method (default is empty function)
};

/**
 * Sanitize Anchor
 *
 * Clean up the provided anchor string
 *
 * @param {string} anchor - anchor string
 * @returns {string} Cleaned anchor string
 * @public
 */
export function sanitizeAnchor (anchor) {
  return anchor.replace('#', '');
}

/**
 * Parse to DOM
 *
 * Transform parsable string into a DOM object
 *
 * @param {string} txtChild - string representation of a DOM object
 * @returns {HTMLElement} Derived body element from the newly parsed DOM
 * @public
 */
export function parseToDOM (txtChild) {
  const parser = new DOMParser();

  if (typeof txtChild !== 'string') return txtChild;

  const newDOM = parser.parseFromString(txtChild, 'text/html'); // Parse

  return newDOM ? newDOM.body : txtChild;
}

/**
 * Get Child Nodes
 *
 * Collect a list of child nodes from the provided parent element
 *
 * @param {HTMLElement} parent - element whose children will be gathered
 * @returns {Array<Node>} Array of child nodes
 * @public
 */
export function getChildren (parent) {
  if (!parent.hasChildNodes()) return [];

  const children = parent.childNodes;

  return Array.from(children) || [];
}

/**
 * Attach Child Nodes
 *
 * Attach a list of child node to a new parent element
 *
 * @param {HTMLElement} parent - container for new child nodes
 * @param {Array<Node>} children - array of new child nodes
 * @returns {undefined}
 * @public
 */
export function attachChildren (parent, children = []) {
  children.forEach((child) => {
    parent.appendChild(child.cloneNode(true)); // clone node to create fresh instance
  });
}

/**
 * Log Errors
 *
 * Display collected error logs within the console
 *
 * @param {Array<Error>} [errors=[]] - array of error logs to bed displayed
 * @returns {boolean} True/false value based on whether errors were displayed
 * @public
 */
export function logErrors (errors = []) {
  if (errors.length) {
    // Display and empty errors
    errors.forEach((err) => {
      console.error(err);
    });

    errors = []; // empty error log

    return true;
  }
  return false;
}

/**
 * Sanitize Link
 *
 * Clean up lone hashes within link urls
 *
 * @param {Element} link - link element
 * @returns {undefined}
 * @public
 */
export function sanitizeLink (link) {
  if (!link) return;

  const { href } = link;
  link.href = (href && href.search(/#$/) > -1) ? '' : href;
}

/**
 * Bind Links
 *
 * Bind application callbacks to link items
 *
 * @param {Array<string>} linkTypes - array of element selectors to be bound
 * @param {string} callback - string name of callback function to be called
 * @returns {undefined}
 */
export function bindAllLinks (linkTypes, callback) {
  linkTypes.forEach((link) => {
    document.querySelectorAll(link).forEach((el) => {
      el.addEventListener('click', APP[callback], true);
      sanitizeLink(el); // clean up link
    });
  });
}

/**
 * Set Active Navigation Item
 *
 * @param {string} selector - string selector of navigation item
 * @returns {undefined}
 * @public
 */
export function setActiveNavItem (selector = '') {
  const { window: WINDOW } = APP;
  const { page, anchor } = WINDOW.state;

  document.querySelectorAll(selector).forEach((el) => {
    let isActive = false;
    const attrList = el.getAttributeNames();
    const cleanAnchor = sanitizeAnchor(anchor);

    // find the attribute that matches `page` or `anchor`
    attrList.forEach((attr) => {
      const val = el.getAttribute(attr) || '';
      if (val.includes(page) || (anchor && val.includes(cleanAnchor))) {
        isActive = true;
      }
    });

    // add active class
    if (isActive) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

/**
 * Assemble Url
 *
 * @param {object} components - object containing the url components
 * @param {string} components.view - route name of the active view
 * @returns {string} Assembled URL string
 * @public
 */
export function assembleUrl ({ view, query, anchor }) {
  const { PAGES = {}, window: WINDOW = {} } = APP;
  const url = (view !== PAGES.defaults.index.route) ? `${WINDOW.pathname}${ROUTE_URI.lookup}${view}${anchor}${query}` : `${WINDOW.pathname}${anchor}${query}`;

  return url;
}

/**
 * Get Route Components
 *
 * Gather the route uri components from the provided uri string
 *
 * @param {string} uri - string of route uri
 * @returns {object} Object containing route componet
 * @public
 */
export function getRouteComponents (uri) {
  const { PAGES = {} } = APP;
  const pageKeys = Object.keys(PAGES);
  let requestURL = '';

  if (!pageKeys.length) return {};

  let view = uri.indexOf(ROUTE_URI.lookup) === 0 ? uri.replace(ROUTE_URI.cleaner, '') : PAGES.defaults.index.route;

  const achorCheck = uri.match(ROUTE_ANCHOR);
  const queryCheck = uri.match(ROUTE_QUERY.lookup);

  const anchor = achorCheck ? achorCheck[0] : '';
  const query = queryCheck ? queryCheck[0].replace(ROUTE_QUERY.cleaner, '') : '';

  const activePageKey = pageKeys.find((key) => PAGES[key].route === view); // find active page key

  if (activePageKey) {
    requestURL = PAGES[activePageKey].source;
  } else if (view === PAGES.defaults.index.route) {
    requestURL = PAGES.defaults.index.source;
  } else {
    requestURL = PAGES.defaults.noroute.source; // 404 page
  }

  return {
    view: encodeURI(view),
    anchor: encodeURI(anchor),
    query: encodeURI(query),
    requestURL
  };
}

/**
 * Page Url Check
 *
 * Check if the requested route exists
 *
 * @param {string} page - string url for requested page
 * @param {Array} errorLog - reference to application error log
 * @returns {string} Correct string evaluation of page url
 * @public
 */
export function pageCheck (page, errorLog) {
  const { PAGES = {} } = APP;
  const pageKeys = Object.keys(PAGES);
  page = page || PAGES.defaults.index.source; // default is homepage

  // Error check
  if (typeof page !== 'string' || !pageKeys.length) {
    errorLog.push(new TypeError(`PAGE ERROR ~>> Invalid parameter type [${typeof page}]`)); // push error
    return;
  }

  const defaultURLs = Object.keys(PAGES.defaults).map((page) => PAGES.defaults[page].source);
  const appURLs = Object.keys(PAGES).map((page) => (PAGES[page].source)).concat(defaultURLs);

  if (!appURLs.includes(page)) {
    page = PAGES.defaults.noroute.source;
  }

  return page;
}
