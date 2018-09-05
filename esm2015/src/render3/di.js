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
import { ChangeDetectorRef as viewEngine_ChangeDetectorRef } from '../change_detection/change_detector_ref';
import { NullInjector, inject, setCurrentInjector } from '../di/injector';
import { ElementRef as viewEngine_ElementRef } from '../linker/element_ref';
import { NgModuleRef as viewEngine_NgModuleRef } from '../linker/ng_module_factory';
import { TemplateRef as viewEngine_TemplateRef } from '../linker/template_ref';
import { ViewContainerRef as viewEngine_ViewContainerRef } from '../linker/view_container_ref';
import { Renderer2 } from '../render';
import { assertDefined, assertGreaterThan, assertLessThan } from './assert';
import { ComponentFactoryResolver } from './component_ref';
import { addToViewTree, assertPreviousIsParent, createEmbeddedViewNode, createLContainer, createLNodeObject, createTNode, getPreviousOrParentNode, getRenderer, isComponent, renderEmbeddedTemplate, resolveDirective } from './instructions';
import { VIEWS } from './interfaces/container';
import { isProceduralRenderer } from './interfaces/renderer';
import { DIRECTIVES, HOST_NODE, INJECTOR, QUERIES, RENDERER, TVIEW } from './interfaces/view';
import { assertNodeOfPossibleTypes, assertNodeType } from './node_assert';
import { addRemoveViewFromContainer, appendChild, detachView, getChildLNode, getParentLNode, insertView, removeView } from './node_manipulation';
import { ViewRef } from './view_ref';
/** *
 * If a directive is diPublic, bloomAdd sets a property on the type with this constant as
 * the key and the directive's unique ID as the value. This allows us to map directives to their
 * bloom filter bit for DI.
  @type {?} */
const NG_ELEMENT_ID = '__NG_ELEMENT_ID__';
/** *
 * The number of slots in each bloom filter (used by DI). The larger this number, the fewer
 * directives that will share slots, and thus, the fewer false positives when checking for
 * the existence of a directive.
  @type {?} */
const BLOOM_SIZE = 256;
/** @type {?} */
const BLOOM_MASK = BLOOM_SIZE - 1;
/** *
 * Counter used to generate unique IDs for directives.
  @type {?} */
let nextNgElementId = 0;
/**
 * Registers this directive as present in its node's injector by flipping the directive's
 * corresponding bit in the injector's bloom filter.
 *
 * @param {?} injector The node injector in which the directive should be registered
 * @param {?} type The directive to register
 * @return {?}
 */
export function bloomAdd(injector, type) {
    /** @type {?} */
    let id = (/** @type {?} */ (type))[NG_ELEMENT_ID];
    // Set a unique ID on the directive type, so if something tries to inject the directive,
    // we can easily retrieve the ID and hash it into the bloom bit that should be checked.
    if (id == null) {
        id = (/** @type {?} */ (type))[NG_ELEMENT_ID] = nextNgElementId++;
    }
    /** @type {?} */
    const bloomBit = id & BLOOM_MASK;
    /** @type {?} */
    const mask = 1 << bloomBit;
    /** @type {?} */
    const b7 = bloomBit & 0x80;
    /** @type {?} */
    const b6 = bloomBit & 0x40;
    /** @type {?} */
    const b5 = bloomBit & 0x20;
    if (b7) {
        b6 ? (b5 ? (injector.bf7 |= mask) : (injector.bf6 |= mask)) :
            (b5 ? (injector.bf5 |= mask) : (injector.bf4 |= mask));
    }
    else {
        b6 ? (b5 ? (injector.bf3 |= mask) : (injector.bf2 |= mask)) :
            (b5 ? (injector.bf1 |= mask) : (injector.bf0 |= mask));
    }
}
/**
 * @return {?}
 */
export function getOrCreateNodeInjector() {
    ngDevMode && assertPreviousIsParent();
    return getOrCreateNodeInjectorForNode(/** @type {?} */ (getPreviousOrParentNode()));
}
/**
 * Creates (or gets an existing) injector for a given element or container.
 *
 * @param {?} node for which an injector should be retrieved / created.
 * @return {?} Node injector
 */
