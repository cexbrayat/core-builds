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
import './ng_dev_mode';
import { ChangeDetectionStrategy } from '../change_detection/constants';
import { ViewEncapsulation } from '../metadata/view';
/** @type {?} */
const EMPTY = {};
/** @type {?} */
const EMPTY_ARRAY = [];
if (typeof ngDevMode !== 'undefined' && ngDevMode) {
    Object.freeze(EMPTY);
    Object.freeze(EMPTY_ARRAY);
}
/** @type {?} */
let _renderCompCount = 0;
/**
 * Create a component definition object.
 *
 *
 * # Example
 * ```
 * class MyDirective {
 *   // Generated by Angular Template Compiler
 *   // [Symbol] syntax will not be supported by TypeScript until v2.7
 *   static ngComponentDef = defineComponent({
 *     ...
 *   });
 * }
 * ```
 * @template T
 * @param {?} componentDefinition
 * @return {?}
 */
export function defineComponent(componentDefinition) {
    /** @type {?} */
    const type = componentDefinition.type;
    /** @type {?} */
    const pipeTypes = /** @type {?} */ ((componentDefinition.pipes));
    /** @type {?} */
    const directiveTypes = /** @type {?} */ ((componentDefinition.directives));
    /** @type {?} */
    const declaredInputs = /** @type {?} */ ({});
    /** @type {?} */
    const encapsulation = componentDefinition.encapsulation || ViewEncapsulation.Emulated;
    /** @type {?} */
    const styles = componentDefinition.styles || EMPTY_ARRAY;
    /** @type {?} */
    const def = {
        type: type,
        diPublic: null,
        consts: componentDefinition.consts,
        vars: componentDefinition.vars,
        hostVars: componentDefinition.hostVars || 0,
        factory: componentDefinition.factory,
        template: componentDefinition.template || /** @type {?} */ ((null)),
        hostBindings: componentDefinition.hostBindings || null,
        contentQueries: componentDefinition.contentQueries || null,
        contentQueriesRefresh: componentDefinition.contentQueriesRefresh || null,
        attributes: componentDefinition.attributes || null,
        inputs: invertObject(componentDefinition.inputs, declaredInputs),
        declaredInputs: declaredInputs,
        outputs: invertObject(componentDefinition.outputs),
        exportAs: componentDefinition.exportAs || null,
        onInit: type.prototype.ngOnInit || null,
        doCheck: type.prototype.ngDoCheck || null,
        afterContentInit: type.prototype.ngAfterContentInit || null,
        afterContentChecked: type.prototype.ngAfterContentChecked || null,
        afterViewInit: type.prototype.ngAfterViewInit || null,
        afterViewChecked: type.prototype.ngAfterViewChecked || null,
        onDestroy: type.prototype.ngOnDestroy || null,
        onPush: componentDefinition.changeDetection === ChangeDetectionStrategy.OnPush,
        directiveDefs: directiveTypes ?
            () => (typeof directiveTypes === 'function' ? directiveTypes() : directiveTypes)
                .map(extractDirectiveDef) :
            null,
        pipeDefs: pipeTypes ?
            () => (typeof pipeTypes === 'function' ? pipeTypes() : pipeTypes).map(extractPipeDef) :
            null,
        selectors: componentDefinition.selectors,
        viewQuery: componentDefinition.viewQuery || null,
        features: componentDefinition.features || null,
        data: componentDefinition.data || EMPTY,
        // TODO(misko): convert ViewEncapsulation into const enum so that it can be used directly in the
        // next line. Also `None` should be 0 not 2.
        encapsulation,
        providers: EMPTY_ARRAY,
        viewProviders: EMPTY_ARRAY,
        id: `c${_renderCompCount++}`, styles,
    };
    /** @type {?} */
    const feature = componentDefinition.features;
    feature && feature.forEach((fn) => fn(def));
    return /** @type {?} */ (def);
}
/**
 * @param {?} type
 * @return {?}
 */
export function extractDirectiveDef(type) {
    /** @type {?} */
    const def = type.ngComponentDef || type.ngDirectiveDef;
    if (ngDevMode && !def) {
        throw new Error(`'${type.name}' is neither 'ComponentType' or 'DirectiveType'.`);
    }
    return def;
}
/**
 * @param {?} type
 * @return {?}
 */
