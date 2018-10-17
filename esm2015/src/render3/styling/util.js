/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getContext } from '../context_discovery';
import { ACTIVE_INDEX } from '../interfaces/container';
import { FLAGS, HEADER_OFFSET, HOST } from '../interfaces/view';
import { getTNode } from '../util';
/** @type {?} */
export const EMPTY_ARR = [];
/** @type {?} */
export const EMPTY_OBJ = {};
/**
 * @param {?=} element
 * @param {?=} sanitizer
 * @param {?=} initialStylingValues
 * @return {?}
 */
export function createEmptyStylingContext(element, sanitizer, initialStylingValues) {
    return [
        null,
        // PlayerContext
        sanitizer || null,
        // StyleSanitizer
        initialStylingValues || [null],
        0,
        0,
        // ClassOffset
        element || null,
        null,
        null
    ];
}
/**
 * Used clone a copy of a pre-computed template of a styling context.
 *
 * A pre-computed template is designed to be computed once for a given element
 * (instructions.ts has logic for caching this).
 * @param {?} element
 * @param {?} templateStyleContext
 * @return {?}
 */
export function allocStylingContext(element, templateStyleContext) {
    /** @type {?} */
    const context = /** @type {?} */ ((templateStyleContext.slice()));
    context[5 /* ElementPosition */] = element;
    return context;
}
/**
 * Retrieve the `StylingContext` at a given index.
 *
 * This method lazily creates the `StylingContext`. This is because in most cases
 * we have styling without any bindings. Creating `StylingContext` eagerly would mean that
 * every style declaration such as `<div style="color: red">` would result `StyleContext`
 * which would create unnecessary memory pressure.
 *
 * @param {?} index Index of the style allocation. See: `elementStyling`.
 * @param {?} viewData The view to search for the styling context
 * @return {?}
 */
export function getStylingContext(index, viewData) {
    /** @type {?} */
    let storageIndex = index + HEADER_OFFSET;
    /** @type {?} */
    let slotValue = viewData[storageIndex];
    /** @type {?} */
    let wrapper = viewData;
    while (Array.isArray(slotValue)) {
        wrapper = slotValue;
        slotValue = /** @type {?} */ (slotValue[HOST]);
    }
    if (isStylingContext(wrapper)) {
        return /** @type {?} */ (wrapper);
    }
    else {
        /** @type {?} */
        const stylingTemplate = getTNode(index, viewData).stylingTemplate;
        if (wrapper !== viewData)
            storageIndex = HOST;
        return wrapper[storageIndex] = stylingTemplate ?
            allocStylingContext(slotValue, stylingTemplate) :
            createEmptyStylingContext(slotValue);
    }
}
/**
 * @param {?} value
 * @return {?}
 */
function isStylingContext(value) {
    // Not an LViewData or an LContainer
    return typeof value[FLAGS] !== 'number' && typeof value[ACTIVE_INDEX] !== 'number';
}
/**
 * @param {?} target
 * @param {?=} context
 * @return {?}
 */
export function getOrCreatePlayerContext(target, context) {
    context = context || /** @type {?} */ ((getContext(target)));
    if (ngDevMode && !context) {
        throw new Error('Only elements that exist in an Angular application can be used for player access');
    }
    const { lViewData, nodeIndex } = context;
    /** @type {?} */
    const stylingContext = getStylingContext(nodeIndex - HEADER_OFFSET, lViewData);
    return stylingContext[0 /* PlayerContext */] || allocPlayerContext(stylingContext);
}
/**
 * @param {?} data
 * @return {?}
 */
function allocPlayerContext(data) {
    return data[0 /* PlayerContext */] = [];
}
//# sourceMappingURL=util.js.map