export function getOrCreateNodeInjectorForNode(node) {
    /** @type {?} */
    const nodeInjector = node.nodeInjector;
    /** @type {?} */
    const parent = getParentLNode(node);
    /** @type {?} */
    const parentInjector = parent && parent.nodeInjector;
    if (nodeInjector != parentInjector) {
        return /** @type {?} */ ((nodeInjector));
    }
    return node.nodeInjector = {
        parent: parentInjector,
        node: node,
        bf0: 0,
        bf1: 0,
        bf2: 0,
        bf3: 0,
        bf4: 0,
        bf5: 0,
        bf6: 0,
        bf7: 0,
        cbf0: parentInjector == null ? 0 : parentInjector.cbf0 | parentInjector.bf0,
        cbf1: parentInjector == null ? 0 : parentInjector.cbf1 | parentInjector.bf1,
        cbf2: parentInjector == null ? 0 : parentInjector.cbf2 | parentInjector.bf2,
        cbf3: parentInjector == null ? 0 : parentInjector.cbf3 | parentInjector.bf3,
        cbf4: parentInjector == null ? 0 : parentInjector.cbf4 | parentInjector.bf4,
        cbf5: parentInjector == null ? 0 : parentInjector.cbf5 | parentInjector.bf5,
        cbf6: parentInjector == null ? 0 : parentInjector.cbf6 | parentInjector.bf6,
        cbf7: parentInjector == null ? 0 : parentInjector.cbf7 | parentInjector.bf7,
        templateRef: null,
        viewContainerRef: null,
        elementRef: null,
        changeDetectorRef: null,
    };
}
/**
 * Makes a directive public to the DI system by adding it to an injector's bloom filter.
 *
 * @param {?} di The node injector in which a directive will be added
 * @param {?} def The definition of the directive to be made public
 * @return {?}
 */
export function diPublicInInjector(di, def) {
    bloomAdd(di, def.type);
}
/**
 * Makes a directive public to the DI system by adding it to an injector's bloom filter.
 *
 * @param {?} def The definition of the directive to be made public
 * @return {?}
 */
export function diPublic(def) {
    diPublicInInjector(getOrCreateNodeInjector(), def);
}
/**
 * @template T
 * @param {?} token
 * @param {?=} flags
 * @return {?}
 */
export function directiveInject(token, flags = 0 /* Default */) {
    return getOrCreateInjectable(getOrCreateNodeInjector(), token, flags);
}
/**
 * Creates an ElementRef and stores it on the injector.
 * Or, if the ElementRef already exists, retrieves the existing ElementRef.
 *
 * @return {?} The ElementRef instance to use
 */
export function injectElementRef() {
    return getOrCreateElementRef(getOrCreateNodeInjector());
}
/**
 * Creates a TemplateRef and stores it on the injector. Or, if the TemplateRef already
 * exists, retrieves the existing TemplateRef.
 *
 * @template T
 * @return {?} The TemplateRef instance to use
 */
export function injectTemplateRef() {
    return getOrCreateTemplateRef(getOrCreateNodeInjector());
}
/**
 * Creates a ViewContainerRef and stores it on the injector. Or, if the ViewContainerRef
 * already exists, retrieves the existing ViewContainerRef.
 *
 * @return {?} The ViewContainerRef instance to use
 */
export function injectViewContainerRef() {
    return getOrCreateContainerRef(getOrCreateNodeInjector());
}
/**
 * Returns a ChangeDetectorRef (a.k.a. a ViewRef)
 * @return {?}
 */
export function injectChangeDetectorRef() {
    return getOrCreateChangeDetectorRef(getOrCreateNodeInjector(), null);
}
/**
 * Creates a ComponentFactoryResolver and stores it on the injector. Or, if the
 * ComponentFactoryResolver
 * already exists, retrieves the existing ComponentFactoryResolver.
 *
 * @return {?} The ComponentFactoryResolver instance to use
 */
export function injectComponentFactoryResolver() {
    return componentFactoryResolver;
}
/** @type {?} */
const componentFactoryResolver = new ComponentFactoryResolver();
/**
 * @return {?}
 */
