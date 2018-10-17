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
import { getInjectableDef, getInjectorDef } from '../di/defs';
import { inject, setCurrentInjector } from '../di/injector';
import { assertDefined } from './assert';
import { getComponentDef, getDirectiveDef, getPipeDef } from './definition';
import { NG_ELEMENT_ID } from './fields';
import { _getViewData, getPreviousOrParentTNode, resolveDirective, setEnvironment } from './instructions';
import { PARENT_INJECTOR, TNODE, } from './interfaces/injector';
import { DECLARATION_VIEW, HOST_NODE, INJECTOR, TVIEW } from './interfaces/view';
import { assertNodeOfPossibleTypes } from './node_assert';
/** *
 * The number of slots in each bloom filter (used by DI). The larger this number, the fewer
 * directives that will share slots, and thus, the fewer false positives when checking for
 * the existence of a directive.
  @type {?} */
var BLOOM_SIZE = 256;
/** @type {?} */
var BLOOM_MASK = BLOOM_SIZE - 1;
/** *
 * Counter used to generate unique IDs for directives.
  @type {?} */
var nextNgElementId = 0;
/**
 * Registers this directive as present in its node's injector by flipping the directive's
 * corresponding bit in the injector's bloom filter.
 *
 * @param {?} injectorIndex The index of the node injector where this token should be registered
 * @param {?} tView The TView for the injector's bloom filters
 * @param {?} type The directive token to register
 * @return {?}
 */
export function bloomAdd(injectorIndex, tView, type) {
    if (tView.firstTemplatePass) {
        /** @type {?} */
        var id = (/** @type {?} */ (type))[NG_ELEMENT_ID];
        // Set a unique ID on the directive type, so if something tries to inject the directive,
        // we can easily retrieve the ID and hash it into the bloom bit that should be checked.
        if (id == null) {
            id = (/** @type {?} */ (type))[NG_ELEMENT_ID] = nextNgElementId++;
        }
        /** @type {?} */
        var bloomBit = id & BLOOM_MASK;
        /** @type {?} */
        var mask = 1 << bloomBit;
        /** @type {?} */
        var b7 = bloomBit & 0x80;
        /** @type {?} */
        var b6 = bloomBit & 0x40;
        /** @type {?} */
        var b5 = bloomBit & 0x20;
        /** @type {?} */
        var tData = /** @type {?} */ (tView.data);
        if (b7) {
            b6 ? (b5 ? (tData[injectorIndex + 7] |= mask) : (tData[injectorIndex + 6] |= mask)) :
                (b5 ? (tData[injectorIndex + 5] |= mask) : (tData[injectorIndex + 4] |= mask));
        }
        else {
            b6 ? (b5 ? (tData[injectorIndex + 3] |= mask) : (tData[injectorIndex + 2] |= mask)) :
                (b5 ? (tData[injectorIndex + 1] |= mask) : (tData[injectorIndex] |= mask));
        }
    }
}
/**
 * @return {?}
 */
export function getOrCreateNodeInjector() {
    return getOrCreateNodeInjectorForNode(/** @type {?} */ (getPreviousOrParentTNode()), _getViewData());
}
/**
 * Creates (or gets an existing) injector for a given element or container.
 *
 * @param {?} tNode for which an injector should be retrieved / created.
 * @param {?} hostView View where the node is stored
 * @return {?} Node injector
 */
export function getOrCreateNodeInjectorForNode(tNode, hostView) {
    /** @type {?} */
    var existingInjectorIndex = getInjectorIndex(tNode, hostView);
    if (existingInjectorIndex !== -1) {
        return existingInjectorIndex;
    }
    /** @type {?} */
    var tView = hostView[TVIEW];
    if (tView.firstTemplatePass) {
        tNode.injectorIndex = hostView.length;
        setUpBloom(tView.data, tNode); // foundation for node bloom
        setUpBloom(hostView, null); // foundation for cumulative bloom
        setUpBloom(tView.blueprint, null);
    }
    /** @type {?} */
    var parentLoc = getParentInjectorLocation(tNode, hostView);
    /** @type {?} */
    var parentIndex = parentLoc & 32767 /* InjectorIndexMask */;
    /** @type {?} */
    var parentView = getParentInjectorView(parentLoc, hostView);
    /** @type {?} */
    var parentData = /** @type {?} */ (parentView[TVIEW].data);
    /** @type {?} */
    var injectorIndex = tNode.injectorIndex;
    // If a parent injector can't be found, its location is set to -1.
    // In that case, we don't need to set up a cumulative bloom
    if (parentLoc !== -1) {
        for (var i = 0; i < PARENT_INJECTOR; i++) {
            /** @type {?} */
            var bloomIndex = parentIndex + i;
            // Creates a cumulative bloom filter that merges the parent's bloom filter
            // and its own cumulative bloom (which contains tokens for all ancestors)
            hostView[injectorIndex + i] = parentView[bloomIndex] | parentData[bloomIndex];
        }
    }
    hostView[injectorIndex + PARENT_INJECTOR] = parentLoc;
    return injectorIndex;
}
/**
 * @param {?} arr
 * @param {?} footer
 * @return {?}
 */
