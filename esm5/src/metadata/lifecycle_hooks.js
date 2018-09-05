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
/**
 * Defines an object that associates properties with
 * instances of `SimpleChange`.
 *
 * @see `OnChanges`
 *
 * @record
 */
export function SimpleChanges() { }
/**
 * \@description
 * A lifecycle hook that is called when any data-bound property of a directive changes.
 * Define an `ngOnChanges()` method to handle the changes.
 *
 * @see `DoCheck`
 * @see `OnInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * \@usageNotes
 * The following snippet shows how a component can implement this interface to
 * define an on-changes handler for an input property.
 *
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnChanges'}
 *
 * @record
 */
export function OnChanges() { }
/**
 * A callback method that is invoked immediately after the
 * default change detector has checked data-bound properties
 * if at least one has changed, and before the view and content
 * children are checked.
 * \@param changes The changed properties.
 * @type {?}
 */
OnChanges.prototype.ngOnChanges;
/**
 * \@description
 * A lifecycle hook that is called after Angular has initialized
 * all data-bound properties of a directive.
 * Define an `ngOnInit()` method to handle any additional initialization tasks.
 *
 * @see `AfterContentInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * \@usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own initialization method.
 *
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnInit'}
 *
 *
 * @record
 */
export function OnInit() { }
/**
 * A callback method that is invoked immediately after the
 * default change detector has checked the directive's
 * data-bound properties for the first time,
 * and before any of the view or content children have been checked.
 * It is invoked only once when the directive is instantiated.
 * @type {?}
 */
OnInit.prototype.ngOnInit;
/**
 * A lifecycle hook that invokes a custom change-detection function for a directive,
 * in addition to the check performed by the default change-detector.
 *
 * The default change-detection algorithm looks for differences by comparing
 * bound-property values by reference across change detection runs. You can use this
 * hook to check for and respond to changes by some other means.
 *
 * When the default change detector detects changes, it invokes `ngOnChanges()` if supplied,
 * regardless of whether you perform additional change detection.
 * Typically, you should not use both `DoCheck` and `OnChanges` to respond to
 * changes on the same input.
 *
 * @see `OnChanges`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * \@usageNotes
 * The following snippet shows how a component can implement this interface
 * to invoke it own change-detection cycle.
 *
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='DoCheck'}
 *
 * @record
 */
export function DoCheck() { }
/**
 * A callback method that performs change-detection, invoked
 * after the default change-detector runs.
 * See `KeyValueDiffers` and `IterableDiffers` for implementing
 * custom change checking for collections.
 *
 * @type {?}
 */
DoCheck.prototype.ngDoCheck;
/**
 * A lifecycle hook that is called when a directive, pipe, or service is destroyed.
 * Use for any custom cleanup that needs to occur when the
 * instance is destroyed.
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * \@usageNotes
 * The following snippet shows how a component can implement this interface
 * to define its own custom clean-up method.
 *
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnDestroy'}
 *
 * @record
 */
export function OnDestroy() { }
/**
 * A callback method that performs custom clean-up, invoked immediately
 * after a directive, pipe, or service instance is destroyed.
 * @type {?}
 */
OnDestroy.prototype.ngOnDestroy;
/**
 * \@description
 * A lifecycle hook that is called after Angular has fully initialized
 * all content of a directive.
 * Define an `ngAfterContentInit()` method to handle any additional initialization tasks.
 *
 * @see `OnInit`
 * @see `AfterViewInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * \@usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own content initialization method.
 *
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentInit'}
 *
 *
 * @record
 */
export function AfterContentInit() { }
/**
 * A callback method that is invoked immediately after
 * Angular has completed initialization of all of the directive's
 * content.
 * It is invoked only once when the directive is instantiated.
 * @type {?}
 */
AfterContentInit.prototype.ngAfterContentInit;
/**
 * \@description
 * A lifecycle hook that is called after the default change detector has
 * completed checking all content of a directive.
 *
 * @see `AfterViewChecked`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * \@usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own after-check functionality.
 *
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentChecked'}
 *
 *
 * @record
 */
export function AfterContentChecked() { }
/**
 * A callback method that is invoked immediately after the
 * default change detector has completed checking all of the directive's
 * content.
 * @type {?}
 */
AfterContentChecked.prototype.ngAfterContentChecked;
/**
 * \@description
 * A lifecycle hook that is called after Angular has fully initialized
 * a component's view.
 * Define an `ngAfterViewInit()` method to handle any additional initialization tasks.
 *
 * @see `OnInit`
 * @see `AfterContentInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * \@usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own view initialization method.
 *
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewInit'}
 *
 *
 * @record
 */
export function AfterViewInit() { }
/**
 * A callback method that is invoked immediately after
 * Angular has completed initialization of a component's view.
 * It is invoked only once when the view is instantiated.
 *
 * @type {?}
 */
AfterViewInit.prototype.ngAfterViewInit;
/**
 * \@description
 * A lifecycle hook that is called after the default change detector has
 * completed checking a component's view for changes.
 *
 * @see `AfterContentChecked`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * \@usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own after-check functionality.
 *
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewChecked'}
 *
 * @record
 */
export function AfterViewChecked() { }
/**
 * A callback method that is invoked immediately after the
 * default change detector has completed one change-check cycle
 * for a component's view.
 * @type {?}
 */
AfterViewChecked.prototype.ngAfterViewChecked;
//# sourceMappingURL=lifecycle_hooks.js.map