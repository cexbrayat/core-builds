/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { HEADER_OFFSET } from './interfaces/view';
/** @type {?} */
export var MONKEY_PATCH_KEY_NAME = '__ng_data__';
/**
 * The internal element context which is specific to a given DOM node
 * @record
 */
export function ElementContext() { }
/**
 * The component\'s view data
 * @type {?}
 */
ElementContext.prototype.lViewData;
/**
 * The index of the element within the view data array
 * @type {?}
 */
ElementContext.prototype.index;
/**
 * The instance of the DOM node
 * @type {?}
 */
ElementContext.prototype.native;
/**
 * Returns the matching `ElementContext` data for a given DOM node.
 *
 * This function will examine the provided DOM element's monkey-patched property to figure out the
 * associated index and view data (`LViewData`).
 *
 * If the monkey-patched value is the `LViewData` instance then the element context for that
 * element will be created and the monkey-patch reference will be updated. Therefore when this
 * function is called it may mutate the provided element\'s monkey-patch value.
 *
 * If the monkey-patch value is not detected then the code will walk up the DOM until an element
 * is found which contains a monkey-patch reference. When that occurs then the provided element
 * will be updated with a new context (which is then returned).
 * @param {?} element
 * @return {?}
 */
export function getElementContext(element) {
    /** @type {?} */
    var context = /** @type {?} */ ((/** @type {?} */ (element))[MONKEY_PATCH_KEY_NAME]);
    if (context) {
        if (Array.isArray(context)) {
            /** @type {?} */
            var lViewData = /** @type {?} */ (context);
            /** @type {?} */
            var index = findMatchingElement(element, lViewData);
            context = { index: index, native: element, lViewData: lViewData };
            attachLViewDataToNode(element, context);
        }
    }
    else {
        /** @type {?} */
        var parent_1 = /** @type {?} */ (element);
        while (parent_1 = parent_1.parentNode) {
            /** @type {?} */
            var parentContext = /** @type {?} */ ((/** @type {?} */ (parent_1))[MONKEY_PATCH_KEY_NAME]);
            if (parentContext) {
                /** @type {?} */
                var lViewData = Array.isArray(parentContext) ? (/** @type {?} */ (parentContext)) : parentContext.lViewData;
                /** @type {?} */
                var index = findMatchingElement(element, lViewData);
                if (index >= 0) {
                    context = { index: index, native: element, lViewData: lViewData };
                    attachLViewDataToNode(element, context);
                    break;
                }
            }
        }
    }
    return (/** @type {?} */ (context)) || null;
}
/**
 * Locates the element within the given LViewData and returns the matching index
 * @param {?} element
 * @param {?} lViewData
 * @return {?}
 */
function findMatchingElement(element, lViewData) {
    for (var i = HEADER_OFFSET; i < lViewData.length; i++) {
        /** @type {?} */
        var result = lViewData[i];
        if (result) {
            // special case for styling since when [class] and [style] bindings
            // are used they will wrap the element into a StylingContext array
            if (Array.isArray(result)) {
                result = result[0 /* ElementPosition */];
            }
            if (result.native === element)
                return i;
        }
    }
    return -1;
}
/**
 * Assigns the given data to a DOM element using monkey-patching
 * @param {?} node
 * @param {?} data
 * @return {?}
 */
export function attachLViewDataToNode(node, data) {
    node[MONKEY_PATCH_KEY_NAME] = data;
}
//# sourceMappingURL=element_discovery.js.map