export function extractPipeDef(type) {
    /** @type {?} */
    const def = type.ngPipeDef;
    if (ngDevMode && !def) {
        throw new Error(`'${type.name}' is not a 'PipeType'.`);
    }
    return def;
}
/**
 * @template T
 * @param {?} def
 * @return {?}
 */
export function defineNgModule(def) {
    /** @type {?} */
    const res = {
        type: def.type,
        bootstrap: def.bootstrap || EMPTY_ARRAY,
        declarations: def.declarations || EMPTY_ARRAY,
        imports: def.imports || EMPTY_ARRAY,
        exports: def.exports || EMPTY_ARRAY,
        transitiveCompileScopes: null,
    };
    return /** @type {?} */ (res);
}
/**
 * Inverts an inputs or outputs lookup such that the keys, which were the
 * minified keys, are part of the values, and the values are parsed so that
 * the publicName of the property is the new key
 *
 * e.g. for
 *
 * ```
 * class Comp {
 * \@Input()
 *   propName1: string;
 *
 * \@Input('publicName')
 *   propName2: number;
 * }
 * ```
 *
 * will be serialized as
 *
 * ```
 * {
 *   a0: 'propName1',
 *   b1: ['publicName', 'propName2'],
 * }
 * ```
 *
 * becomes
 *
 * ```
 * {
 *  'propName1': 'a0',
 *  'publicName': 'b1'
 * }
 * ```
 *
 * Optionally the function can take `secondary` which will result in:
 *
 * ```
 * {
 *  'propName1': 'a0',
 *  'propName2': 'b1'
 * }
 * ```
 *
 * @param {?} obj
 * @param {?=} secondary
 * @return {?}
 */
function invertObject(obj, secondary) {
    if (obj == null)
        return EMPTY;
    /** @type {?} */
    const newLookup = {};
    for (const minifiedKey in obj) {
        if (obj.hasOwnProperty(minifiedKey)) {
            /** @type {?} */
            let publicName = obj[minifiedKey];
            /** @type {?} */
            let declaredName = publicName;
            if (Array.isArray(publicName)) {
                declaredName = publicName[1];
                publicName = publicName[0];
            }
            newLookup[publicName] = minifiedKey;
            if (secondary) {
                (secondary[declaredName] = minifiedKey);
            }
        }
    }
    return newLookup;
}
/**
 * Create a base definition
 *
 * # Example
 * ```
 * class ShouldBeInherited {
 *   static ngBaseDef = defineBase({
 *      ...
 *   })
 * }
 * @template T
 * @param {?} baseDefinition The base definition parameters
 * @return {?}
 */
export function defineBase(baseDefinition) {
    /** @type {?} */
    const declaredInputs = /** @type {?} */ ({});
    return {
        inputs: invertObject(baseDefinition.inputs, declaredInputs),
        declaredInputs: declaredInputs,
        outputs: invertObject(baseDefinition.outputs),
    };
}
/** *
 * Create a directive definition object.
 *
 * # Example
 * ```
 * class MyDirective {
 *   // Generated by Angular Template Compiler
 *   // [Symbol] syntax will not be supported by TypeScript until v2.7
 *   static ngDirectiveDef = defineDirective({
 *     ...
 *   });
 * }
 * ```
  @type {?} */
export const defineDirective = /** @type {?} */ ((defineComponent));
/**
 * Create a pipe definition object.
 *
 * # Example
 * ```
 * class MyPipe implements PipeTransform {
 *   // Generated by Angular Template Compiler
 *   static ngPipeDef = definePipe({
 *     ...
 *   });
 * }
 * ```
 * @template T
 * @param {?} pipeDef Pipe definition generated by the compiler
 * @return {?}
 */
export function definePipe(pipeDef) {
    return /** @type {?} */ ((/** @type {?} */ ({
        name: pipeDef.name,
        factory: pipeDef.factory,
        pure: pipeDef.pure !== false,
        onDestroy: pipeDef.type.prototype.ngOnDestroy || null
    })));
}
//# sourceMappingURL=definition.js.map