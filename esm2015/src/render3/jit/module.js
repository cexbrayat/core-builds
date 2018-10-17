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
import { WrappedNodeExpr, compileInjector, compileNgModule as compileR3NgModule, jitExpression } from '@angular/compiler';
import { getComponentDef, getDirectiveDef, getNgModuleDef, getPipeDef } from '../definition';
import { NG_COMPONENT_DEF, NG_DIRECTIVE_DEF, NG_INJECTOR_DEF, NG_MODULE_DEF, NG_PIPE_DEF } from '../fields';
import { angularCoreEnv } from './environment';
import { reflectDependencies } from './util';
/** @type {?} */
const EMPTY_ARRAY = [];
/**
 * Compiles a module in JIT mode.
 *
 * This function automatically gets called when a class has a `\@NgModule` decorator.
 * @param {?} moduleType
 * @param {?} ngModule
 * @return {?}
 */
export function compileNgModule(moduleType, ngModule) {
    compileNgModuleDefs(moduleType, ngModule);
    setScopeOnDeclaredComponents(moduleType, ngModule);
}
/**
 * Compiles and adds the `ngModuleDef` and `ngInjectorDef` properties to the module class.
 * @param {?} moduleType
 * @param {?} ngModule
 * @return {?}
 */
export function compileNgModuleDefs(moduleType, ngModule) {
    /** @type {?} */
    const declarations = flatten(ngModule.declarations || EMPTY_ARRAY);
    /** @type {?} */
    /** @nocollapse */ let ngModuleDef = null;
    Object.defineProperty(moduleType, NG_MODULE_DEF, {
        get: () => {
            if (ngModuleDef === null) {
                /** @type {?} */
                const meta = {
                    type: wrap(moduleType),
                    bootstrap: flatten(ngModule.bootstrap || EMPTY_ARRAY).map(wrapReference),
                    declarations: declarations.map(wrapReference),
                    imports: flatten(ngModule.imports || EMPTY_ARRAY)
                        .map(expandModuleWithProviders)
                        .map(wrapReference),
                    exports: flatten(ngModule.exports || EMPTY_ARRAY)
                        .map(expandModuleWithProviders)
                        .map(wrapReference),
                    emitInline: true,
                };
                /** @type {?} */
                const res = compileR3NgModule(meta);
                ngModuleDef = jitExpression(res.expression, angularCoreEnv, `ng://${moduleType.name}/ngModuleDef.js`, []);
            }
            return ngModuleDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
    /** @type {?} */
    /** @nocollapse */ let ngInjectorDef = null;
    Object.defineProperty(moduleType, NG_INJECTOR_DEF, {
        get: () => {
            if (ngInjectorDef === null) {
                /** @type {?} */
                const meta = {
                    name: moduleType.name,
                    type: wrap(moduleType),
                    deps: reflectDependencies(moduleType),
                    providers: new WrappedNodeExpr(ngModule.providers || EMPTY_ARRAY),
                    imports: new WrappedNodeExpr([
                        ngModule.imports || EMPTY_ARRAY,
                        ngModule.exports || EMPTY_ARRAY,
                    ]),
                };
                /** @type {?} */
                const res = compileInjector(meta);
                ngInjectorDef = jitExpression(res.expression, angularCoreEnv, `ng://${moduleType.name}/ngInjectorDef.js`, res.statements);
            }
            return ngInjectorDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
}
/**
 * Some declared components may be compiled asynchronously, and thus may not have their
 * ngComponentDef set yet. If this is the case, then a reference to the module is written into
 * the `ngSelectorScope` property of the declared type.
 * @param {?} moduleType
 * @param {?} ngModule
 * @return {?}
 */
function setScopeOnDeclaredComponents(moduleType, ngModule) {
    /** @type {?} */
    const declarations = flatten(ngModule.declarations || EMPTY_ARRAY);
    /** @type {?} */
    const transitiveScopes = transitiveScopesFor(moduleType);
    declarations.forEach(declaration => {
        if (declaration.hasOwnProperty(NG_COMPONENT_DEF)) {
            /** @type {?} */
            const component = /** @type {?} */ (declaration);
            /** @type {?} */
            const componentDef = /** @type {?} */ ((getComponentDef(component)));
            patchComponentDefWithScope(componentDef, transitiveScopes);
        }
        else if (!declaration.hasOwnProperty(NG_DIRECTIVE_DEF) && !declaration.hasOwnProperty(NG_PIPE_DEF)) {
            // Set `ngSelectorScope` for future reference when the component compilation finishes.
            (/** @type {?} */ (declaration)).ngSelectorScope = moduleType;
        }
    });
}
/**
 * Patch the definition of a component with directives and pipes from the compilation scope of
 * a given module.
 * @template C
 * @param {?} componentDef
 * @param {?} transitiveScopes
 * @return {?}
 */
export function patchComponentDefWithScope(componentDef, transitiveScopes) {
    componentDef.directiveDefs = () => Array.from(transitiveScopes.compilation.directives)
        .map(dir => getDirectiveDef(dir) || /** @type {?} */ ((getComponentDef(dir))))
        .filter(def => !!def);
    componentDef.pipeDefs = () => Array.from(transitiveScopes.compilation.pipes).map(pipe => /** @type {?} */ ((getPipeDef(pipe))));
}
/**
 * Compute the pair of transitive scopes (compilation scope and exported scope) for a given module.
 *
 * This operation is memoized and the result is cached on the module's definition. It can be called
 * on modules with components that have not fully compiled yet, but the result should not be used
 * until they have.
 * @template T
 * @param {?} moduleType
 * @return {?}
 */
export function transitiveScopesFor(moduleType) {
    if (!isNgModule(moduleType)) {
        throw new Error(`${moduleType.name} does not have an ngModuleDef`);
    }
    /** @type {?} */
    const def = /** @type {?} */ ((getNgModuleDef(moduleType)));
    if (def.transitiveCompileScopes !== null) {
        return def.transitiveCompileScopes;
    }
    /** @type {?} */
    const scopes = {
        compilation: {
            directives: new Set(),
            pipes: new Set(),
        },
        exported: {
            directives: new Set(),
            pipes: new Set(),
        },
    };
    def.declarations.forEach(declared => {
        /** @type {?} */
        const declaredWithDefs = /** @type {?} */ (declared);
        if (getPipeDef(declaredWithDefs)) {
            scopes.compilation.pipes.add(declared);
        }
        else {
            // Either declared has an ngComponentDef or ngDirectiveDef, or it's a component which hasn't
            // had its template compiled yet. In either case, it gets added to the compilation's
            // directives.
            scopes.compilation.directives.add(declared);
        }
    });
    def.imports.forEach((imported) => {
        /** @type {?} */
        const importedTyped = /** @type {?} */ (imported);
        if (!isNgModule(importedTyped)) {
            throw new Error(`Importing ${importedTyped.name} which does not have an ngModuleDef`);
        }
        /** @type {?} */
        const importedScope = transitiveScopesFor(importedTyped);
        importedScope.exported.directives.forEach(entry => scopes.compilation.directives.add(entry));
        importedScope.exported.pipes.forEach(entry => scopes.compilation.pipes.add(entry));
    });
    def.exports.forEach((exported) => {
        /** @type {?} */
        const exportedTyped = /** @type {?} */ (exported);
        // Either the type is a module, a pipe, or a component/directive (which may not have an
        // ngComponentDef as it might be compiled asynchronously).
        if (isNgModule(exportedTyped)) {
            /** @type {?} */
            const exportedScope = transitiveScopesFor(exportedTyped);
            exportedScope.exported.directives.forEach(entry => {
                scopes.compilation.directives.add(entry);
                scopes.exported.directives.add(entry);
            });
            exportedScope.exported.pipes.forEach(entry => {
                scopes.compilation.pipes.add(entry);
                scopes.exported.pipes.add(entry);
            });
        }
        else if (getNgModuleDef(exportedTyped)) {
            scopes.exported.pipes.add(exportedTyped);
        }
        else {
            scopes.exported.directives.add(exportedTyped);
        }
    });
    def.transitiveCompileScopes = scopes;
    return scopes;
}
/**
 * @template T
 * @param {?} values
 * @return {?}
 */
function flatten(values) {
    /** @type {?} */
    const out = [];
    values.forEach(value => {
        if (Array.isArray(value)) {
            out.push(...flatten(value));
        }
        else {
            out.push(value);
        }
    });
    return out;
}
/**
 * @param {?} value
 * @return {?}
 */
function expandModuleWithProviders(value) {
    if (isModuleWithProviders(value)) {
        return value.ngModule;
    }
    return value;
}
/**
 * @param {?} value
 * @return {?}
 */
function wrap(value) {
    return new WrappedNodeExpr(value);
}
/**
 * @param {?} value
 * @return {?}
 */
function wrapReference(value) {
    /** @type {?} */
    const wrapped = wrap(value);
    return { value: wrapped, type: wrapped };
}
/**
 * @param {?} value
 * @return {?}
 */
function isModuleWithProviders(value) {
    return (/** @type {?} */ (value)).ngModule !== undefined;
}
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
function isNgModule(value) {
    return !!getNgModuleDef(value);
}
//# sourceMappingURL=module.js.map