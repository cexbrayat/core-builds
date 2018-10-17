/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { assertDefined } from './assert';
import { discoverDirectives, discoverLocalRefs, getContext, isComponentInstance } from './context_discovery';
import { NodeInjector } from './di';
import { CONTEXT, FLAGS, PARENT, TVIEW } from './interfaces/view';
import { getComponentViewByIndex, readPatchedLViewData } from './util';
/**
 * Returns the component instance associated with the target.
 *
 * If a DOM is used then it will return the component that
 *    owns the view where the element is situated.
 * If a component instance is used then it will return the
 *    instance of the parent component depending on where
 *    the component instance is exists in a template.
 * If a directive instance is used then it will return the
 *    component that contains that directive in it's template.
 * @template T
 * @param {?} target
 * @return {?}
 */
export function getComponent(target) {
    /** @type {?} */
    var context = /** @type {?} */ ((loadContext(target)));
    if (context.component === undefined) {
        /** @type {?} */
        var lViewData = context.lViewData;
        while (lViewData) {
            /** @type {?} */
            var ctx = /** @type {?} */ (((/** @type {?} */ ((lViewData))[CONTEXT])));
            if (ctx && isComponentInstance(ctx)) {
                context.component = ctx;
                break;
            }
            lViewData = /** @type {?} */ ((/** @type {?} */ ((lViewData))[PARENT]));
        }
        if (context.component === undefined) {
            context.component = null;
        }
    }
    return /** @type {?} */ (context.component);
}
/**
 * Returns the host component instance associated with the target.
 *
 * This will only return a component instance of the DOM node
 * contains an instance of a component on it.
 * @template T
 * @param {?} target
 * @return {?}
 */
export function getHostComponent(target) {
    /** @type {?} */
    var context = loadContext(target);
    /** @type {?} */
    var tNode = /** @type {?} */ (context.lViewData[TVIEW].data[context.nodeIndex]);
    if (tNode.flags & 4096 /* isComponent */) {
        /** @type {?} */
        var componentView = getComponentViewByIndex(context.nodeIndex, context.lViewData);
        return /** @type {?} */ ((componentView[CONTEXT]));
    }
    return null;
}
/**
 * Returns the `RootContext` instance that is associated with
 * the application where the target is situated.
 * @param {?} target
 * @return {?}
 */
export function getRootContext(target) {
    /** @type {?} */
    var context = /** @type {?} */ ((loadContext(target)));
    /** @type {?} */
    var rootLViewData = getRootView(context.lViewData);
    return /** @type {?} */ (rootLViewData[CONTEXT]);
}
/**
 * Returns a list of all the components in the application
 * that are have been bootstrapped.
 * @param {?} target
 * @return {?}
 */
export function getRootComponents(target) {
    return getRootContext(target).components.slice();
}
/**
 * Returns the injector instance that is associated with
 * the element, component or directive.
 * @param {?} target
 * @return {?}
 */
export function getInjector(target) {
    /** @type {?} */
    var context = loadContext(target);
    /** @type {?} */
    var tNode = /** @type {?} */ (context.lViewData[TVIEW].data[context.nodeIndex]);
    return new NodeInjector(tNode, context.lViewData);
}
/**
 * Returns a list of all the directives that are associated
 * with the underlying target element.
 * @param {?} target
 * @return {?}
 */
export function getDirectives(target) {
    /** @type {?} */
    var context = /** @type {?} */ ((loadContext(target)));
    if (context.directives === undefined) {
        context.directives = discoverDirectives(context.nodeIndex, context.lViewData, false);
    }
    return context.directives || [];
}
/**
 * Returns LContext associated with a target passed as an argument.
 * Throws if a given target doesn't have associated LContext.
 * @param {?} target
 * @return {?}
 */
export function loadContext(target) {
    /** @type {?} */
    var context = getContext(target);
    if (!context) {
        throw new Error(ngDevMode ? 'Unable to find the given context data for the given target' :
            'Invalid ng target');
    }
    return context;
}
/**
 * Retrieve the root view from any component by walking the parent `LViewData` until
 * reaching the root `LViewData`.
 *
 * @param {?} componentOrView any component or view
 * @return {?}
 */
export function getRootView(componentOrView) {
    /** @type {?} */
    var lViewData;
    if (Array.isArray(componentOrView)) {
        ngDevMode && assertDefined(componentOrView, 'lViewData');
        lViewData = /** @type {?} */ (componentOrView);
    }
    else {
        ngDevMode && assertDefined(componentOrView, 'component');
        lViewData = /** @type {?} */ ((readPatchedLViewData(componentOrView)));
    }
    while (lViewData && !(lViewData[FLAGS] & 64 /* IsRoot */)) {
        lViewData = /** @type {?} */ ((lViewData[PARENT]));
    }
    return lViewData;
}
/**
 *  Retrieve map of local references (local reference name => element or directive instance).
 * @param {?} target
 * @return {?}
 */
export function getLocalRefs(target) {
    /** @type {?} */
    var context = /** @type {?} */ ((loadContext(target)));
    if (context.localRefs === undefined) {
        context.localRefs = discoverLocalRefs(context.lViewData, context.nodeIndex);
    }
    return context.localRefs || {};
}
//# sourceMappingURL=discovery_utils.js.map