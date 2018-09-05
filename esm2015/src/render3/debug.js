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
import { Injector } from '../di/injector';
import { DebugRendererFactory2 } from '../view/services';
import * as di from './di';
import { NG_HOST_SYMBOL, _getViewData } from './instructions';
import { CONTEXT, DIRECTIVES, TVIEW } from './interfaces/view';
/**
 * Adapts the DebugRendererFactory2 to create a DebugRenderer2 specific for IVY.
 *
 * The created DebugRenderer know how to create a Debug Context specific to IVY.
 */
export class Render3DebugRendererFactory2 extends DebugRendererFactory2 {
    /**
     * @param {?} element
     * @param {?} renderData
     * @return {?}
     */
    createRenderer(element, renderData) {
        /** @type {?} */
        const renderer = /** @type {?} */ (super.createRenderer(element, renderData));
        renderer.debugContextFactory = () => new Render3DebugContext(_getViewData());
        return renderer;
    }
}
/**
 * Stores context information about view nodes.
 *
 * Used in tests to retrieve information those nodes.
 */
class Render3DebugContext {
    /**
     * @param {?} viewData
     */
    constructor(viewData) {
        this.viewData = viewData;
        // The LNode will be created next and appended to viewData
        this.nodeIndex = viewData ? viewData.length : null;
    }
    /**
     * @return {?}
     */
    get view() { return this.viewData; }
    /**
     * @return {?}
     */
    get injector() {
        if (this.nodeIndex !== null) {
            /** @type {?} */
            const lElementNode = this.view[this.nodeIndex];
            /** @type {?} */
            const nodeInjector = lElementNode.nodeInjector;
            if (nodeInjector) {
                return new di.NodeInjector(nodeInjector);
            }
        }
        return Injector.NULL;
    }
    /**
     * @return {?}
     */
    get component() {
        // TODO(vicb): why/when
        if (this.nodeIndex === null) {
            return null;
        }
        /** @type {?} */
        const tView = this.view[TVIEW];
        /** @type {?} */
        const components = tView.components;
        return (components && components.indexOf(this.nodeIndex) == -1) ?
            null :
            this.view[this.nodeIndex].data[CONTEXT];
    }
    /**
     * @return {?}
     */
    get providerTokens() {
        /** @type {?} */
        const matchedDirectives = [];
        // TODO(vicb): why/when
        if (this.nodeIndex === null) {
            return matchedDirectives;
        }
        /** @type {?} */
        const directives = this.view[DIRECTIVES];
        if (directives) {
            /** @type {?} */
            const currentNode = this.view[this.nodeIndex];
            for (let dirIndex = 0; dirIndex < directives.length; dirIndex++) {
                /** @type {?} */
                const directive = directives[dirIndex];
                if (directive[NG_HOST_SYMBOL] === currentNode) {
                    matchedDirectives.push(directive.constructor);
                }
            }
        }
        return matchedDirectives;
    }
    /**
     * @return {?}
     */
    get references() {
        // TODO(vicb): implement retrieving references
        throw new Error('Not implemented yet in ivy');
    }
    /**
     * @return {?}
     */
    get context() {
        if (this.nodeIndex === null) {
            return null;
        }
        /** @type {?} */
        const lNode = this.view[this.nodeIndex];
        return lNode.view[CONTEXT];
    }
    /**
     * @return {?}
     */
    get componentRenderElement() { throw new Error('Not implemented in ivy'); }
    /**
     * @return {?}
     */
    get renderNode() { throw new Error('Not implemented in ivy'); }
    /**
     * @param {?} console
     * @param {...?} values
     * @return {?}
     */
    logError(console, ...values) { console.error(...values); }
}
if (false) {
    /** @type {?} */
    Render3DebugContext.prototype.nodeIndex;
    /** @type {?} */
    Render3DebugContext.prototype.viewData;
}
//# sourceMappingURL=debug.js.map