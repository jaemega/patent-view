/**
 * PATENT VIEW - A Clear and Simple JS View Model
 * v1.0 (BETA)
 * Created: 06/2019
 *
 * @copyright Jheanell Elliott 2019 (Github: https://github.com/jaemega)
 * @license Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

import { APP as $MODEL } from './model/model.js';
import * as utils from './helpers/utilities.js';

/**
 * Exported reference to application model and controller
 *
 * @property {object} $CONTROLLER
 * @public
 */
export const $CONTROLLER = {
  model: $MODEL,
  controller: null
};

/**
 * Bind and Activate View Items
 *
 * Trigger all the binding actions needed for the view
 *
 * @returns {undefined}
 * @private
 */
function _bindActivateItems () {
  utils.bindAllLinks($MODEL.selectors.links, 'router');
  utils.setActiveNavItem($MODEL.selectors['nav-items']);
}

/**
 * Scroll to Anchor
 *
 * Scroll page to anchor location
 *
 * @param {object} components - object containing the url components
 * @param {string} components.anchor - anchor hash for active view
 * @returns {undefined}
 * @private
 */
function _scrollToAnchor ({ anchor }) {
  if (!anchor) {
    scrollTo(0, 0); // reset page top
    return;
  }

  const cleanedAnchor = utils.sanitizeAnchor(anchor);
  const anchoredElement = document.querySelector(`[${$MODEL.anchorAttr}=${cleanedAnchor}]`);

  if (!anchoredElement) return;

  const { offsetTop } = anchoredElement;
  scrollTo(0, offsetTop);
}

/**
 * Set Page State
 *
 * Update the `window.history` push state as well as the application's model window state
 *
 * @returns {undefined}
 * @private
 */
function _setState () {
  const { state: prevState } = $MODEL.window;
  const url = utils.assembleUrl($MODEL.routeComponents);
  const { anchor } = $MODEL.routeComponents;

  if (!Object.keys($MODEL.routeComponents).length) return;

  // Create page state
  const state = {
    page: $MODEL.activeView,
    url,
    anchor
  };

  // Update page state
  if (!prevState) {
    window.history.replaceState(state, document.title, url); // if state doesn't exist set one
  } else if (prevState.url !== state.url) {
    window.history.pushState(state, document.title, url); // update state if route is different
  }

  // Update model window state
  $MODEL.window.state = state;
}

/**
 * The Patent View application class
 *
 * @class
 */
class PatentView {
  constructor () {
    const _prototype = Object.getPrototypeOf(this);
    const _propertyList = Object.getOwnPropertyNames(_prototype);

    // bind `this` to all class methods
    _propertyList.forEach((prop) => {
      if (typeof this[prop] === 'function' && prop !== 'constructor') {
        this[prop] = this[prop].bind(this);
      }
    });

    // Init if not in debug mode
    if (!$MODEL.window.debug) {
      this.init();
    }
  }

  /**
   * Render Page
   *
   * Attach the virtual DOM children to the page DOM
   *
   * @returns {undefined}
   * @public
   */
  render () {
    const { container } = $MODEL;

    if (!container) {
      throw $MODEL.errMsg.norender;
    }

    const appParent = $MODEL.container.parentNode;
    const newContainer = container.cloneNode(); // empty container and start fresh
    const children = utils.getChildren($MODEL.storedDOM);
    utils.attachChildren(newContainer, children);

    // Update page DOM
    appParent.replaceChild(newContainer, $MODEL.container);
    $MODEL.container = newContainer;

    // Bind/activate new items
    _bindActivateItems();

    // Scroll to anchor
    _scrollToAnchor($MODEL.routeComponents);

    // Dispatch patent load event
    window.dispatchEvent(new Event('PATENTVIEW_RENDERED'));
  }

  /**
   * Get Default Page DOM
   *
   * Retrieve the page's default content from the configured application wrapper
   *
   * @returns {undefined}
   * @public
   */
  getDefaultDOM () {
    if (!$MODEL.storedDOM || !$MODEL.container || !$MODEL.defaultContent) {
      throw $MODEL.errorLog.noinit;
    }

    let content;
    const defaultParent = $MODEL.defaultContent.parentNode;

    if ($MODEL.defaultContent.tagName === 'NOSCRIPT') {
      // NOTE: Browsers render `noscript` content as a string when javascript
      // is enabled. This content needs to be parsed for use
      content = $MODEL.defaultContent.hasChildNodes() ? $MODEL.defaultContent.firstChild.nodeValue : '';
    } else {
      content = $MODEL.defaultContent.innerHTML.toString();
    }

    $MODEL.storedDOM = utils.parseToDOM(content); // create virtual DOM

    if (!$MODEL.container.isSameNode($MODEL.defaultContent)) {
      defaultParent.removeChild($MODEL.defaultContent); // remove default content from page DOM
    }

    $MODEL.defaultContent = $MODEL.storedDOM.cloneNode(true); // update default content for later use
  }

  /**
   * Update Stored DOM
   *
   * Update the virtual DOM with new content
   *
   * @param {Node} nodeUpdater - node containing updated content
   * @param {string} selector - string identifier of target element that will be updated
   * @returns {undefined}
   */
  updateDOM (nodeUpdater, selector) {
    const oldNode = $MODEL.storedDOM.querySelector(selector); // existing version of targeted content
    const newNode = oldNode && oldNode.cloneNode(); // node to be updated with new children
    const nodeParent = oldNode && oldNode.parentNode; // node whose child will be replaced

    if (!oldNode) {
      throw $MODEL.errorLog.noupdate; // throw error
    }

    if (oldNode.isEqualNode(nodeUpdater)) return; // don't update if this is the same node

    // Update `storedDOM` with new content
    const children = utils.getChildren(nodeUpdater);
    utils.attachChildren(newNode, children);
    nodeParent.replaceChild(newNode, oldNode);
  }