export function injectRenderer2() {
    return getOrCreateRenderer2(getOrCreateNodeInjector());
}
/**
 * Inject static attribute value into directive constructor.
 *
 * This method is used with `factory` functions which are generated as part of
 * `defineDirective` or `defineComponent`. The method retrieves the static value
 * of an attribute. (Dynamic attributes are not supported since they are not resolved
 *  at the time of injection and can change over time.)
 *
 * # Example
 * Given:
 * ```
 * \@Component(...)
 * class MyComponent {
 *   constructor(\@Attribute('title') title: string) { ... }
 * }
 * ```
 * When instantiated with
 * ```
 * <my-component title="Hello"></my-component>
 * ```
 *
 * Then factory method generated is:
 * ```
 * MyComponent.ngComponentDef = defineComponent({
 *   factory: () => new MyComponent(injectAttribute('title'))
 *   ...
 * })
 * ```
 *
 * \@experimental
 * @param {?} attrNameToInject
 * @return {?}
 */
export function injectAttribute(attrNameToInject) {
    /** @type {?} */
    const lNode = getPreviousOrParentNode();
    ngDevMode && assertNodeOfPossibleTypes(lNode, 0 /* Container */, 3 /* Element */, 4 /* ElementContainer */);
    /** @type {?} */
    const tNode = lNode.tNode;
    ngDevMode && assertDefined(tNode, 'expecting tNode');
    /** @type {?} */
    const attrs = tNode.attrs;
    if (attrs) {
        for (let i = 0; i < attrs.length; i = i + 2) {
            /** @type {?} */
            const attrName = attrs[i];
            if (attrName === 1 /* SelectOnly */)
                break;
            if (attrName == attrNameToInject) {
                return /** @type {?} */ (attrs[i + 1]);
            }
        }
    }
    return undefined;
}
/**
 * Creates a ViewRef and stores it on the injector as ChangeDetectorRef (public alias).
 * Or, if it already exists, retrieves the existing instance.
 *
 * @param {?} di
 * @param {?} context
 * @return {?} The ChangeDetectorRef to use
 */
export function getOrCreateChangeDetectorRef(di, context) {
    if (di.changeDetectorRef)
        return di.changeDetectorRef;
    /** @type {?} */
    const currentNode = di.node;
    if (isComponent(currentNode.tNode)) {
        return di.changeDetectorRef = new ViewRef(/** @type {?} */ (currentNode.data), context);
    }
    else if (currentNode.tNode.type === 3 /* Element */) {
        return di.changeDetectorRef = getOrCreateHostChangeDetector(currentNode.view[HOST_NODE]);
    }
    return /** @type {?} */ ((null));
}
/**
 * Gets or creates ChangeDetectorRef for the closest host component
 * @param {?} currentNode
 * @return {?}
 */
function getOrCreateHostChangeDetector(currentNode) {
    /** @type {?} */
    const hostNode = getClosestComponentAncestor(currentNode);
    /** @type {?} */
    const hostInjector = hostNode.nodeInjector;
    /** @type {?} */
    const existingRef = hostInjector && hostInjector.changeDetectorRef;
    return existingRef ?
        existingRef :
        new ViewRef(/** @type {?} */ (hostNode.data), /** @type {?} */ ((hostNode
            .view[DIRECTIVES]))[hostNode.tNode.flags >> 15 /* DirectiveStartingIndexShift */]);
}
/**
 * @param {?} di
 * @return {?}
 */
function getOrCreateRenderer2(di) {
    /** @type {?} */
    const renderer = di.node.view[RENDERER];
    if (isProceduralRenderer(renderer)) {
        return /** @type {?} */ (renderer);
    }
    else {
        throw new Error('Cannot inject Renderer2 when the application uses Renderer3!');
    }
}
/**
 * If the node is an embedded view, traverses up the view tree to return the closest
 * ancestor view that is attached to a component. If it's already a component node,
 * returns itself.
 * @param {?} node
 * @return {?}
 */
function getClosestComponentAncestor(node) {
    while (node.tNode.type === 2 /* View */) {
        node = node.view[HOST_NODE];
    }
    return /** @type {?} */ (node);
}
/**
 * Returns the value associated to the given token from the injectors.
 *
 * Look for the injector providing the token by walking up the node injector tree and then
 * the module injector tree.
 *
 * @template T
 * @param {?} nodeInjector Node injector where the search should start
 * @param {?} token The token to look for
 * @param {?=} flags Injection flags
 * @return {?} the value from the injector or `null` when not found
 */
