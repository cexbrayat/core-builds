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
import { LiteralExpr, R3ResolvedDependencyType, WrappedNodeExpr } from '@angular/compiler';
import { Injector } from '../../di/injector';
import { Host, Inject, Optional, Self, SkipSelf } from '../../di/metadata';
import { Attribute } from '../../metadata/di';
import { ReflectionCapabilities } from '../../reflection/reflection_capabilities';
/** @type {?} */
let _reflect = null;
/**
 * @return {?}
 */
export function getReflect() {
    return (_reflect = _reflect || new ReflectionCapabilities());
}
/**
 * @param {?} type
 * @return {?}
 */
export function reflectDependencies(type) {
    return convertDependencies(getReflect().parameters(type));
}
/**
 * @param {?} deps
 * @return {?}
 */
export function convertDependencies(deps) {
    return deps.map(dep => reflectDependency(dep));
}
/**
 * @param {?} dep
 * @return {?}
 */
function reflectDependency(dep) {
    /** @type {?} */
    const meta = {
        token: new LiteralExpr(null),
        host: false,
        optional: false,
        resolved: R3ResolvedDependencyType.Token,
        self: false,
        skipSelf: false,
    };
    /**
     * @param {?} token
     * @return {?}
     */
    function setTokenAndResolvedType(token) {
        if (token === Injector) {
            meta.resolved = R3ResolvedDependencyType.Injector;
        }
        else {
            meta.resolved = R3ResolvedDependencyType.Token;
        }
        meta.token = new WrappedNodeExpr(token);
    }
    if (Array.isArray(dep)) {
        if (dep.length === 0) {
            throw new Error('Dependency array must have arguments.');
        }
        for (let j = 0; j < dep.length; j++) {
            /** @type {?} */
            const param = dep[j];
            if (param instanceof Optional || param.__proto__.ngMetadataName === 'Optional') {
                meta.optional = true;
            }
            else if (param instanceof SkipSelf || param.__proto__.ngMetadataName === 'SkipSelf') {
                meta.skipSelf = true;
            }
            else if (param instanceof Self || param.__proto__.ngMetadataName === 'Self') {
                meta.self = true;
            }
            else if (param instanceof Host || param.__proto__.ngMetadataName === 'Host') {
                meta.host = true;
            }
            else if (param instanceof Inject) {
                meta.token = new WrappedNodeExpr(param.token);
            }
            else if (param instanceof Attribute) {
                if (param.attributeName === undefined) {
                    throw new Error(`Attribute name must be defined.`);
                }
                meta.token = new LiteralExpr(param.attributeName);
                meta.resolved = R3ResolvedDependencyType.Attribute;
            }
            else {
                setTokenAndResolvedType(param);
            }
        }
    }
    else {
        setTokenAndResolvedType(dep);
    }
    return meta;
}
//# sourceMappingURL=util.js.map