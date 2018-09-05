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
import { R3_COMPILE_INJECTABLE } from '../ivy_switch';
import { makeDecorator } from '../util/decorators';
/** @typedef {?} */
var InjectableProvider;
export { InjectableProvider };
/**
 * Type of the Injectable decorator / constructor function.
 * @record
 */
export function InjectableDecorator() { }
/** *
 * Injectable decorator and metadata.
 *
 * \@Annotation
  @type {?} */
export var Injectable = makeDecorator('Injectable', undefined, undefined, undefined, function (type, meta) { return R3_COMPILE_INJECTABLE(type, meta); });
/**
 * Type representing injectable service.
 *
 * \@experimental
 * @record
 * @template T
 */
export function InjectableType() { }
/** @type {?} */
InjectableType.prototype.ngInjectableDef;
//# sourceMappingURL=injectable.js.map