export function getOrCreateInjectable(nodeInjector, token, flags = 0 /* Default */) {
    /** @type {?} */
    const bloomHash = bloomHashBit(token);
    // If the token has a bloom hash, then it is a directive that is public to the injection system
    // (diPublic) otherwise fall back to the module injector.
    if (bloomHash !== null) {
        /** @type {?} */
        let injector = nodeInjector;
        while (injector) {
            // Get the closest potential matching injector (upwards in the injector tree) that
            // *potentially* has the token.
            injector = bloomFindPossibleInjector(injector, bloomHash, flags);
            // If no injector is found, we *know* that there is no ancestor injector that contains the
            // token, so we abort.
            if (!injector) {
                break;
            }
            /** @type {?} */
            const node = injector.node;
            /** @type {?} */
            const nodeFlags = node.tNode.flags;
            /** @type {?} */
            const count = nodeFlags & 4095 /* DirectiveCountMask */;
            if (count !== 0) {
                /** @type {?} */
                const start = nodeFlags >> 15 /* DirectiveStartingIndexShift */;
                /** @type {?} */
                const end = start + count;
                /** @type {?} */
                const defs = /** @type {?} */ ((node.view[TVIEW].directives));
                for (let i = start; i < end; i++) {
                    /** @type {?} */
                    const directiveDef = /** @type {?} */ (defs[i]);
                    if (directiveDef.type === token && directiveDef.diPublic) {
                        return /** @type {?} */ ((node.view[DIRECTIVES]))[i];
                    }
                }
            }
            /** @type {?} */
            let instance;
            if (injector === nodeInjector &&
                (instance = searchMatchesQueuedForCreation(node, token))) {
                return instance;
            }
            // The def wasn't found anywhere on this node, so it was a false positive.
            // If flags permit, traverse up the tree and continue searching.
            if (flags & 2 /* Self */ || flags & 1 /* Host */ && !sameHostView(injector)) {
                injector = null;
            }
            else {
                injector = injector.parent;
            }
        }
    }
    /** @type {?} */
    const moduleInjector = getPreviousOrParentNode().view[INJECTOR];
    /** @type {?} */
    const formerInjector = setCurrentInjector(moduleInjector);
    try {
        return inject(token, flags);
    }
    finally {
        setCurrentInjector(formerInjector);
    }
}
/**
 * @template T
 * @param {?} node
 * @param {?} token
 * @return {?}
 */
function searchMatchesQueuedForCreation(node, token) {
    /** @type {?} */
    const matches = node.view[TVIEW].currentMatches;
    if (matches) {
        for (let i = 0; i < matches.length; i += 2) {
            /** @type {?} */
            const def = /** @type {?} */ (matches[i]);
            if (def.type === token) {
                return resolveDirective(def, i + 1, matches, node.view[TVIEW]);
            }
        }
    }
    return null;
}
/**
 * Returns the bit in an injector's bloom filter that should be used to determine whether or not
 * the directive might be provided by the injector.
 *
 * When a directive is public, it is added to the bloom filter and given a unique ID that can be
 * retrieved on the Type. When the directive isn't public or the token is not a directive `null`
 * is returned as the node injector can not possibly provide that token.
 *
 * @param {?} token the injection token
 * @return {?} the matching bit to check in the bloom filter or `null` if the token is not known.
 */
function bloomHashBit(token) {
    /** @type {?} */
    let id = (/** @type {?} */ (token))[NG_ELEMENT_ID];
    return typeof id === 'number' ? id & BLOOM_MASK : null;
}
/**
 * Finds the closest injector that might have a certain directive.
 *
 * Each directive corresponds to a bit in an injector's bloom filter. Given the bloom bit to
 * check and a starting injector, this function traverses up injectors until it finds an
 * injector that contains a 1 for that bit in its bloom filter. A 1 indicates that the
 * injector may have that directive. It only *may* have the directive because directives begin
 * to share bloom filter bits after the BLOOM_SIZE is reached, and it could correspond to a
 * different directive sharing the bit.
 *
 * Note: We can skip checking further injectors up the tree if an injector's cbf structure
 * has a 0 for that bloom bit. Since cbf contains the merged value of all the parent
 * injectors, a 0 in the bloom bit indicates that the parents definitely do not contain
 * the directive and do not need to be checked.
 *
 * @param {?} startInjector
 * @param {?} bloomBit The bit to check in each injector's bloom filter
 * @param {?} flags The injection flags for this injection site (e.g. Optional or SkipSelf)
 * @return {?} An injector that might have the directive
 */
