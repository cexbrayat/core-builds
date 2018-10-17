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
import { InjectionToken } from '../di/injection_token';
import { inject } from '../di/injector';
import { ComponentFactory as viewEngine_ComponentFactory, ComponentRef as viewEngine_ComponentRef } from '../linker/component_factory';
import { ComponentFactoryResolver as viewEngine_ComponentFactoryResolver } from '../linker/component_factory_resolver';
import { ElementRef as viewEngine_ElementRef } from '../linker/element_ref';
import { RendererFactory2 } from '../render/api';
import { assertComponentType, assertDefined } from './assert';
import { LifecycleHooksFeature, createRootComponent, createRootComponentView, createRootContext } from './component';
import { getComponentDef } from './definition';
import { adjustBlueprintForNewNode, createLViewData, createNodeAtIndex, createTView, createViewNode, elementCreate, enterView, locateHostElement, renderEmbeddedTemplate } from './instructions';
import { domRendererFactory3 } from './interfaces/renderer';
import { FLAGS, INJECTOR, TVIEW } from './interfaces/view';
import { getTNode } from './util';
import { createElementRef } from './view_engine_compatibility';
import { RootViewRef } from './view_ref';
var ComponentFactoryResolver = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentFactoryResolver, _super);
    function ComponentFactoryResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    ComponentFactoryResolver.prototype.resolveComponentFactory = /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    function (component) {
        ngDevMode && assertComponentType(component);
        /** @type {?} */
        var componentDef = /** @type {?} */ ((getComponentDef(component)));
        return new ComponentFactory(componentDef);
    };
    return ComponentFactoryResolver;
}(viewEngine_ComponentFactoryResolver));
export { ComponentFactoryResolver };
/**
 * @param {?} map
 * @return {?}
 */
function toRefArray(map) {
    /** @type {?} */
    var array = [];
    for (var nonMinified in map) {
        if (map.hasOwnProperty(nonMinified)) {
            /** @type {?} */
            var minified = map[nonMinified];
            array.push({ propName: minified, templateName: nonMinified });
        }
    }
    return array;
}
/** *
 * Default {\@link RootContext} for all components rendered with {\@link renderComponent}.
  @type {?} */
export var ROOT_CONTEXT = new InjectionToken('ROOT_CONTEXT_TOKEN', { providedIn: 'root', factory: function () { return createRootContext(inject(SCHEDULER)); } });
/** *
 * A change detection scheduler token for {\@link RootContext}. This token is the default value used
 * for the default `RootContext` found in the {\@link ROOT_CONTEXT} token.
  @type {?} */
export var SCHEDULER = new InjectionToken('SCHEDULER_TOKEN', {
    providedIn: 'root',
    factory: function () {
        /** @type {?} */
        var useRaf = typeof requestAnimationFrame !== 'undefined' && typeof window !== 'undefined';
        return useRaf ? requestAnimationFrame.bind(window) : setTimeout;
    },
});
/** *
 * A function used to wrap the `RendererFactory2`.
 * Used in tests to change the `RendererFactory2` into a `DebugRendererFactory2`.
  @type {?} */
export var WRAP_RENDERER_FACTORY2 = new InjectionToken('WRAP_RENDERER_FACTORY2');
/**
 * Render3 implementation of {\@link viewEngine_ComponentFactory}.
 * @template T
 */
var /**
 * Render3 implementation of {\@link viewEngine_ComponentFactory}.
 * @template T
 */