function setUpBloom(arr, footer) {
    arr.push(0, 0, 0, 0, 0, 0, 0, 0, footer);
}
/**
 * @param {?} tNode
 * @param {?} hostView
 * @return {?}
 */
export function getInjectorIndex(tNode, hostView) {
    if (tNode.injectorIndex === -1 ||
        // If the injector index is the same as its parent's injector index, then the index has been
        // copied down from the parent node. No injector has been created yet on this node.
        (tNode.parent && tNode.parent.injectorIndex === tNode.injectorIndex) ||
        // After the first template pass, the injector index might exist but the parent values
        // might not have been calculated yet for this instance
        hostView[tNode.injectorIndex + PARENT_INJECTOR] == null) {
        return -1;
    }
    else {
        return tNode.injectorIndex;
    }
}
/**
 * Finds the index of the parent injector, with a view offset if applicable. Used to set the
 * parent injector initially.
 * @param {?} tNode
 * @param {?} view
 * @return {?}
 */
export function getParentInjectorLocation(tNode, view) {
    if (tNode.parent && tNode.parent.injectorIndex !== -1) {
        return tNode.parent.injectorIndex; // view offset is 0
    }
    /** @type {?} */
    var hostTNode = view[HOST_NODE];
    /** @type {?} */
    var viewOffset = 1;
    while (hostTNode && hostTNode.injectorIndex === -1) {
        view = /** @type {?} */ ((view[DECLARATION_VIEW]));
        hostTNode = /** @type {?} */ ((view[HOST_NODE]));
        viewOffset++;
    }
    return hostTNode ?
        hostTNode.injectorIndex | (viewOffset << 15 /* ViewOffsetShift */) :
        -1;
}
/**
 * Unwraps a parent injector location number to find the view offset from the current injector,
 * then walks up the declaration view tree until the view is found that contains the parent
 * injector.
 *
 * @param {?} location The location of the parent injector, which contains the view offset
 * @param {?} startView The LViewData instance from which to start walking up the view tree
 * @return {?} The LViewData instance that contains the parent injector
 */
export function getParentInjectorView(location, startView) {
    /** @type {?} */
    var viewOffset = location >> 15 /* ViewOffsetShift */;
    /** @type {?} */
    var parentView = startView;
    // For most cases, the parent injector can be found on the host node (e.g. for component
    // or container), but we must keep the loop here to support the rarer case of deeply nested
    // <ng-template> tags or inline views, where the parent injector might live many views
    // above the child injector.
    while (viewOffset > 0) {
        parentView = /** @type {?} */ ((parentView[DECLARATION_VIEW]));
        viewOffset--;
    }
    return parentView;
}
/**
 * Makes a directive public to the DI system by adding it to an injector's bloom filter.
 *
 * @param {?} injectorIndex
 * @param {?} view
 * @param {?} def The definition of the directive to be made public
 * @return {?}
 */
export function diPublicInInjector(injectorIndex, view, def) {
    bloomAdd(injectorIndex, view[TVIEW], def.type);
}
/**
 * Makes a directive public to the DI system by adding it to an injector's bloom filter.
 *
 * @param {?} def The definition of the directive to be made public
 * @return {?}
 */
export function diPublic(def) {
    diPublicInInjector(getOrCreateNodeInjector(), _getViewData(), def);
}
/**
 * @template T
 * @param {?} token
 * @param {?=} flags
 * @return {?}
 */
