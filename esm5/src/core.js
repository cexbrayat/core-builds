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
 * @module
 * @description
 * Entry point from which you should import all public core APIs.
 */
export { ANALYZE_FOR_ENTRY_COMPONENTS, Attribute, ContentChild, ContentChildren, Query, ViewChild, ViewChildren, Component, Directive, HostBinding, HostListener, Input, Output, Pipe, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule, ViewEncapsulation } from './metadata';
export { Version, VERSION } from './version';
export { defineInjectable, defineInjector, forwardRef, resolveForwardRef, Injectable, inject, INJECTOR, Injector, ReflectiveInjector, createInjector, ResolvedReflectiveFactory, ReflectiveKey, InjectionToken, Inject, Optional, Self, SkipSelf, Host } from './di';
export { createPlatform, assertPlatform, destroyPlatform, getPlatform, PlatformRef, ApplicationRef, createPlatformFactory, NgProbeToken } from './application_ref';
export { enableProdMode, isDevMode } from './is_dev_mode';
export { APP_ID, PACKAGE_ROOT_URL, PLATFORM_INITIALIZER, PLATFORM_ID, APP_BOOTSTRAP_LISTENER } from './application_tokens';
export { APP_INITIALIZER, ApplicationInitStatus } from './application_init';
export { NgZone, ɵNoopNgZone } from './zone';
export { RenderComponentType, Renderer, Renderer2, RendererFactory2, RendererStyleFlags2, RootRenderer } from './render';
export { COMPILER_OPTIONS, Compiler, CompilerFactory, ModuleWithComponentFactories, ComponentFactory, ComponentRef, ComponentFactoryResolver, ElementRef, NgModuleFactory, NgModuleRef, NgModuleFactoryLoader, getModuleFactory, QueryList, SystemJsNgModuleLoader, SystemJsNgModuleLoaderConfig, TemplateRef, ViewContainerRef, EmbeddedViewRef, ViewRef } from './linker';
export { DebugElement, DebugNode, asNativeElements, getDebugNode } from './debug/debug_node';
export { Testability, TestabilityRegistry, setTestabilityGetter } from './testability/testability';
export { ChangeDetectionStrategy, ChangeDetectorRef, DefaultIterableDiffer, IterableDiffers, KeyValueDiffers, SimpleChange, WrappedValue } from './change_detection';
export { platformCore } from './platform_core_providers';
export { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, MissingTranslationStrategy } from './i18n/tokens';
export { ApplicationModule } from './application_module';
export { wtfCreateScope, wtfLeave, wtfStartTimeRange, wtfEndTimeRange } from './profile/profile';
export { Type } from './type';
export { EventEmitter } from './event_emitter';
export { ErrorHandler } from './error_handler';
export { ɵALLOW_MULTIPLE_PLATFORMS, ɵAPP_ID_RANDOM_PROVIDER, ɵdefaultIterableDiffers, ɵdefaultKeyValueDiffers, ɵdevModeEqual, ɵisListLikeIterable, ɵChangeDetectorStatus, ɵisDefaultChangeDetectionStrategy, ɵConsole, ɵgetInjectableDef, ɵinject, ɵsetCurrentInjector, ɵAPP_ROOT, ɵivyEnabled, ɵComponentFactory, ɵCodegenComponentFactoryResolver, ɵresolveComponentResources, ɵReflectionCapabilities, ɵRenderDebugInfo, ɵ_sanitizeHtml, ɵ_sanitizeStyle, ɵ_sanitizeUrl, ɵglobal, ɵlooseIdentical, ɵstringify, ɵmakeDecorator, ɵisObservable, ɵisPromise, ɵclearOverrides, ɵinitServicesIfNeeded, ɵoverrideComponentView, ɵoverrideProvider, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from './core_private_export';
export { ɵdefineBase, ɵdefineComponent, ɵdefineDirective, ɵdefinePipe, ɵdefineNgModule, ɵdetectChanges, ɵrenderComponent, ɵRender3ComponentFactory, ɵRender3ComponentRef, ɵdirectiveInject, ɵinjectAttribute, ɵgetFactoryOf, ɵgetInheritedFactory, ɵtemplateRefExtractor, ɵPublicFeature, ɵInheritDefinitionFeature, ɵNgOnChangesFeature, ɵRender3NgModuleRef, ɵmarkDirty, ɵNgModuleFactory, ɵNO_CHANGE, ɵcontainer, ɵnextContext, ɵelementStart, ɵnamespaceHTML, ɵnamespaceMathML, ɵnamespaceSVG, ɵelement, ɵlistener, ɵtext, ɵembeddedViewStart, ɵquery, ɵregisterContentQuery, ɵprojection, ɵbind, ɵinterpolation1, ɵinterpolation2, ɵinterpolation3, ɵinterpolation4, ɵinterpolation5, ɵinterpolation6, ɵinterpolation7, ɵinterpolation8, ɵinterpolationV, ɵpipeBind1, ɵpipeBind2, ɵpipeBind3, ɵpipeBind4, ɵpipeBindV, ɵpureFunction0, ɵpureFunction1, ɵpureFunction2, ɵpureFunction3, ɵpureFunction4, ɵpureFunction5, ɵpureFunction6, ɵpureFunction7, ɵpureFunction8, ɵpureFunctionV, ɵgetCurrentView, ɵrestoreView, ɵcontainerRefreshStart, ɵcontainerRefreshEnd, ɵqueryRefresh, ɵloadQueryList, ɵelementEnd, ɵelementProperty, ɵprojectionDef, ɵreference, ɵenableBindings, ɵdisableBindings, ɵelementAttribute, ɵelementStyling, ɵelementStylingMap, ɵelementStyleProp, ɵelementStylingApply, ɵelementClassProp, ɵtextBinding, ɵtemplate, ɵembeddedViewEnd, ɵstore, ɵload, ɵpipe, ɵwhenRendered, ɵi18nAttribute, ɵi18nExp, ɵi18nStart, ɵi18nEnd, ɵi18nApply, ɵi18nExpMapping, ɵi18nInterpolation1, ɵi18nInterpolation2, ɵi18nInterpolation3, ɵi18nInterpolation4, ɵi18nInterpolation5, ɵi18nInterpolation6, ɵi18nInterpolation7, ɵi18nInterpolation8, ɵi18nInterpolationV, ɵi18nMapping, ɵWRAP_RENDERER_FACTORY2, ɵRender3DebugRendererFactory2, ɵcompileNgModuleDefs, ɵpatchComponentDefWithScope, ɵcompileComponent, ɵcompileDirective, ɵcompilePipe, ɵsanitizeHtml, ɵsanitizeStyle, ɵsanitizeUrl, ɵsanitizeResourceUrl, ɵbypassSanitizationTrustHtml, ɵbypassSanitizationTrustStyle, ɵbypassSanitizationTrustScript, ɵbypassSanitizationTrustUrl, ɵbypassSanitizationTrustResourceUrl, ɵgetContext, ɵaddPlayer, ɵgetPlayers, ɵcompileNgModuleFactory__POST_NGCC__, ɵR3_COMPILE_COMPONENT__POST_NGCC__, ɵR3_COMPILE_DIRECTIVE__POST_NGCC__, ɵR3_COMPILE_INJECTABLE__POST_NGCC__, ɵR3_COMPILE_NGMODULE__POST_NGCC__, ɵR3_COMPILE_PIPE__POST_NGCC__, ɵivyEnable__POST_NGCC__, ɵR3_ELEMENT_REF_FACTORY__POST_NGCC__, ɵR3_TEMPLATE_REF_FACTORY__POST_NGCC__, ɵR3_CHANGE_DETECTOR_REF_FACTORY__POST_NGCC__, ɵR3_VIEW_CONTAINER_REF_FACTORY__POST_NGCC__, ɵR3_RENDERER2_FACTORY__POST_NGCC__ } from './core_render3_private_export';
export { Sanitizer, SecurityContext } from './sanitization/security';
export { ɵregisterModuleFactory, ɵEMPTY_ARRAY, ɵEMPTY_MAP, ɵand, ɵccf, ɵcmf, ɵcrt, ɵdid, ɵeld, ɵelementEventFullName, ɵgetComponentViewDefinitionFactory, ɵinlineInterpolate, ɵinterpolate, ɵmod, ɵmpd, ɵncd, ɵnov, ɵpid, ɵprd, ɵpad, ɵpod, ɵppd, ɵqud, ɵted, ɵunv, ɵvid } from './codegen_private_exports';
//# sourceMappingURL=core.js.map