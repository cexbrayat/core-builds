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
import { DebugRendererFactory2 } from '../view/services';
import { getHostComponent, getInjector, getLocalRefs, loadContext } from './discovery_utils';
import { TVIEW } from './interfaces/view';
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
        renderer.debugContextFactory = (nativeElement) => new Render3DebugContext(nativeElement);
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
     * @param {?} _nativeNode
     */
    constructor(_nativeNode) {
        this._nativeNode = _nativeNode;
    }
    /**
     * @return {?}
     */
    get nodeIndex() { return loadContext(this._nativeNode).nodeIndex; }
    /**
     * @return {?}
     */
    get view() { return loadContext(this._nativeNode).lViewData; }
    /**
     * @return {?}
     */
    get injector() { return getInjector(this._nativeNode); }
    /**
     * @return {?}
     */
    get component() { return getHostComponent(this._nativeNode); }
    /**
     * @return {?}
     */
    get providerTokens() {
        /** @type {?} */
        const lDebugCtx = loadContext(this._nativeNode);
        /** @type {?} */
        const lViewData = lDebugCtx.lViewData;
        /** @type {?} */
        const tNode = /** @type {?} */ (lViewData[TVIEW].data[lDebugCtx.nodeIndex]);
        /** @type {?} */
        const directivesCount = tNode.flags & 4095 /* DirectiveCountMask */;
        if (directivesCount > 0) {
            /** @type {?} */
            const directiveIdxStart = tNode.flags >> 15 /* DirectiveStartingIndexShift */;
            /** @type {?} */
            const directiveIdxEnd = directiveIdxStart + directivesCount;
            /** @type {?} */
            const viewDirectiveDefs = this.view[TVIEW].data;
            /** @type {?} */
            const directiveDefs = /** @type {?} */ (viewDirectiveDefs.slice(directiveIdxStart, directiveIdxEnd));
            return directiveDefs.map(directiveDef => directiveDef.type);
        }
        return [];
    }
    /**
     * @return {?}
     */
    get references() { return getLocalRefs(this._nativeNode); }
    /**
     * @return {?}
     */
    get context() { throw new Error('Not implemented in ivy'); }
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
    Render3DebugContext.prototype._nativeNode;
}
//# sourceMappingURL=debug.js.map