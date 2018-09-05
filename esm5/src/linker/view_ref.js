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
import { ChangeDetectorRef } from '../change_detection/change_detector_ref';
/**
 * @abstract
 */
var /**
 * @abstract
 */
ViewRef = /** @class */ (function (_super) {
    tslib_1.__extends(ViewRef, _super);
    function ViewRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ViewRef;
}(ChangeDetectorRef));
/**
 * @abstract
 */
export { ViewRef };
if (false) {
    /**
     * Destroys the view and all of the data structures associated with it.
     * @abstract
     * @return {?}
     */
    ViewRef.prototype.destroy = function () { };
    /**
     * @abstract
     * @return {?}
     */
    ViewRef.prototype.destroyed = function () { };
    /**
     * @abstract
     * @param {?} callback
     * @return {?}
     */
    ViewRef.prototype.onDestroy = function (callback) { };
}
/**
 * Represents an Angular View.
 *
 * <!-- TODO: move the next two paragraphs to the dev guide -->
 * A View is a fundamental building block of the application UI. It is the smallest grouping of
 * Elements which are created and destroyed together.
 *
 * Properties of elements in a View can change, but the structure (number and order) of elements in
 * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
 * removing nested Views via a `ViewContainerRef`. Each View can contain many View Containers.
 * <!-- /TODO -->
 *
 * \@usageNotes
 * ### Example
 *
 * Given this template...
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="let  item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * We have two `TemplateRef`s:
 *
 * Outer `TemplateRef`:
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <ng-template ngFor let-item [ngForOf]="items"></ng-template>
 * </ul>
 * ```
 *
 * Inner `TemplateRef`:
 *
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * Notice that the original template is broken down into two separate `TemplateRef`s.
 *
 * The outer/inner `TemplateRef`s are then assembled into views like so:
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <ng-template view-container-ref></ng-template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 * \@experimental
 * @abstract
 * @template C
 */
var /**
 * Represents an Angular View.
 *
 * <!-- TODO: move the next two paragraphs to the dev guide -->
 * A View is a fundamental building block of the application UI. It is the smallest grouping of
 * Elements which are created and destroyed together.
 *
 * Properties of elements in a View can change, but the structure (number and order) of elements in
 * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
 * removing nested Views via a `ViewContainerRef`. Each View can contain many View Containers.
 * <!-- /TODO -->
 *
 * \@usageNotes
 * ### Example
 *
 * Given this template...
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="let  item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * We have two `TemplateRef`s:
 *
 * Outer `TemplateRef`:
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <ng-template ngFor let-item [ngForOf]="items"></ng-template>
 * </ul>
 * ```
 *
 * Inner `TemplateRef`:
 *
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * Notice that the original template is broken down into two separate `TemplateRef`s.
 *
 * The outer/inner `TemplateRef`s are then assembled into views like so:
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <ng-template view-container-ref></ng-template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 * \@experimental
 * @abstract
 * @template C
 */
EmbeddedViewRef = /** @class */ (function (_super) {
    tslib_1.__extends(EmbeddedViewRef, _super);
    function EmbeddedViewRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EmbeddedViewRef;
}(ViewRef));
/**
 * Represents an Angular View.
 *
 * <!-- TODO: move the next two paragraphs to the dev guide -->
 * A View is a fundamental building block of the application UI. It is the smallest grouping of
 * Elements which are created and destroyed together.
 *
 * Properties of elements in a View can change, but the structure (number and order) of elements in
 * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
 * removing nested Views via a `ViewContainerRef`. Each View can contain many View Containers.
 * <!-- /TODO -->
 *
 * \@usageNotes
 * ### Example
 *
 * Given this template...
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="let  item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * We have two `TemplateRef`s:
 *
 * Outer `TemplateRef`:
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <ng-template ngFor let-item [ngForOf]="items"></ng-template>
 * </ul>
 * ```
 *
 * Inner `TemplateRef`:
 *
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * Notice that the original template is broken down into two separate `TemplateRef`s.
 *
 * The outer/inner `TemplateRef`s are then assembled into views like so:
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <ng-template view-container-ref></ng-template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 * \@experimental
 * @abstract
 * @template C
 */
export { EmbeddedViewRef };
if (false) {
    /**
     * @abstract
     * @return {?}
     */
    EmbeddedViewRef.prototype.context = function () { };
    /**
     * @abstract
     * @return {?}
     */
    EmbeddedViewRef.prototype.rootNodes = function () { };
}
/**
 * @record
 */
export function InternalViewRef() { }
/** @type {?} */
InternalViewRef.prototype.detachFromAppRef;
/** @type {?} */
InternalViewRef.prototype.attachToAppRef;
//# sourceMappingURL=view_ref.js.map