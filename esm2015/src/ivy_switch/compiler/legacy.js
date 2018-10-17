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
import { defineInjectable, defineInjector, getInjectableDef } from '../../di/defs';
import { inject, injectArgs } from '../../di/injector';
import { ReflectionCapabilities } from '../../reflection/reflection_capabilities';
import { getClosureSafeProperty } from '../../util/property';
import * as ivyOn from './ivy_switch_on';
/**
 * @return {?}
 */
function noop() { }
/**
 * @record
 */
export function DirectiveCompiler() { }
/** @type {?} */
export const R3_COMPILE_COMPONENT__POST_NGCC__ = ivyOn.R3_COMPILE_COMPONENT;
/** @type {?} */
export const R3_COMPILE_DIRECTIVE__POST_NGCC__ = ivyOn.R3_COMPILE_DIRECTIVE;
/** @type {?} */
export const R3_COMPILE_INJECTABLE__POST_NGCC__ = ivyOn.R3_COMPILE_INJECTABLE;
/** @type {?} */
export const R3_COMPILE_NGMODULE__POST_NGCC__ = ivyOn.R3_COMPILE_NGMODULE;
/** @type {?} */
export const R3_COMPILE_PIPE__POST_NGCC__ = ivyOn.R3_COMPILE_PIPE;
/** @type {?} */
export const R3_COMPILE_NGMODULE_DEFS__POST_NGCC__ = ivyOn.R3_COMPILE_NGMODULE_DEFS;
/** @type {?} */
export const R3_PATCH_COMPONENT_DEF_WTIH_SCOPE__POST_NGCC__ = ivyOn.R3_PATCH_COMPONENT_DEF_WTIH_SCOPE;
/** @type {?} */
export const ivyEnable__POST_NGCC__ = ivyOn.ivyEnabled;
/** @type {?} */
const R3_COMPILE_COMPONENT__PRE_NGCC__ = noop;
/** @type {?} */
const R3_COMPILE_DIRECTIVE__PRE_NGCC__ = noop;
/** @type {?} */
const R3_COMPILE_INJECTABLE__PRE_NGCC__ = preR3InjectableCompile;
/** @type {?} */
const R3_COMPILE_NGMODULE__PRE_NGCC__ = preR3NgModuleCompile;
/** @type {?} */
const R3_COMPILE_PIPE__PRE_NGCC__ = noop;
/** @type {?} */
const R3_COMPILE_NGMODULE_DEFS__PRE_NGCC__ = noop;
/** @type {?} */
const R3_PATCH_COMPONENT_DEF_WTIH_SCOPE__PRE_NGCC__ = noop;
/** @type {?} */
const ivyEnable__PRE_NGCC__ = false;
/** @type {?} */
export const ivyEnabled = ivyEnable__PRE_NGCC__;
/** @type {?} */
export let R3_COMPILE_COMPONENT = R3_COMPILE_COMPONENT__PRE_NGCC__;
/** @type {?} */
export let R3_COMPILE_DIRECTIVE = R3_COMPILE_DIRECTIVE__PRE_NGCC__;
/** @type {?} */
export let R3_COMPILE_INJECTABLE = R3_COMPILE_INJECTABLE__PRE_NGCC__;
/** @type {?} */
export let R3_COMPILE_NGMODULE = R3_COMPILE_NGMODULE__PRE_NGCC__;
/** @type {?} */
export let R3_COMPILE_PIPE = R3_COMPILE_PIPE__PRE_NGCC__;
/** @type {?} */
export let R3_COMPILE_NGMODULE_DEFS = R3_COMPILE_NGMODULE_DEFS__PRE_NGCC__;
/** @type {?} */
export let R3_PATCH_COMPONENT_DEF_WTIH_SCOPE = R3_PATCH_COMPONENT_DEF_WTIH_SCOPE__PRE_NGCC__;
/**
 * @param {?} moduleType
 * @param {?} metadata
 * @return {?}
 */
function preR3NgModuleCompile(moduleType, metadata) {
    /** @type {?} */
    let imports = (metadata && metadata.imports) || [];
    if (metadata && metadata.exports) {
        imports = [...imports, metadata.exports];
    }
    /** @nocollapse */ moduleType.ngInjectorDef = defineInjector({
        factory: convertInjectableProviderToFactory(moduleType, { useClass: moduleType }),
        providers: metadata && metadata.providers,
        imports: imports,
    });
}
const ɵ0 = getClosureSafeProperty;
/** @type {?} */
const USE_VALUE = getClosureSafeProperty({ provide: String, useValue: ɵ0 });
/** @type {?} */
const EMPTY_ARRAY = [];
/**
 * @param {?} type
 * @param {?=} provider
 * @return {?}
 */
function convertInjectableProviderToFactory(type, provider) {
    if (!provider) {
        /** @type {?} */
        const reflectionCapabilities = new ReflectionCapabilities();
        /** @type {?} */
        const deps = reflectionCapabilities.parameters(type);
        // TODO - convert to flags.
        return () => new type(...injectArgs(/** @type {?} */ (deps)));
    }
    if (USE_VALUE in provider) {
        /** @type {?} */
        const valueProvider = (/** @type {?} */ (provider));
        return () => valueProvider.useValue;
    }
    else if ((/** @type {?} */ (provider)).useExisting) {
        /** @type {?} */
        const existingProvider = (/** @type {?} */ (provider));
        return () => inject(existingProvider.useExisting);
    }
    else if ((/** @type {?} */ (provider)).useFactory) {
        /** @type {?} */
        const factoryProvider = (/** @type {?} */ (provider));
        return () => factoryProvider.useFactory(...injectArgs(factoryProvider.deps || EMPTY_ARRAY));
    }
    else if ((/** @type {?} */ (provider)).useClass) {
        /** @type {?} */
        const classProvider = (/** @type {?} */ (provider));
        /** @type {?} */
        let deps = (/** @type {?} */ (provider)).deps;
        if (!deps) {
            /** @type {?} */
            const reflectionCapabilities = new ReflectionCapabilities();
            deps = reflectionCapabilities.parameters(type);
        }
        return () => new classProvider.useClass(...injectArgs(deps));
    }
    else {
        /** @type {?} */
        let deps = (/** @type {?} */ (provider)).deps;
        if (!deps) {
            /** @type {?} */
            const reflectionCapabilities = new ReflectionCapabilities();
            deps = reflectionCapabilities.parameters(type);
        }
        return () => new type(...injectArgs(/** @type {?} */ ((deps))));
    }
}
/**
 * Supports \@Injectable() in JIT mode for Render2.
 * @param {?} injectableType
 * @param {?} options
 * @return {?}
 */
function preR3InjectableCompile(injectableType, options) {
    if (options && options.providedIn !== undefined && !getInjectableDef(injectableType)) {
        /** @nocollapse */ injectableType.ngInjectableDef = defineInjectable({
            providedIn: options.providedIn,
            factory: convertInjectableProviderToFactory(injectableType, options),
        });
    }
}
export { ɵ0 };
//# sourceMappingURL=legacy.js.map