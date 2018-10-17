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
import { bindingUpdated, bindingUpdated2, bindingUpdated4, updateBinding, getBinding, getCreationMode, bindingUpdated3, getBindingRoot, } from './instructions';
/**
 * If the value hasn't been saved, calls the pure function to store and return the
 * value. If it has been saved, returns the saved value.
 *
 * @template T
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn Function that returns a value
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} value
 */
export function pureFunction0(slotOffset, pureFn, thisArg) {
    /** @type {?} */
    var bindingIndex = getBindingRoot() + slotOffset;
    return getCreationMode() ?
        updateBinding(bindingIndex, thisArg ? pureFn.call(thisArg) : pureFn()) :
        getBinding(bindingIndex);
}
/**
 * If the value of the provided exp has changed, calls the pure function to return
 * an updated value. Or if the value has not changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn Function that returns an updated value
 * @param {?} exp Updated expression value
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction1(slotOffset, pureFn, exp, thisArg) {
    /** @type {?} */
    var bindingIndex = getBindingRoot() + slotOffset;
    return bindingUpdated(bindingIndex, exp) ?
        updateBinding(bindingIndex + 1, thisArg ? pureFn.call(thisArg, exp) : pureFn(exp)) :
        getBinding(bindingIndex + 1);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction2(slotOffset, pureFn, exp1, exp2, thisArg) {
    /** @type {?} */
    var bindingIndex = getBindingRoot() + slotOffset;
    return bindingUpdated2(bindingIndex, exp1, exp2) ?
        updateBinding(bindingIndex + 2, thisArg ? pureFn.call(thisArg, exp1, exp2) : pureFn(exp1, exp2)) :
        getBinding(bindingIndex + 2);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction3(slotOffset, pureFn, exp1, exp2, exp3, thisArg) {
    /** @type {?} */
    var bindingIndex = getBindingRoot() + slotOffset;
    return bindingUpdated3(bindingIndex, exp1, exp2, exp3) ?
        updateBinding(bindingIndex + 3, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3) : pureFn(exp1, exp2, exp3)) :
        getBinding(bindingIndex + 3);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?} exp4
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction4(slotOffset, pureFn, exp1, exp2, exp3, exp4, thisArg) {
    /** @type {?} */
    var bindingIndex = getBindingRoot() + slotOffset;
    return bindingUpdated4(bindingIndex, exp1, exp2, exp3, exp4) ?
        updateBinding(bindingIndex + 4, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4) : pureFn(exp1, exp2, exp3, exp4)) :
        getBinding(bindingIndex + 4);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?} exp4
 * @param {?} exp5
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction5(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, thisArg) {
    /** @type {?} */
    var bindingIndex = getBindingRoot() + slotOffset;
    /** @type {?} */
    var different = bindingUpdated4(bindingIndex, exp1, exp2, exp3, exp4);
    return bindingUpdated(bindingIndex + 4, exp5) || different ?
        updateBinding(bindingIndex + 5, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5) :
            pureFn(exp1, exp2, exp3, exp4, exp5)) :
        getBinding(bindingIndex + 5);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?} exp4
 * @param {?} exp5
 * @param {?} exp6
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction6(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, thisArg) {
    /** @type {?} */
    var bindingIndex = getBindingRoot() + slotOffset;
    /** @type {?} */
    var different = bindingUpdated4(bindingIndex, exp1, exp2, exp3, exp4);
    return bindingUpdated2(bindingIndex + 4, exp5, exp6) || different ?
        updateBinding(bindingIndex + 6, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6) :
            pureFn(exp1, exp2, exp3, exp4, exp5, exp6)) :
        getBinding(bindingIndex + 6);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?} exp4
 * @param {?} exp5
 * @param {?} exp6
 * @param {?} exp7
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction7(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, exp7, thisArg) {
    /** @type {?} */
    var bindingIndex = getBindingRoot() + slotOffset;
    /** @type {?} */
    var different = bindingUpdated4(bindingIndex, exp1, exp2, exp3, exp4);
    return bindingUpdated3(bindingIndex + 4, exp5, exp6, exp7) || different ?
        updateBinding(bindingIndex + 7, thisArg ?
            pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6, exp7) :
            pureFn(exp1, exp2, exp3, exp4, exp5, exp6, exp7)) :
        getBinding(bindingIndex + 7);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?} exp4
 * @param {?} exp5
 * @param {?} exp6
 * @param {?} exp7
 * @param {?} exp8
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction8(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8, thisArg) {
    /** @type {?} */
    var bindingIndex = getBindingRoot() + slotOffset;
    /** @type {?} */
    var different = bindingUpdated4(bindingIndex, exp1, exp2, exp3, exp4);
    return bindingUpdated4(bindingIndex + 4, exp5, exp6, exp7, exp8) || different ?
        updateBinding(bindingIndex + 8, thisArg ?
            pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8) :
            pureFn(exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8)) :
        getBinding(bindingIndex + 8);
}
/**
 * pureFunction instruction that can support any number of bindings.
 *
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn A pure function that takes binding values and builds an object or array
 * containing those values.
 * @param {?} exps An array of binding values
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunctionV(slotOffset, pureFn, exps, thisArg) {
    /** @type {?} */
    var bindingIndex = getBindingRoot() + slotOffset;
    /** @type {?} */
    var different = false;
    for (var i = 0; i < exps.length; i++) {
        bindingUpdated(bindingIndex++, exps[i]) && (different = true);
    }
    return different ? updateBinding(bindingIndex, pureFn.apply(thisArg, exps)) :
        getBinding(bindingIndex);
}
//# sourceMappingURL=pure_function.js.map