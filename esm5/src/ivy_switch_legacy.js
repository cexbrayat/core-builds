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
import { defineInjectable, defineInjector } from './di/defs';
import { inject, injectArgs } from './di/injector';
import * as ivyOn from './ivy_switch_on';
import { ReflectionCapabilities } from './reflection/reflection_capabilities';
import { getClosureSafeProperty } from './util/property';
/**
 * @return {?}
 */
function noop() { }
/**
 * @record
 */
export function DirectiveCompiler() { }
/** @type {?} */
export var R3_COMPILE_COMPONENT__POST_NGCC__ = ivyOn.R3_COMPILE_COMPONENT;
/** @type {?} */
export var R3_COMPILE_DIRECTIVE__POST_NGCC__ = ivyOn.R3_COMPILE_DIRECTIVE;
/** @type {?} */
export var R3_COMPILE_INJECTABLE__POST_NGCC__ = ivyOn.R3_COMPILE_INJECTABLE;
/** @type {?} */
export var R3_COMPILE_NGMODULE__POST_NGCC__ = ivyOn.R3_COMPILE_NGMODULE;
/** @type {?} */
export var R3_COMPILE_PIPE__POST_NGCC__ = ivyOn.R3_COMPILE_PIPE;
/** @type {?} */
export var ivyEnable__POST_NGCC__ = ivyOn.ivyEnabled;
/** @type {?} */
var R3_COMPILE_COMPONENT__PRE_NGCC__ = noop;
/** @type {?} */
var R3_COMPILE_DIRECTIVE__PRE_NGCC__ = noop;
/** @type {?} */
var R3_COMPILE_INJECTABLE__PRE_NGCC__ = preR3InjectableCompile;
/** @type {?} */
var R3_COMPILE_NGMODULE__PRE_NGCC__ = preR3NgModuleCompile;
/** @type {?} */
var R3_COMPILE_PIPE__PRE_NGCC__ = noop;
/** @type {?} */
var ivyEnable__PRE_NGCC__ = false;
/** @type {?} */
export var ivyEnabled = ivyEnable__PRE_NGCC__;
/** @type {?} */
export var R3_COMPILE_COMPONENT = R3_COMPILE_COMPONENT__PRE_NGCC__;
/** @type {?} */
export var R3_COMPILE_DIRECTIVE = R3_COMPILE_DIRECTIVE__PRE_NGCC__;
/** @type {?} */
export var R3_COMPILE_INJECTABLE = R3_COMPILE_INJECTABLE__PRE_NGCC__;
/** @type {?} */
export var R3_COMPILE_NGMODULE = R3_COMPILE_NGMODULE__PRE_NGCC__;
/** @type {?} */
export var R3_COMPILE_PIPE = R3_COMPILE_PIPE__PRE_NGCC__;
/**
 * @param {?} moduleType
 * @param {?} metadata
 * @return {?}
 */
function preR3NgModuleCompile(moduleType, metadata) {
    /** @type {?} */
    var imports = (metadata && metadata.imports) || [];
    if (metadata && metadata.exports) {
        imports = imports.concat([metadata.exports]);
    }
    moduleType.ngInjectorDef = defineInjector({
        factory: convertInjectableProviderToFactory(moduleType, { useClass: moduleType }),
        providers: metadata && metadata.providers,
        imports: imports,
    });
}
/** @type {?} */
var GET_PROPERTY_NAME = /** @type {?} */ ({});
var ɵ0 = GET_PROPERTY_NAME;
/** @type {?} */
var USE_VALUE = getClosureSafeProperty({ provide: String, useValue: ɵ0 }, GET_PROPERTY_NAME);
/** @type {?} */
var EMPTY_ARRAY = [];
/**
 * @param {?} type
 * @param {?=} provider
 * @return {?}
 */
function convertInjectableProviderToFactory(type, provider) {
    if (!provider) {
        /** @type {?} */
        var reflectionCapabilities = new ReflectionCapabilities();
        /** @type {?} */
        var deps_1 = reflectionCapabilities.parameters(type);
        // TODO - convert to flags.
        return function () { return new (type.bind.apply(type, [void 0].concat(injectArgs(/** @type {?} */ (deps_1)))))(); };
    }
    if (USE_VALUE in provider) {
        /** @type {?} */
        var valueProvider_1 = (/** @type {?} */ (provider));
        return function () { return valueProvider_1.useValue; };
    }
    else if ((/** @type {?} */ (provider)).useExisting) {
        /** @type {?} */
        var existingProvider_1 = (/** @type {?} */ (provider));
        return function () { return inject(existingProvider_1.useExisting); };
    }
    else if ((/** @type {?} */ (provider)).useFactory) {
        /** @type {?} */
        var factoryProvider_1 = (/** @type {?} */ (provider));
        return function () { return factoryProvider_1.useFactory.apply(factoryProvider_1, injectArgs(factoryProvider_1.deps || EMPTY_ARRAY)); };
    }
    else if ((/** @type {?} */ (provider)).useClass) {
        /** @type {?} */
        var classProvider_1 = (/** @type {?} */ (provider));
        /** @type {?} */
        var deps_2 = (/** @type {?} */ (provider)).deps;
        if (!deps_2) {
            /** @type {?} */
            var reflectionCapabilities = new ReflectionCapabilities();
            deps_2 = reflectionCapabilities.parameters(type);
        }
        return function () {
            var _a;
            return new ((_a = classProvider_1.useClass).bind.apply(_a, [void 0].concat(injectArgs(deps_2))))();
        };
    }
    else {
        /** @type {?} */
        var deps_3 = (/** @type {?} */ (provider)).deps;
        if (!deps_3) {
            /** @type {?} */
            var reflectionCapabilities = new ReflectionCapabilities();
            deps_3 = reflectionCapabilities.parameters(type);
        }
        return function () { return new (type.bind.apply(type, [void 0].concat(injectArgs(/** @type {?} */ ((deps_3))))))(); };
    }
}
/**
 * Supports \@Injectable() in JIT mode for Render2.
 * @param {?} injectableType
 * @param {?} options
 * @return {?}
 */
function preR3InjectableCompile(injectableType, options) {
    if (options && options.providedIn !== undefined && injectableType.ngInjectableDef === undefined) {
        /** @nocollapse */ injectableType.ngInjectableDef = defineInjectable({
            providedIn: options.providedIn,
            factory: convertInjectableProviderToFactory(injectableType, options),
        });
    }
}
export { ɵ0 };
//# sourceMappingURL=ivy_switch_legacy.js.map