  /**
   * Get Settings
   *
   * @async
   * @param {string} url - settings path
   * @returns {Promise<object>} Parsed JSON object
   * @public
   */
  async getSettings (url) {
    let settings = {};

    if (!url) return;

    const response = await fetch(url);

    if (response.ok) {
      settings = response.json();
    } else {
      $MODEL.errorLog.push($MODEL.errMsg.nosettings);

      utils.logErrors($MODEL.errorLog);
    }

    return settings;
  }

  /**
   * Get Page
   *
   * Retrieve the requested view
   *
   * @async
   * @param {string} page - page path
   * @param {string} query - query string
   * @returns {Promise<undefined>} Promise
   * @public
   */
  async getPage (page, query) {
    let content = '';
    const { viewData: PAGES = {} } = $MODEL;
    const isEmptyFragment = !('id' in $MODEL.storedDOM); // check if the parent node of `storedDOM` is a valid HTMLElement type

    page = utils.pageCheck(page, $MODEL.errorLog); // page check
    query = (typeof query === 'string' && query.indexOf('?') === 0) ? query : ''; // query must be a string and formatted correctly

    // Ensure `storedDOM` is ready
    if (isEmptyFragment) {
      this.getDefaultDOM();
    }

    // Default view (Homepage)
    if (page === PAGES.defaults.index.source && $MODEL.usePageDefaultContent) {
      content = $MODEL.defaultContent.querySelector($MODEL.selectors.content);
      this.updateDOM(content, $MODEL.selectors.content); // update the `storedDOM `
    } else {
      // Fetch non-default views
      const response = await fetch(`${$MODEL.window.pathname}${$MODEL.viewDirectory}/${page}${query}`)
        .then((res) => {
          if (!res.ok) {
            $MODEL.errorLog.push(new Error(`PAGE ERROR ~>> [${res.status}] ${res.statusText}`)); // push page error
          }

          return res.text(); // parse fetched data as a string
        })
        .catch((err) => {
          $MODEL.errorLog.push(err); // push error
        });

      if (typeof response !== 'string') {
        $MODEL.errorLog.push($MODEL.errMsg.noview); // push error
      } else {
        content = utils.parseToDOM(response); // parse fetched data as a DOM item
        this.updateDOM(content, $MODEL.selectors.content); // update the `storedDOM `
      }
    }

    // Render and display errors
    if (utils.logErrors($MODEL.errorLog)) {
      throw $MODEL.errMsg.fatal; // throw fatal error
    }

    if ($MODEL.window.debug) return; // TEST CHECK

    this.render(); // render
  }

  /**
   * Router
   *
   * The application router
   *
   * @param {Event} [e] - optional event object
   * @returns {undefined}
   */
  router (e) {
    e = (e instanceof Event) ? e : null; // `e` is only allowed to be an Event type
    const { location } = window;
    const watchedEvents = ['click'];
    let hash = location.hash;

    // Bind route listener if it doesn't exist
    if (!$MODEL.window.eventlisteners.hashchange) {
      window.addEventListener('hashchange', this.router, true);
      $MODEL.window.eventlisteners.hashchange = [this.router.name]; // log attached event (just for kicks!)
    }

    // Event conditions
    if (e && watchedEvents.includes(e.type)) {
      const { currentTarget: target } = e;
      const isElement = target instanceof Element;
      const isSameDomain = !!(isElement && target.host === location.host); // if `target.host` is available, this element is a link element

      // Link `href` check
      if (isSameDomain) {
        e.preventDefault();
        hash = target.hash; // update hash
      }
    }

    $MODEL.routeComponents = utils.getRouteComponents(hash);

    // Route error check
    if (!Object.keys($MODEL.routeComponents).length) {
      throw $MODEL.errMsg.noview;
    }

    $MODEL.activeView = $MODEL.routeComponents.view;

    if ($MODEL.window.debug) return; // TEST CHECK

    _setState(); // set page state
    this.getPage($MODEL.routeComponents.requestURL, $MODEL.routeComponents.query); // get page
  }

  /**
   * Initializer
   *
   * @async
   * @returns {Promise<undefined>} Promise
   */
  async init () {
    $MODEL.settings = await this.getSettings(`${$MODEL.window.domain}${$MODEL.settingsPath}/patentview/conf/settings.json`); // get settings
    $MODEL.selectors = $MODEL.settings['app-selectors']; // get app selectors
    $MODEL.container = document.body.querySelector($MODEL.settings['container-selector']); // get app container
    $MODEL.defaultContent = document.body.querySelector($MODEL.settings['default-content-selector']); // get default content
    $MODEL.usePageDefaultContent = Boolean($MODEL.settings['use-default-content']);
    $MODEL.viewDirectory = $MODEL.settings['view-directory'];
    $MODEL.anchorAttr = $MODEL.settings['anchor-attribute'] || $MODEL.anchorAttr;

    utils.APP.window = $MODEL.window; // provide reference to app window for utilities
    utils.APP.router = this.router; // provide reference to `router` for utilities

    // Provide pages and routes
    const pageList = Object.keys($MODEL.settings.views) || [];
    pageList.forEach((page) => {
      $MODEL.viewData[page] = $MODEL.settings.views[page];
    });

    utils.APP.PAGES = $MODEL.viewData; // provide reference to page list for utilities

    if ($MODEL.window.debug) return; // TEST CHECK

    this.router(); // start routes
  }
}

// INIT
$CONTROLLER.controller = new PatentView();