export function bloomFindPossibleInjector(startInjector, bloomBit, flags) {
    /** @type {?} */
    const mask = 1 << bloomBit;
    /** @type {?} */
    const b7 = bloomBit & 0x80;
    /** @type {?} */
    const b6 = bloomBit & 0x40;
    /** @type {?} */
    const b5 = bloomBit & 0x20;
    /** @type {?} */
    let injector = flags & 4 /* SkipSelf */ ? startInjector.parent : startInjector;
    while (injector) {
        /** @type {?} */
        let value;
        if (b7) {
            value = b6 ? (b5 ? injector.bf7 : injector.bf6) : (b5 ? injector.bf5 : injector.bf4);
        }
        else {
            value = b6 ? (b5 ? injector.bf3 : injector.bf2) : (b5 ? injector.bf1 : injector.bf0);
        }
        // If the bloom filter value has the bit corresponding to the directive's bloomBit flipped on,
        // this injector is a potential match.
        if (value & mask) {
            return injector;
        }
        if (flags & 2 /* Self */ || flags & 1 /* Host */ && !sameHostView(injector)) {
            return null;
        }
        // If the current injector does not have the directive, check the bloom filters for the ancestor
        // injectors (cbf0 - cbf7). These filters capture *all* ancestor injectors.
        if (b7) {
            value = b6 ? (b5 ? injector.cbf7 : injector.cbf6) : (b5 ? injector.cbf5 : injector.cbf4);
        }
        else {
            value = b6 ? (b5 ? injector.cbf3 : injector.cbf2) : (b5 ? injector.cbf1 : injector.cbf0);
        }
        // If the ancestor bloom filter value has the bit corresponding to the directive, traverse up to
        // find the specific injector. If the ancestor bloom filter does not have the bit, we can abort.
        if (value & mask) {
            injector = injector.parent;
        }
        else {
            return null;
        }
    }
    return null;
}
/**
 * Checks whether the current injector and its parent are in the same host view.
 *
 * This is necessary to support \@Host() decorators. If \@Host() is set, we should stop searching once
 * the injector and its parent view don't match because it means we'd cross the view boundary.
 * @param {?} injector
 * @return {?}
 */
function sameHostView(injector) {
    return !!injector.parent && injector.parent.node.view === injector.node.view;
}
/**
 * @template T
 */
export class ReadFromInjectorFn {
    /**
     * @param {?} read
     */
    constructor(read) {
        this.read = read;
    }
}
if (false) {
    /** @type {?} */
    ReadFromInjectorFn.prototype.read;
}
/**
 * Creates an ElementRef for a given node injector and stores it on the injector.
 * Or, if the ElementRef already exists, retrieves the existing ElementRef.
 *
 * @param {?} di The node injector where we should store a created ElementRef
 * @return {?} The ElementRef instance to use
 */
export function getOrCreateElementRef(di) {
    return di.elementRef || (di.elementRef = new ElementRef(di.node.native));
}
/** @type {?} */
export const QUERY_READ_TEMPLATE_REF = /** @type {?} */ ((/** @type {?} */ (new ReadFromInjectorFn((injector) => getOrCreateTemplateRef(injector)))));
/** @type {?} */
export const QUERY_READ_CONTAINER_REF = /** @type {?} */ ((/** @type {?} */ (new ReadFromInjectorFn((injector) => getOrCreateContainerRef(injector)))));
/** @type {?} */
export const QUERY_READ_ELEMENT_REF = /** @type {?} */ ((/** @type {?} */ (new ReadFromInjectorFn((injector) => getOrCreateElementRef(injector)))));
/** @type {?} */
export const QUERY_READ_FROM_NODE = (/** @type {?} */ ((new ReadFromInjectorFn((injector, node, directiveIdx) => {
    ngDevMode && assertNodeOfPossibleTypes(node, 0 /* Container */, 3 /* Element */, 4 /* ElementContainer */);
    if (directiveIdx > -1) {
        return /** @type {?} */ ((node.view[DIRECTIVES]))[directiveIdx];
    }
    if (node.tNode.type === 3 /* Element */ || node.tNode.type === 4 /* ElementContainer */) {
        return getOrCreateElementRef(injector);
    }
    if (node.tNode.type === 0 /* Container */) {
        return getOrCreateTemplateRef(injector);
    }
    if (ngDevMode) {
        // should never happen
        throw new Error(`Unexpected node type: ${node.tNode.type}`);
    }
}))));
/**
 * A ref to a node's native element.
 */
