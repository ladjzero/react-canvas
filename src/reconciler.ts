// import React from 'react';
import Reconciler from 'react-reconciler';
import emptyObject from 'fbjs/lib/emptyObject';
// import { isUnitlessNumber } from '../utils/css';
// import { debugMethods } from '../utils/debug-methods';
import { Node } from './components/node';
import Text from './components/text';
import Root from './components/root';
import View from './components/view';
import FlexLayout from './components/flex';


function shallowDiff(oldObj, newObj) {
  // Return a diff between the new and the old object
  const uniqueProps = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);
  const changedProps = Array.from(uniqueProps).filter(
    propName => oldObj[propName] !== newObj[propName]
  );

  return changedProps;
}

function isUppercase(letter) {
  return /[A-Z]/.test(letter);
}

function isEventName(propName) {
  return propName.startsWith('on') && window.hasOwnProperty(propName.toLowerCase());
}

const hostConfig = {
  // appendChild for direct children
  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  // Create the DOMElement, but attributes are set in `finalizeInitialChildren`
  createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    switch (type) {
      case 'view':
        return new View(props);
      case 'flex':
        return new FlexLayout(props);
      case 'text':
        return new Text(props);
      default:
        return new Node(type);
    }
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    // A TextNode instance is returned because literal strings cannot change their value later on update
    return new Text({ children: text });
  },

  // Actually set the attributes and text content to the cvsElement and check if
  // it needs focus, which will be eventually set in `commitMount`
  finalizeInitialChildren(cvsElement, type, props) {
    // Set the prop to the cvsElement
    Object.keys(props).forEach(propName => {
      const propValue = props[propName];

      if (propName === 'style') {
        // setStyles(cvsElement, propValue);
      } else if (propName === 'children') {
        // Set the textContent only for literal string or number children, whereas
        // nodes will be appended in `appendChild`
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          cvsElement.children = [new Text({ children: String(propValue) })];
        }
        // const children = Array.isArray(propValue) ? propValue : [propValue];
        // cvsElement.children = children.map(child => typeof child === 'string' || typeof child === 'number' ? new Text(child) : child)
      } else if (propName === 'className') {
        // cvsElement.setAttribute('class', propValue);
      } else if (isEventName(propName)) {
        const eventName = propName.toLowerCase().replace('on', '');
        // cvsElement.addEventListener(eventName, propValue);
      } else {
        // cvsElement.setAttribute(propName, propValue);
      }
    });

    // Check if needs focus
    switch (type) {
      case 'button':
      case 'input':
      case 'select':
      case 'textarea':
        return !!props.autoFocus;
    }

    return false;
  },

  // Useful only for testing
  getPublicInstance(inst) {
    return inst;
  },

  // Commit hooks, useful mainly for react-dom syntethic events
  prepareForCommit() {},
  resetAfterCommit() {},

  // Calculate the updatePayload
  prepareUpdate(cvsElement, type, oldProps, newProps) {
    // Return a diff between the new and the old props
    return shallowDiff(oldProps, newProps);
  },

  getRootHostContext(rootInstance) {
    return emptyObject;
  },
  getChildHostContext(parentHostContext, type) {
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    return (
      type === 'textarea' ||
      typeof props.children === 'string' ||
      typeof props.children === 'number'
    );
  },

  now: () => {
    // noop
  },

  supportsMutation: true,

  useSyncScheduling: true,

  appendChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  // appendChild to root container
  appendChildToContainer(parentInstance, child) {
    parentInstance.appendChild(child);
    parentInstance.render();
  },

  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  },

  removeChildFromContainer(parentInstance, child) {
    parentInstance.removeChild(child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    parentInstance.insertBefore(child, beforeChild);
  },

  insertInContainerBefore(parentInstance, child, beforeChild) {
    parentInstance.insertBefore(child, beforeChild);
  },

  commitUpdate(cvsElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
    updatePayload.forEach(propName => {
      // children changes is done by the other methods like `commitTextUpdate`
      if (propName === 'children') {
        const propValue = newProps[propName];
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          cvsElement.textContent = propValue;
        }
        return;
      }

      if (propName === 'style') {
        // Return a diff between the new and the old styles
        const styleDiffs = shallowDiff(oldProps.style, newProps.style);
        const finalStyles = styleDiffs.reduce((acc, styleName) => {
          // Style marked to be unset
          if (!newProps.style[styleName]) acc[styleName] = '';
          else acc[styleName] = newProps.style[styleName];

          return acc;
        }, {});

        // setStyles(cvsElement, finalStyles);
      } else if (newProps[propName] || typeof newProps[propName] === 'number') {
        if (isEventName(propName)) {
          const eventName = propName.toLowerCase().replace('on', '');
          // cvsElement.removeEventListener(eventName, oldProps[propName]);
          // cvsElement.addEventListener(eventName, newProps[propName]);
        } else {
          // cvsElement.setAttribute(propName, newProps[propName]);
        }
      } else {
        if (isEventName(propName)) {
          const eventName = propName.toLowerCase().replace('on', '');
          // cvsElement.removeEventListener(eventName, oldProps[propName]);
        } else {
          // cvsElement.removeAttribute(propName);
        }
      }
    });
  },

  commitMount(cvsElement, type, newProps, internalInstanceHandle) {
    cvsElement.focus();
  },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.nodeValue = newText;
  },

  resetTextContent(cvsElement) {
    cvsElement.textContent = '';
  },
};

const TinyDOMRenderer = Reconciler(
  hostConfig
  // debugMethods(hostConfig, ['now', 'getChildHostContext', 'shouldSetTextContent'])
);

export default {
  render(element, ctx) {
    let root = ctx._reactRootContainer;

    if (!root) {
      const newRoot = TinyDOMRenderer.createContainer(new Root(ctx));
      root = ctx._reactRootContainer = newRoot;

      TinyDOMRenderer.injectIntoDevTools({
        bundleType: 1, // 0 for PROD, 1 for DEV
        version: '0.1.0', // version for your renderer
        rendererPackageName: 'custom-renderer', // package name
        // findHostInstanceByFiber: TinyDOMRenderer.findHostInstance // host instance (root)
      })
    }

    return TinyDOMRenderer.updateContainer(element, root, null);
  },
};
