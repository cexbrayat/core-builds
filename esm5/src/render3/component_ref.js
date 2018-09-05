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
import { LifecycleHooksFeature, createRootContext } from './component';
import { adjustBlueprintForNewNode, baseDirectiveCreate, createLNode, createLViewData, createTView, elementCreate, enterView, hostElement, initChangeDetectorIfExisting, locateHostElement, queueHostBindingForCheck, renderEmbeddedTemplate, setHostBindings } from './instructions';
import { domRendererFactory3 } from './interfaces/renderer';
import { CONTEXT, FLAGS, INJECTOR, TVIEW } from './interfaces/view';
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
        var componentDef = (/** @type {?} */ (component)).ngComponentDef;
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
        var hostNode = isInternalRootView ?
            elementCreate(this.selector, rendererFactory.createRenderer(null, this.componentDef)) :
            locateHostElement(rendererFactory, rootSelectorOrNode);
        /** @type {?} */
        var componentTag = /** @type {?} */ (((/** @type {?} */ ((this.componentDef.selectors))[0]))[0]);
        /** @type {?} */
        var rootContext = ngModule && !isInternalRootView ?
            ngModule.injector.get(ROOT_CONTEXT) :
            createRootContext(requestAnimationFrame.bind(window));
        /** @type {?} */
        var rootView = createLViewData(rendererFactory.createRenderer(hostNode, this.componentDef), createTView(-1, null, 1, 0, null, null, null), rootContext, this.componentDef.onPush ? 4 /* Dirty */ : 2 /* CheckAlways */);
        rootView[INJECTOR] = ngModule && ngModule.injector || null;
        /** @type {?} */
        var oldView = enterView(rootView, /** @type {?} */ ((null)));
        /** @type {?} */
        var component;
        /** @type {?} */
        var elementNode;
        try {
            if (rendererFactory.begin)
                rendererFactory.begin();
            // Create element node at index 0 in data array
            elementNode = hostElement(componentTag, hostNode, this.componentDef);
            // Create directive instance with factory() and store at index 0 in directives array
            component = baseDirectiveCreate(0, this.componentDef.factory(), this.componentDef);
            if (this.componentDef.hostBindings) {
                queueHostBindingForCheck(0, this.componentDef.hostVars);
            }
            rootContext.components.push(component);
            initChangeDetectorIfExisting(elementNode.nodeInjector, component, /** @type {?} */ ((elementNode.data)));
            (/** @type {?} */ (elementNode.data))[CONTEXT] = component;
            // TODO: should LifecycleHooksFeature and other host features be generated by the compiler and
            // executed here?
            // Angular 5 reference: https://stackblitz.com/edit/lifecycle-hooks-vcref
            LifecycleHooksFeature(component, this.componentDef);
            setHostBindings(rootView[TVIEW].hostBindings);
            // Transform the arrays of native nodes into a LNode structure that can be consumed by the
            // projection instruction. This is needed to support the reprojection of these nodes.
            if (projectableNodes) {
                /** @type {?} */
                var index = 0;
                /** @type {?} */
                var projection = elementNode.tNode.projection = [];
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
                        var lNode = createLNode(++index, 3 /* Element */, /** @type {?} */ (nodeList[j]), null, null);
                        if (previousTNode) {
                            previousTNode.next = lNode.tNode;
                        }
                        else {
                            firstTNode = lNode.tNode;
                        }
                        previousTNode = lNode.tNode;
                    }
                    projection.push(/** @type {?} */ ((firstTNode)));
                }
            }
            // Execute the template in creation mode only, and then turn off the CreationMode flag
            renderEmbeddedTemplate(elementNode, /** @type {?} */ ((elementNode.data))[TVIEW], component, 1 /* Create */); /** @type {?} */
            ((elementNode.data))[FLAGS] &= ~1 /* CreationMode */;
        }
        finally {
            enterView(oldView, null);
            if (rendererFactory.end)
                rendererFactory.end();
        }
        /** @type {?} */
        var componentRef = new ComponentRef(this.componentType, component, rootView, injector, /** @type {?} */ ((hostNode)));
        if (isInternalRootView) {
            /** @type {?} */ ((
            // The host element of the internal root view is attached to the component's host view node
            componentRef.hostView._lViewNode)).tNode.child = elementNode.tNode;
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
    function ComponentRef(componentType, instance, rootView, injector, hostNode) {
        var _this = _super.call(this) || this;
        _this.destroyCbs = [];
        _this.instance = instance;
        _this.hostView = _this.changeDetectorRef = new RootViewRef(rootView);
        _this.hostView._lViewNode = createLNode(-1, 2 /* View */, null, null, null, rootView);
        _this.injector = injector;
        _this.location = new viewEngine_ElementRef(hostNode);
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
    ComponentRef.prototype.location;
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
}
//# sourceMappingURL=component_ref.js.map