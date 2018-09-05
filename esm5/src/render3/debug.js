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
        renderer.debugContextFactory = function () { return new Render3DebugContext(_getViewData()); };
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
    function Render3DebugContext(viewData) {
        this.viewData = viewData;
        // The LNode will be created next and appended to viewData
        this.nodeIndex = viewData ? viewData.length : null;
    }
    Object.defineProperty(Render3DebugContext.prototype, "view", {
        get: /**
         * @return {?}
         */
        function () { return this.viewData; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render3DebugContext.prototype, "injector", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.nodeIndex !== null) {
                /** @type {?} */
                var lElementNode = this.view[this.nodeIndex];
                /** @type {?} */
                var nodeInjector = lElementNode.nodeInjector;
                if (nodeInjector) {
                    return new di.NodeInjector(nodeInjector);
                }
            }
            return Injector.NULL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render3DebugContext.prototype, "component", {
        get: /**
         * @return {?}
         */
        function () {
            // TODO(vicb): why/when
            if (this.nodeIndex === null) {
                return null;
            }
            /** @type {?} */
            var tView = this.view[TVIEW];
            /** @type {?} */
            var components = tView.components;
            return (components && components.indexOf(this.nodeIndex) == -1) ?
                null :
                this.view[this.nodeIndex].data[CONTEXT];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render3DebugContext.prototype, "providerTokens", {
        // TODO(vicb): add view providers when supported
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var matchedDirectives = [];
            // TODO(vicb): why/when
            if (this.nodeIndex === null) {
                return matchedDirectives;
            }
            /** @type {?} */
            var directives = this.view[DIRECTIVES];
            if (directives) {
                /** @type {?} */
                var currentNode = this.view[this.nodeIndex];
                for (var dirIndex = 0; dirIndex < directives.length; dirIndex++) {
                    /** @type {?} */
                    var directive = directives[dirIndex];
                    if (directive[NG_HOST_SYMBOL] === currentNode) {
                        matchedDirectives.push(directive.constructor);
                    }
                }
            }
            return matchedDirectives;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render3DebugContext.prototype, "references", {
        get: /**
         * @return {?}
         */
        function () {
            // TODO(vicb): implement retrieving references
            throw new Error('Not implemented yet in ivy');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render3DebugContext.prototype, "context", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.nodeIndex === null) {
                return null;
            }
            /** @type {?} */
            var lNode = this.view[this.nodeIndex];
            return lNode.view[CONTEXT];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render3DebugContext.prototype, "componentRenderElement", {
        get: /**
         * @return {?}
         */
        function () { throw new Error('Not implemented in ivy'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Render3DebugContext.prototype, "renderNode", {
        get: /**
         * @return {?}
         */
        function () { throw new Error('Not implemented in ivy'); },
        enumerable: true,
        configurable: true
    });
    // TODO(vicb): check previous implementation
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
    Render3DebugContext.prototype.nodeIndex;
    /** @type {?} */
    Render3DebugContext.prototype.viewData;
}
//# sourceMappingURL=debug.js.map