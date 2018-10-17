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
import * as tslib_1 from "tslib";
import { DebugRendererFactory2 } from '../view/services';
import { getHostComponent, getInjector, getLocalRefs, loadContext } from './discovery_utils';
import { TVIEW } from './interfaces/view';
/**
 * Adapts the DebugRendererFactory2 to create a DebugRenderer2 specific for IVY.
 *
 * The created DebugRenderer know how to create a Debug Context specific to IVY.
 */
var /**
 * Adapts the DebugRendererFactory2 to create a DebugRenderer2 specific for IVY.
 *
 * The created DebugRenderer know how to create a Debug Context specific to IVY.
 */
Render3DebugRendererFactory2 = /** @class */ (function (_super) {
    tslib_1.__extends(Render3DebugRendererFactory2, _super);
    function Render3DebugRendererFactory2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} element
     * @param {?} renderData
     * @return {?}
     */
    Render3DebugRendererFactory2.prototype.createRenderer = /**
     * @param {?} element
     * @param {?} renderData
     * @return {?}
     */
    function (element, renderData) {
        /** @type {?} */
        var renderer = /** @type {?} */ (_super.prototype.createRenderer.call(this, element, renderData));
        renderer.debugContextFactory = function (nativeElement) { return new Render3DebugContext(nativeElement); };
        return renderer;
    };
    return Render3DebugRendererFactory2;
}(DebugRendererFactory2));
/**
 * Adapts the DebugRendererFactory2 to create a DebugRenderer2 specific for IVY.
 *
 * The created DebugRenderer know how to create a Debug Context specific to IVY.
 */
export { Render3DebugRendererFactory2 };
/**
 * Stores context information about view nodes.
 *
 * Used in tests to retrieve information those nodes.
 */
var /**
 * Stores context information about view nodes.
 *
 * Used in tests to retrieve information those nodes.
 */
Render3DebugContext = /** @class */ (function () {
    function Render3DebugContext(_nativeNode) {
        this._nativeNode = _nativeNode;
    }
    Object.defineProperty(Render3DebugContext.prototype, "nodeIndex", {
        get: /**
         * @return {?}
         */
        function () { return loadContext(this._nativeNode).nodeIndex; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render3DebugContext.prototype, "view", {
        get: /**
         * @return {?}
         */
        function () { return loadContext(this._nativeNode).lViewData; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render3DebugContext.prototype, "injector", {
        get: /**
         * @return {?}
         */
        function () { return getInjector(this._nativeNode); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render3DebugContext.prototype, "component", {
        get: /**
         * @return {?}
         */
        function () { return getHostComponent(this._nativeNode); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render3DebugContext.prototype, "providerTokens", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var lDebugCtx = loadContext(this._nativeNode);
            /** @type {?} */
            var lViewData = lDebugCtx.lViewData;
            /** @type {?} */
            var tNode = /** @type {?} */ (lViewData[TVIEW].data[lDebugCtx.nodeIndex]);
            /** @type {?} */
            var directivesCount = tNode.flags & 4095 /* DirectiveCountMask */;
            if (directivesCount > 0) {
                /** @type {?} */
                var directiveIdxStart = tNode.flags >> 15 /* DirectiveStartingIndexShift */;
                /** @type {?} */
                var directiveIdxEnd = directiveIdxStart + directivesCount;
                /** @type {?} */
                var viewDirectiveDefs = this.view[TVIEW].data;
                /** @type {?} */
                var directiveDefs = /** @type {?} */ (viewDirectiveDefs.slice(directiveIdxStart, directiveIdxEnd));
                return directiveDefs.map(function (directiveDef) { return directiveDef.type; });
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render3DebugContext.prototype, "references", {
        get: /**
         * @return {?}
         */
        function () { return getLocalRefs(this._nativeNode); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render3DebugContext.prototype, "context", {
        // TODO(pk): check previous implementation and re-implement
        get: /**
         * @return {?}
         */
        function () { throw new Error('Not implemented in ivy'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render3DebugContext.prototype, "componentRenderElement", {
        // TODO(pk): check previous implementation and re-implement
        get: /**
         * @return {?}
         */
        function () { throw new Error('Not implemented in ivy'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render3DebugContext.prototype, "renderNode", {
        // TODO(pk): check previous implementation and re-implement
        get: /**
         * @return {?}
         */
        function () { throw new Error('Not implemented in ivy'); },
        enumerable: true,
        configurable: true
    });
    // TODO(pk): check previous implementation and re-implement
    /**
     * @param {?} console
     * @param {...?} values
     * @return {?}
     */
    Render3DebugContext.prototype.logError = /**
     * @param {?} console
     * @param {...?} values
     * @return {?}
     */
    function (console) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        console.error.apply(console, values);
    };
    return Render3DebugContext;
}());
if (false) {
    /** @type {?} */
    Render3DebugContext.prototype._nativeNode;
}
//# sourceMappingURL=debug.js.map