export function directiveInject(token, flags) {
    if (flags === void 0) { flags = 0 /* Default */; }
    /** @type {?} */
    var hostTNode = /** @type {?} */ (getPreviousOrParentTNode());
    return getOrCreateInjectable(hostTNode, _getViewData(), token, flags);
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
    var tNode = getPreviousOrParentTNode();
    ngDevMode && assertNodeOfPossibleTypes(tNode, 0 /* Container */, 3 /* Element */, 4 /* ElementContainer */);
    ngDevMode && assertDefined(tNode, 'expecting tNode');
    /** @type {?} */
    var attrs = tNode.attrs;
    if (attrs) {
        for (var i = 0; i < attrs.length; i = i + 2) {
            /** @type {?} */
            var attrName = attrs[i];
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
 * Returns the value associated to the given token from the injectors.
 *
 * Look for the injector providing the token by walking up the node injector tree and then
 * the module injector tree.
 *
 * @template T
 * @param {?} hostTNode
 * @param {?} hostView
 * @param {?} token The token to look for
 * @param {?=} flags Injection flags
 * @return {?} the value from the injector or `null` when not found
 */
export function getOrCreateInjectable(hostTNode, hostView, token, flags) {
    if (flags === void 0) { flags = 0 /* Default */; }
    /** @type {?} */
    var bloomHash = bloomHashBitOrFactory(token);
    // If the ID stored here is a function, this is a special object like ElementRef or TemplateRef
    // so just call the factory function to create it.
    if (typeof bloomHash === 'function')
        return bloomHash();
    // If the token has a bloom hash, then it is a directive that is public to the injection system
    // (diPublic) otherwise fall back to the module injector.
    if (bloomHash != null) {
        /** @type {?} */
        var startInjectorIndex = getInjectorIndex(hostTNode, hostView);
        /** @type {?} */
        var injectorIndex = startInjectorIndex;
        /** @type {?} */
        var injectorView = hostView;
        /** @type {?} */
        var parentLocation = -1;
        // If we should skip this injector or if an injector doesn't exist on this node (e.g. all
        // directives on this node are private), start by searching the parent injector.
        if (flags & 4 /* SkipSelf */ || injectorIndex === -1) {
            parentLocation = injectorIndex === -1 ? getParentInjectorLocation(hostTNode, hostView) :
                injectorView[injectorIndex + PARENT_INJECTOR];
            if (shouldNotSearchParent(flags, parentLocation)) {
                injectorIndex = -1;
            }
            else {
                injectorIndex = parentLocation & 32767 /* InjectorIndexMask */;
                injectorView = getParentInjectorView(parentLocation, injectorView);
            }
        }
        while (injectorIndex !== -1) {
            // Traverse up the injector tree until we find a potential match or until we know there
            // *isn't* a match. Outer loop is necessary in case we get a false positive injector.
            while (injectorIndex !== -1) {
                // Check the current injector. If it matches, stop searching for an injector.
                if (injectorHasToken(bloomHash, injectorIndex, injectorView[TVIEW].data)) {
                    break;
                }
                parentLocation = injectorView[injectorIndex + PARENT_INJECTOR];
                if (shouldNotSearchParent(flags, parentLocation)) {
                    injectorIndex = -1;
                    break;
                }
                // If the ancestor bloom filter value has the bit corresponding to the directive, traverse
                // up to find the specific injector. If the ancestor bloom filter does not have the bit, we
                // can abort.
                if (injectorHasToken(bloomHash, injectorIndex, injectorView)) {
                    injectorIndex = parentLocation & 32767 /* InjectorIndexMask */;
                    injectorView = getParentInjectorView(parentLocation, injectorView);
                }
                else {
                    injectorIndex = -1;
                    break;
                }
            }
            // If no injector is found, we *know* that there is no ancestor injector that contains the
            // token, so we abort.
            if (injectorIndex === -1) {
                break;
            }
            /** @type {?} */
            var instance = void 0;
            if (instance = searchDirectivesOnInjector(injectorIndex, injectorView, token)) {
                return instance;
            }
            // If we *didn't* find the directive for the token and we are searching the current node's
            // injector, it's possible the directive is on this node and hasn't been created yet.
            if (injectorIndex === startInjectorIndex && hostView === injectorView &&
                (instance = searchMatchesQueuedForCreation(token, injectorView[TVIEW]))) {
                return instance;
            }
            // The def wasn't found anywhere on this node, so it was a false positive.
            // Traverse up the tree and continue searching.
            injectorIndex = parentLocation & 32767 /* InjectorIndexMask */;
            injectorView = getParentInjectorView(parentLocation, injectorView);
        }
    }
    /** @type {?} */
    var moduleInjector = hostView[INJECTOR];
    /** @type {?} */
    var formerInjector = setCurrentInjector(moduleInjector);
    try {
        return inject(token, flags);
    }
    finally {
        setCurrentInjector(formerInjector);
    }
}
/**
 * @template T
 * @param {?} token
 * @param {?} hostTView
 * @return {?}
 */
function searchMatchesQueuedForCreation(token, hostTView) {
    /** @type {?} */
    var matches = hostTView.currentMatches;
    if (matches) {
        for (var i = 0; i < matches.length; i += 2) {
            /** @type {?} */
            var def = /** @type {?} */ (matches[i]);
            if (def.type === token) {
                return resolveDirective(def, i + 1, matches);
            }
        }
    }
    return null;
}
/**
 * @template T
 * @param {?} injectorIndex
 * @param {?} injectorView
 * @param {?} token
 * @return {?}
 */
function searchDirectivesOnInjector(injectorIndex, injectorView, token) {
    /** @type {?} */
    var tNode = /** @type {?} */ (injectorView[TVIEW].data[injectorIndex + TNODE]);
    /** @type {?} */
    var nodeFlags = tNode.flags;
    /** @type {?} */
    var count = nodeFlags & 4095 /* DirectiveCountMask */;
    if (count !== 0) {
        /** @type {?} */
        var start = nodeFlags >> 15 /* DirectiveStartingIndexShift */;
        /** @type {?} */
        var end = start + count;
        /** @type {?} */
        var defs = injectorView[TVIEW].data;
        for (var i = start; i < end; i++) {
            /** @type {?} */
            var directiveDef = /** @type {?} */ (defs[i]);
            if (directiveDef.type === token && directiveDef.diPublic) {
                return injectorView[i];
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
export function bloomHashBitOrFactory(token) {
    /** @type {?} */
    var tokenId = (/** @type {?} */ (token))[NG_ELEMENT_ID];
    return typeof tokenId === 'number' ? tokenId & BLOOM_MASK : tokenId;
}
/**
 * @param {?} bloomHash
 * @param {?} injectorIndex
 * @param {?} injectorView
 * @return {?}
 */
export function injectorHasToken(bloomHash, injectorIndex, injectorView) {
    /** @type {?} */
    var mask = 1 << bloomHash;
    /** @type {?} */
    var b7 = bloomHash & 0x80;
    /** @type {?} */
    var b6 = bloomHash & 0x40;
    /** @type {?} */
    var b5 = bloomHash & 0x20;
    /** @type {?} */
    var value;
    if (b7) {
        value = b6 ? (b5 ? injectorView[injectorIndex + 7] : injectorView[injectorIndex + 6]) :
            (b5 ? injectorView[injectorIndex + 5] : injectorView[injectorIndex + 4]);
    }
    else {
        value = b6 ? (b5 ? injectorView[injectorIndex + 3] : injectorView[injectorIndex + 2]) :
            (b5 ? injectorView[injectorIndex + 1] : injectorView[injectorIndex]);
    }
    // If the bloom filter value has the bit corresponding to the directive's bloomBit flipped on,
    // this injector is a potential match.
    return !!(value & mask);
}
/**
 * Returns true if flags prevent parent injector from being searched for tokens
 * @param {?} flags
 * @param {?} parentLocation
 * @return {?}
 */
function shouldNotSearchParent(flags, parentLocation) {
    return flags & 2 /* Self */ ||
        (flags & 1 /* Host */ && (parentLocation >> 15 /* ViewOffsetShift */) > 0);
}
var NodeInjector = /** @class */ (function () {
    function NodeInjector(_tNode, _hostView) {
        this._tNode = _tNode;
        this._hostView = _hostView;
        this._injectorIndex = getOrCreateNodeInjectorForNode(_tNode, _hostView);
    }
    /**
     * @param {?} token
     * @return {?}
     */
    NodeInjector.prototype.get = /**
     * @param {?} token
     * @return {?}
     */
    function (token) {
        setEnvironment(this._tNode, this._hostView);
        return getOrCreateInjectable(this._tNode, this._hostView, token);
    };
    return NodeInjector;
}());
export { NodeInjector };
if (false) {
    /** @type {?} */
    NodeInjector.prototype._injectorIndex;
    /** @type {?} */
    NodeInjector.prototype._tNode;
    /** @type {?} */
    NodeInjector.prototype._hostView;
}
/**
 * @template T
 * @param {?} type
 * @return {?}
 */
export function getFactoryOf(type) {
    /** @type {?} */
    var typeAny = /** @type {?} */ (type);
    /** @type {?} */
    var def = getComponentDef(typeAny) || getDirectiveDef(typeAny) ||
        getPipeDef(typeAny) || getInjectableDef(typeAny) || getInjectorDef(typeAny);
    if (!def || def.factory === undefined) {
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
    var proto = /** @type {?} */ (Object.getPrototypeOf(type.prototype).constructor);
    /** @type {?} */
    var factory = getFactoryOf(proto);
    if (factory !== null) {
        return factory;
    }
    else {
        // There is no factory defined. Either this was improper usage of inheritance
        // (no Angular decorator on the superclass) or there is no constructor at all
        // in the inheritance chain. Since the two cases cannot be distinguished, the
        // latter has to be assumed.
        return function (t) { return new t(); };
    }
}
//# sourceMappingURL=di.js.map