ComponentFactory = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentFactory, _super);
    function ComponentFactory(componentDef) {
        var _this = _super.call(this) || this;
        _this.componentDef = componentDef;
        _this.componentType = componentDef.type;
        _this.selector = /** @type {?} */ (componentDef.selectors[0][0]);
        _this.ngContentSelectors = [];
        return _this;
    }
    Object.defineProperty(ComponentFactory.prototype, "inputs", {
        get: /**
         * @return {?}
         */
        function () {
            return toRefArray(this.componentDef.inputs);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentFactory.prototype, "outputs", {
        get: /**
         * @return {?}
         */
        function () {
            return toRefArray(this.componentDef.outputs);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} injector
     * @param {?=} projectableNodes
     * @param {?=} rootSelectorOrNode
     * @param {?=} ngModule
     * @return {?}
     */
    ComponentFactory.prototype.create = /**
     * @param {?} injector
     * @param {?=} projectableNodes
     * @param {?=} rootSelectorOrNode
     * @param {?=} ngModule
     * @return {?}
     */
    function (injector, projectableNodes, rootSelectorOrNode, ngModule) {
        /** @type {?} */
        var isInternalRootView = rootSelectorOrNode === undefined;
        /** @type {?} */
        var rendererFactory;
        if (ngModule) {
            /** @type {?} */
            var wrapper = ngModule.injector.get(WRAP_RENDERER_FACTORY2, function (v) { return v; });
            rendererFactory = /** @type {?} */ (wrapper(ngModule.injector.get(RendererFactory2)));
        }
        else {
            rendererFactory = domRendererFactory3;
        }
        /** @type {?} */
        var hostRNode = isInternalRootView ?
            elementCreate(this.selector, rendererFactory.createRenderer(null, this.componentDef)) :
            locateHostElement(rendererFactory, rootSelectorOrNode);
        /** @type {?} */
        var componentTag = /** @type {?} */ (((/** @type {?} */ ((this.componentDef.selectors))[0]))[0]);
        /** @type {?} */
        var rootFlags = this.componentDef.onPush ? 4 /* Dirty */ | 64 /* IsRoot */ :
            2 /* CheckAlways */ | 64 /* IsRoot */;
        /** @type {?} */
        var rootContext = ngModule && !isInternalRootView ?
            ngModule.injector.get(ROOT_CONTEXT) :
            createRootContext(requestAnimationFrame.bind(window));
        /** @type {?} */
        var renderer = rendererFactory.createRenderer(hostRNode, this.componentDef);
        /** @type {?} */
        var rootView = createLViewData(renderer, createTView(-1, null, 1, 0, null, null, null), rootContext, rootFlags);
        rootView[INJECTOR] = ngModule && ngModule.injector || null;
        /** @type {?} */
        var oldView = enterView(rootView, null);
        /** @type {?} */
        var component;
        /** @type {?} */
        var tElementNode;
        try {
            if (rendererFactory.begin)
                rendererFactory.begin();
            /** @type {?} */
            var componentView = createRootComponentView(hostRNode, this.componentDef, rootView, renderer);
            tElementNode = /** @type {?} */ (getTNode(0, rootView));
            // Transform the arrays of native nodes into a structure that can be consumed by the
            // projection instruction. This is needed to support the reprojection of these nodes.
            if (projectableNodes) {
                /** @type {?} */
                var index = 0;
                /** @type {?} */
                var projection = tElementNode.projection = [];
                for (var i = 0; i < projectableNodes.length; i++) {
                    /** @type {?} */
                    var nodeList = projectableNodes[i];
                    /** @type {?} */
                    var firstTNode = null;
                    /** @type {?} */
                    var previousTNode = null;
                    for (var j = 0; j < nodeList.length; j++) {
                        adjustBlueprintForNewNode(rootView);
                        /** @type {?} */
                        var tNode = createNodeAtIndex(++index, 3 /* Element */, /** @type {?} */ (nodeList[j]), null, null);
                        previousTNode ? (previousTNode.next = tNode) : (firstTNode = tNode);
                        previousTNode = tNode;
                    }
                    projection.push(/** @type {?} */ ((firstTNode)));
                }
            }
            // TODO: should LifecycleHooksFeature and other host features be generated by the compiler and
            // executed here?
            // Angular 5 reference: https://stackblitz.com/edit/lifecycle-hooks-vcref
            component = createRootComponent(hostRNode, componentView, this.componentDef, rootView, rootContext, [LifecycleHooksFeature]);
            // Execute the template in creation mode only, and then turn off the CreationMode flag
            renderEmbeddedTemplate(componentView, componentView[TVIEW], component, 1 /* Create */);
            componentView[FLAGS] &= ~1 /* CreationMode */;
        }
        finally {
            enterView(oldView, null);
            if (rendererFactory.end)
                rendererFactory.end();
        }
        /** @type {?} */
        var componentRef = new ComponentRef(this.componentType, component, rootView, injector, createElementRef(viewEngine_ElementRef, tElementNode, rootView));
        if (isInternalRootView) {
            /** @type {?} */ ((
            // The host element of the internal root view is attached to the component's host view node
            componentRef.hostView._tViewNode)).child = tElementNode;
        }
        return componentRef;
    };
    return ComponentFactory;
}(viewEngine_ComponentFactory));
/**
 * Render3 implementation of {\@link viewEngine_ComponentFactory}.
 * @template T
 */
export { ComponentFactory };
if (false) {
    /** @type {?} */
    ComponentFactory.prototype.selector;
    /** @type {?} */
    ComponentFactory.prototype.componentType;
    /** @type {?} */
    ComponentFactory.prototype.ngContentSelectors;
    /** @type {?} */
    ComponentFactory.prototype.componentDef;
}
/** @type {?} */
var componentFactoryResolver = new ComponentFactoryResolver();
/**
 * Creates a ComponentFactoryResolver and stores it on the injector. Or, if the
 * ComponentFactoryResolver
 * already exists, retrieves the existing ComponentFactoryResolver.
 *
 * @return {?} The ComponentFactoryResolver instance to use
 */
export function injectComponentFactoryResolver() {
    return componentFactoryResolver;
}
/**
 * Represents an instance of a Component created via a {\@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {\@link #destroy}
 * method.
 *
 * @template T
 */
var /**
 * Represents an instance of a Component created via a {\@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {\@link #destroy}
 * method.
 *
 * @template T
 */
ComponentRef = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentRef, _super);
    function ComponentRef(componentType, instance, rootView, injector, location) {
        var _this = _super.call(this) || this;
        _this.location = location;
        _this.destroyCbs = [];
        _this.instance = instance;
        _this.hostView = _this.changeDetectorRef = new RootViewRef(rootView);
        _this.hostView._tViewNode = createViewNode(-1, rootView);
        _this.injector = injector;
        _this.componentType = componentType;
        return _this;
    }
    /**
     * @return {?}
     */
    ComponentRef.prototype.destroy = /**
     * @return {?}
     */
    function () {
        ngDevMode && assertDefined(this.destroyCbs, 'NgModule already destroyed'); /** @type {?} */
        ((this.destroyCbs)).forEach(function (fn) { return fn(); });
        this.destroyCbs = null;
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    ComponentRef.prototype.onDestroy = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        ngDevMode && assertDefined(this.destroyCbs, 'NgModule already destroyed'); /** @type {?} */
        ((this.destroyCbs)).push(callback);
    };
    return ComponentRef;
}(viewEngine_ComponentRef));
/**
 * Represents an instance of a Component created via a {\@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {\@link #destroy}
 * method.
 *
 * @template T
 */
export { ComponentRef };
if (false) {
    /** @type {?} */
    ComponentRef.prototype.destroyCbs;
    /** @type {?} */
    ComponentRef.prototype.injector;
    /** @type {?} */
    ComponentRef.prototype.instance;
    /** @type {?} */
    ComponentRef.prototype.hostView;
    /** @type {?} */
    ComponentRef.prototype.changeDetectorRef;
    /** @type {?} */
    ComponentRef.prototype.componentType;
    /** @type {?} */
    ComponentRef.prototype.location;
}
//# sourceMappingURL=component_ref.js.map