class ElementRef {
    /**
     * @param {?} nativeElement
     */
    constructor(nativeElement) { this.nativeElement = nativeElement; }
}
if (false) {
    /** @type {?} */
    ElementRef.prototype.nativeElement;
}
/**
 * Creates a ViewContainerRef and stores it on the injector. Or, if the ViewContainerRef
 * already exists, retrieves the existing ViewContainerRef.
 *
 * @param {?} di
 * @return {?} The ViewContainerRef instance to use
 */
export function getOrCreateContainerRef(di) {
    if (!di.viewContainerRef) {
        /** @type {?} */
        const vcRefHost = di.node;
        ngDevMode && assertNodeOfPossibleTypes(vcRefHost, 0 /* Container */, 3 /* Element */, 4 /* ElementContainer */);
        /** @type {?} */
        const hostParent = /** @type {?} */ ((getParentLNode(vcRefHost)));
        /** @type {?} */
        const lContainer = createLContainer(hostParent, vcRefHost.view, true);
        /** @type {?} */
        const comment = vcRefHost.view[RENDERER].createComment(ngDevMode ? 'container' : '');
        /** @type {?} */
        const lContainerNode = createLNodeObject(0 /* Container */, vcRefHost.view, hostParent, comment, lContainer);
        appendChild(hostParent, comment, vcRefHost.view);
        /** @type {?} */
        const hostTNode = /** @type {?} */ (vcRefHost.tNode);
        if (!hostTNode.dynamicContainerNode) {
            hostTNode.dynamicContainerNode =
                createTNode(0 /* Container */, -1, null, null, hostTNode, null);
        }
        lContainerNode.tNode = hostTNode.dynamicContainerNode;
        vcRefHost.dynamicLContainerNode = lContainerNode;
        addToViewTree(vcRefHost.view, /** @type {?} */ (hostTNode.index), lContainer);
        di.viewContainerRef = new ViewContainerRef(lContainerNode, vcRefHost);
    }
    return di.viewContainerRef;
}
export class NodeInjector {
    /**
     * @param {?} _lInjector
     */
    constructor(_lInjector) {
        this._lInjector = _lInjector;
    }
    /**
     * @param {?} token
     * @return {?}
     */
    get(token) {
        if (token === viewEngine_TemplateRef) {
            return getOrCreateTemplateRef(this._lInjector);
        }
        if (token === viewEngine_ViewContainerRef) {
            return getOrCreateContainerRef(this._lInjector);
        }
        if (token === viewEngine_ElementRef) {
            return getOrCreateElementRef(this._lInjector);
        }
        if (token === viewEngine_ChangeDetectorRef) {
            return getOrCreateChangeDetectorRef(this._lInjector, null);
        }
        if (token === Renderer2) {
            return getOrCreateRenderer2(this._lInjector);
        }
        return getOrCreateInjectable(this._lInjector, token);
    }
}
if (false) {
    /** @type {?} */
    NodeInjector.prototype._lInjector;
}
/**
 * A ref to a container that enables adding and removing views from that container
 * imperatively.
 */
class ViewContainerRef {
    /**
     * @param {?} _lContainerNode
     * @param {?} _hostNode
     */
    constructor(_lContainerNode, _hostNode) {
        this._lContainerNode = _lContainerNode;
        this._hostNode = _hostNode;
        this._viewRefs = [];
    }
    /**
     * @return {?}
     */
    get element() {
        /** @type {?} */
        const injector = getOrCreateNodeInjectorForNode(this._hostNode);
        return getOrCreateElementRef(injector);
    }
    /**
     * @return {?}
     */
    get injector() {
        /** @type {?} */
        const injector = getOrCreateNodeInjectorForNode(this._hostNode);
        return new NodeInjector(injector);
    }
    /**
     * @deprecated No replacement
     * @return {?}
     */
    get parentInjector() {
        /** @type {?} */
        const parentLInjector = getParentLNode(this._hostNode).nodeInjector;
        return parentLInjector ? new NodeInjector(parentLInjector) : new NullInjector();
    }
    /**
     * @return {?}
     */
    clear() {
        /** @type {?} */
        const lContainer = this._lContainerNode.data;
        while (lContainer[VIEWS].length) {
            this.remove(0);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    get(index) { return this._viewRefs[index] || null; }
    /**
     * @return {?}
     */
    get length() {
        /** @type {?} */
        const lContainer = this._lContainerNode.data;
        return lContainer[VIEWS].length;
    }
    /**
     * @template C
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    createEmbeddedView(templateRef, context, index) {
        /** @type {?} */
        const adjustedIdx = this._adjustIndex(index);
        /** @type {?} */
        const viewRef = (/** @type {?} */ (templateRef))
            .createEmbeddedView(context || /** @type {?} */ ({}), this._lContainerNode, adjustedIdx);
        (/** @type {?} */ (viewRef)).attachToViewContainerRef(this);
        this._viewRefs.splice(adjustedIdx, 0, viewRef);
        return viewRef;
    }
    /**
     * @template C
     * @param {?} componentFactory
     * @param {?=} index
     * @param {?=} injector
     * @param {?=} projectableNodes
     * @param {?=} ngModuleRef
     * @return {?}
     */
    createComponent(componentFactory, index, injector, projectableNodes, ngModuleRef) {
        /** @type {?} */
        const contextInjector = injector || this.parentInjector;
        if (!ngModuleRef && contextInjector) {
            ngModuleRef = contextInjector.get(viewEngine_NgModuleRef, null);
        }
        /** @type {?} */
        const componentRef = componentFactory.create(contextInjector, projectableNodes, undefined, ngModuleRef);
        this.insert(componentRef.hostView, index);
        return componentRef;
    }
    /**
     * @param {?} viewRef
     * @param {?=} index
     * @return {?}
     */
    insert(viewRef, index) {
        if (viewRef.destroyed) {
            throw new Error('Cannot insert a destroyed View in a ViewContainer!');
        }
        /** @type {?} */
        const lViewNode = /** @type {?} */ (((/** @type {?} */ (viewRef))._lViewNode));
        /** @type {?} */
        const adjustedIdx = this._adjustIndex(index);
        insertView(this._lContainerNode, lViewNode, adjustedIdx);
        /** @type {?} */
        const views = this._lContainerNode.data[VIEWS];
        /** @type {?} */
        const beforeNode = adjustedIdx + 1 < views.length ?
            (/** @type {?} */ ((getChildLNode(views[adjustedIdx + 1])))).native :
            this._lContainerNode.native;
        addRemoveViewFromContainer(this._lContainerNode, lViewNode, true, beforeNode);
        (/** @type {?} */ (viewRef)).attachToViewContainerRef(this);
        this._viewRefs.splice(adjustedIdx, 0, viewRef);
        return viewRef;
    }
    /**
     * @param {?} viewRef
     * @param {?} newIndex
     * @return {?}
     */
    move(viewRef, newIndex) {
        /** @type {?} */
        const index = this.indexOf(viewRef);
        this.detach(index);
        this.insert(viewRef, this._adjustIndex(newIndex));
        return viewRef;
    }
    /**
     * @param {?} viewRef
     * @return {?}
     */
    indexOf(viewRef) { return this._viewRefs.indexOf(viewRef); }
    /**
     * @param {?=} index
     * @return {?}
     */
    remove(index) {
        /** @type {?} */
        const adjustedIdx = this._adjustIndex(index, -1);
        removeView(this._lContainerNode, adjustedIdx);
        this._viewRefs.splice(adjustedIdx, 1);
    }
    /**
     * @param {?=} index
     * @return {?}
     */
    detach(index) {
        /** @type {?} */
        const adjustedIdx = this._adjustIndex(index, -1);
        detachView(this._lContainerNode, adjustedIdx);
        return this._viewRefs.splice(adjustedIdx, 1)[0] || null;
    }
    /**
     * @param {?=} index
     * @param {?=} shift
     * @return {?}
     */
    _adjustIndex(index, shift = 0) {
        if (index == null) {
            return this._lContainerNode.data[VIEWS].length + shift;
        }
        if (ngDevMode) {
            assertGreaterThan(index, -1, 'index must be positive');
            // +1 because it's legal to insert at the end.
            assertLessThan(index, this._lContainerNode.data[VIEWS].length + 1 + shift, 'index');
        }
        return index;
    }
}
if (false) {
    /** @type {?} */
    ViewContainerRef.prototype._viewRefs;
    /** @type {?} */
    ViewContainerRef.prototype._lContainerNode;
    /** @type {?} */
    ViewContainerRef.prototype._hostNode;
}
/**
 * Creates a TemplateRef and stores it on the injector. Or, if the TemplateRef already
 * exists, retrieves the existing TemplateRef.
 *
 * @template T
 * @param {?} di The node injector where we should store a created TemplateRef
 * @return {?} The TemplateRef instance to use
 */
export function getOrCreateTemplateRef(di) {
    if (!di.templateRef) {
        ngDevMode && assertNodeType(di.node, 0 /* Container */);
        /** @type {?} */
        const hostNode = /** @type {?} */ (di.node);
        /** @type {?} */
        const hostTNode = hostNode.tNode;
        ngDevMode && assertDefined(hostTNode.tViews, 'TView must be allocated');
        di.templateRef = new TemplateRef(hostNode.view, getOrCreateElementRef(di), /** @type {?} */ (hostTNode.tViews), getRenderer(), hostNode.data[QUERIES]);
    }
    return di.templateRef;
}
/**
 * @template T
 * @param {?} type
 * @return {?}
 */
export function getFactoryOf(type) {
    /** @type {?} */
    const typeAny = /** @type {?} */ (type);
    /** @type {?} */
    const def = typeAny.ngComponentDef || typeAny.ngDirectiveDef || typeAny.ngPipeDef ||
        typeAny.ngInjectableDef || typeAny.ngInjectorDef;
    if (def === undefined || def.factory === undefined) {
        return null;
    }
    return def.factory;
}
/**
 * @template T
 * @param {?} type
 * @return {?}
 */
export function getInheritedFactory(type) {
    /** @type {?} */
    const proto = /** @type {?} */ (Object.getPrototypeOf(type.prototype).constructor);
    /** @type {?} */
    const factory = getFactoryOf(proto);
    if (factory !== null) {
        return factory;
    }
    else {
        // There is no factory defined. Either this was improper usage of inheritance
        // (no Angular decorator on the superclass) or there is no constructor at all
        // in the inheritance chain. Since the two cases cannot be distinguished, the
        // latter has to be assumed.
        return (t) => new t();
    }
}
/**
 * @template T
 */
class TemplateRef {
    /**
     * @param {?} _declarationParentView
     * @param {?} elementRef
     * @param {?} _tView
     * @param {?} _renderer
     * @param {?} _queries
     */
    constructor(_declarationParentView, elementRef, _tView, _renderer, _queries) {
        this._declarationParentView = _declarationParentView;
        this.elementRef = elementRef;
        this._tView = _tView;
        this._renderer = _renderer;
        this._queries = _queries;
    }
    /**
     * @param {?} context
     * @param {?=} containerNode
     * @param {?=} index
     * @return {?}
     */
    createEmbeddedView(context, containerNode, index) {
        /** @type {?} */
        const viewNode = createEmbeddedViewNode(this._tView, context, this._declarationParentView, this._renderer, this._queries);
        if (containerNode) {
            insertView(containerNode, viewNode, /** @type {?} */ ((index)));
        }
        renderEmbeddedTemplate(viewNode, this._tView, context, 1 /* Create */);
        /** @type {?} */
        const viewRef = new ViewRef(viewNode.data, context);
        viewRef._lViewNode = viewNode;
        return viewRef;
    }
}
if (false) {
    /** @type {?} */
    TemplateRef.prototype._declarationParentView;
    /** @type {?} */
    TemplateRef.prototype.elementRef;
    /** @type {?} */
    TemplateRef.prototype._tView;
    /** @type {?} */
    TemplateRef.prototype._renderer;
    /** @type {?} */
    TemplateRef.prototype._queries;
}
/**
 * Retrieves `TemplateRef` instance from `Injector` when a local reference is placed on the
 * `<ng-template>` element.
 * @param {?} lNode
 * @return {?}
 */
export function templateRefExtractor(lNode) {
    return getOrCreateTemplateRef(getOrCreateNodeInjectorForNode(lNode));
}
//# sourceMappingURL=di.js.map