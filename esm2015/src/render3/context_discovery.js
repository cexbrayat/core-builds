/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import './ng_dev_mode';
import { assertEqual } from './assert';
import { MONKEY_PATCH_KEY_NAME } from './interfaces/context';
import { CONTEXT, HEADER_OFFSET, HOST, TVIEW } from './interfaces/view';
import { getComponentViewByIndex, getNativeByTNode, readElementValue, readPatchedData } from './util';
/**
 * Returns the matching `LContext` data for a given DOM node, directive or component instance.
 *
 * This function will examine the provided DOM element, component, or directive instance\'s
 * monkey-patched property to derive the `LContext` data. Once called then the monkey-patched
 * value will be that of the newly created `LContext`.
 *
 * If the monkey-patched value is the `LViewData` instance then the context value for that
 * target will be created and the monkey-patch reference will be updated. Therefore when this
 * function is called it may mutate the provided element\'s, component\'s or any of the associated
 * directive\'s monkey-patch values.
 *
 * If the monkey-patch value is not detected then the code will walk up the DOM until an element
 * is found which contains a monkey-patch reference. When that occurs then the provided element
 * will be updated with a new context (which is then returned). If the monkey-patch value is not
 * detected for a component/directive instance then it will throw an error (all components and
 * directives should be automatically monkey-patched by ivy).
 * @param {?} target
 * @return {?}
 */
export function getContext(target) {
    /** @type {?} */
    let mpValue = readPatchedData(target);
    if (mpValue) {
        // only when it's an array is it considered an LViewData instance
        // ... otherwise it's an already constructed LContext instance
        if (Array.isArray(mpValue)) {
            /** @type {?} */
            const lViewData = /** @type {?} */ ((mpValue));
            /** @type {?} */
            let nodeIndex;
            /** @type {?} */
            let component = undefined;
            /** @type {?} */
            let directives = undefined;
            if (isComponentInstance(target)) {
                nodeIndex = findViaComponent(lViewData, target);
                if (nodeIndex == -1) {
                    throw new Error('The provided component was not found in the application');
                }
                component = target;
            }
            else if (isDirectiveInstance(target)) {
                nodeIndex = findViaDirective(lViewData, target);
                if (nodeIndex == -1) {
                    throw new Error('The provided directive was not found in the application');
                }
                directives = discoverDirectives(nodeIndex, lViewData, false);
            }
            else {
                nodeIndex = findViaNativeElement(lViewData, /** @type {?} */ (target));
                if (nodeIndex == -1) {
                    return null;
                }
            }
            /** @type {?} */
            const native = readElementValue(lViewData[nodeIndex]);
            /** @type {?} */
            const existingCtx = readPatchedData(native);
            /** @type {?} */
            const context = (existingCtx && !Array.isArray(existingCtx)) ?
                existingCtx :
                createLContext(lViewData, nodeIndex, native);
            // only when the component has been discovered then update the monkey-patch
            if (component && context.component === undefined) {
                context.component = component;
                attachPatchData(context.component, context);
            }
            // only when the directives have been discovered then update the monkey-patch
            if (directives && context.directives === undefined) {
                context.directives = directives;
                for (let i = 0; i < directives.length; i++) {
                    attachPatchData(directives[i], context);
                }
            }
            attachPatchData(context.native, context);
            mpValue = context;
        }
    }
    else {
        /** @type {?} */
        const rElement = /** @type {?} */ (target);
        ngDevMode && assertDomElement(rElement);
        /** @type {?} */
        let parent = /** @type {?} */ (rElement);
        while (parent = parent.parentNode) {
            /** @type {?} */
            const parentContext = readPatchedData(parent);
            if (parentContext) {
                /** @type {?} */
                let lViewData;
                if (Array.isArray(parentContext)) {
                    lViewData = /** @type {?} */ (parentContext);
                }
                else {
                    lViewData = parentContext.lViewData;
                }
                // the edge of the app was also reached here through another means
                // (maybe because the DOM was changed manually).
                if (!lViewData) {
                    return null;
                }
                /** @type {?} */
                const index = findViaNativeElement(lViewData, rElement);
                if (index >= 0) {
                    /** @type {?} */
                    const native = readElementValue(lViewData[index]);
                    /** @type {?} */
                    const context = createLContext(lViewData, index, native);
                    attachPatchData(native, context);
                    mpValue = context;
                    break;
                }
            }
        }
    }
    return (/** @type {?} */ (mpValue)) || null;
}
/**
 * Creates an empty instance of a `LContext` context
 * @param {?} lViewData
 * @param {?} nodeIndex
 * @param {?} native
 * @return {?}
 */
function createLContext(lViewData, nodeIndex, native) {
    return {
        lViewData,
        nodeIndex: nodeIndex, native,
        component: undefined,
        directives: undefined,
        localRefs: undefined,
    };
}
/**
 * Takes a component instance and returns the view for that component.
 *
 * @param {?} componentInstance
 * @return {?} The component's view
 */
export function getComponentViewByInstance(componentInstance) {
    /** @type {?} */
    let lViewData = readPatchedData(componentInstance);
    /** @type {?} */
    let view;
    if (Array.isArray(lViewData)) {
        /** @type {?} */
        const nodeIndex = findViaComponent(lViewData, componentInstance);
        view = getComponentViewByIndex(nodeIndex, lViewData);
        /** @type {?} */
        const context = createLContext(lViewData, nodeIndex, /** @type {?} */ (view[HOST]));
        context.component = componentInstance;
        attachPatchData(componentInstance, context);
        attachPatchData(context.native, context);
    }
    else {
        /** @type {?} */
        const context = /** @type {?} */ ((lViewData));
        view = getComponentViewByIndex(context.nodeIndex, context.lViewData);
    }
    return view;
}
/**
 * Assigns the given data to the given target (which could be a component,
 * directive or DOM node instance) using monkey-patching.
 * @param {?} target
 * @param {?} data
 * @return {?}
 */
export function attachPatchData(target, data) {
    target[MONKEY_PATCH_KEY_NAME] = data;
}
/**
 * @param {?} instance
 * @return {?}
 */
export function isComponentInstance(instance) {
    return instance && instance.constructor && instance.constructor.ngComponentDef;
}
/**
 * @param {?} instance
 * @return {?}
 */
export function isDirectiveInstance(instance) {
    return instance && instance.constructor && instance.constructor.ngDirectiveDef;
}
/**
 * Locates the element within the given LViewData and returns the matching index
 * @param {?} lViewData
 * @param {?} target
 * @return {?}
 */
function findViaNativeElement(lViewData, target) {
    /** @type {?} */
    let tNode = lViewData[TVIEW].firstChild;
    while (tNode) {
        /** @type {?} */
        const native = /** @type {?} */ ((getNativeByTNode(tNode, lViewData)));
        if (native === target) {
            return tNode.index;
        }
        tNode = traverseNextElement(tNode);
    }
    return -1;
}
/**
 * Locates the next tNode (child, sibling or parent).
 * @param {?} tNode
 * @return {?}
 */
function traverseNextElement(tNode) {
    if (tNode.child) {
        return tNode.child;
    }
    else if (tNode.next) {
        return tNode.next;
    }
    else if (tNode.parent) {
        return tNode.parent.next || null;
    }
    return null;
}
/**
 * Locates the component within the given LViewData and returns the matching index
 * @param {?} lViewData
 * @param {?} componentInstance
 * @return {?}
 */
function findViaComponent(lViewData, componentInstance) {
    /** @type {?} */
    const componentIndices = lViewData[TVIEW].components;
    if (componentIndices) {
        for (let i = 0; i < componentIndices.length; i++) {
            /** @type {?} */
            const elementComponentIndex = componentIndices[i];
            /** @type {?} */
            const componentView = getComponentViewByIndex(elementComponentIndex, lViewData);
            if (componentView[CONTEXT] === componentInstance) {
                return elementComponentIndex;
            }
        }
    }
    else {
        /** @type {?} */
        const rootComponentView = getComponentViewByIndex(HEADER_OFFSET, lViewData);
        /** @type {?} */
        const rootComponent = rootComponentView[CONTEXT];
        if (rootComponent === componentInstance) {
            // we are dealing with the root element here therefore we know that the
            // element is the very first element after the HEADER data in the lView
            return HEADER_OFFSET;
        }
    }
    return -1;
}
/**
 * Locates the directive within the given LViewData and returns the matching index
 * @param {?} lViewData
 * @param {?} directiveInstance
 * @return {?}
 */
function findViaDirective(lViewData, directiveInstance) {
    /** @type {?} */
    let tNode = lViewData[TVIEW].firstChild;
    while (tNode) {
        /** @type {?} */
        const directiveIndexStart = getDirectiveStartIndex(tNode);
        /** @type {?} */
        const directiveIndexEnd = getDirectiveEndIndex(tNode, directiveIndexStart);
        for (let i = directiveIndexStart; i < directiveIndexEnd; i++) {
            if (lViewData[i] === directiveInstance) {
                return tNode.index;
            }
        }
        tNode = traverseNextElement(tNode);
    }
    return -1;
}
/**
 * @param {?} element
 * @return {?}
 */
function assertDomElement(element) {
    assertEqual(element.nodeType, 1, 'The provided value must be an instance of an HTMLElement');
}
/**
 * Returns a list of directives extracted from the given view based on the
 * provided list of directive index values.
 *
 * @param {?} nodeIndex The node index
 * @param {?} lViewData The target view data
 * @param {?} includeComponents Whether or not to include components in returned directives
 * @return {?}
 */
export function discoverDirectives(nodeIndex, lViewData, includeComponents) {
    /** @type {?} */
    const tNode = /** @type {?} */ (lViewData[TVIEW].data[nodeIndex]);
    /** @type {?} */
    let directiveStartIndex = getDirectiveStartIndex(tNode);
    /** @type {?} */
    const directiveEndIndex = getDirectiveEndIndex(tNode, directiveStartIndex);
    if (!includeComponents && tNode.flags & 4096 /* isComponent */)
        directiveStartIndex++;
    return lViewData.slice(directiveStartIndex, directiveEndIndex);
}
/**
 * Returns a map of local references (local reference name => element or directive instance) that
 * exist on a given element.
 * @param {?} lViewData
 * @param {?} nodeIndex
 * @return {?}
 */
export function discoverLocalRefs(lViewData, nodeIndex) {
    /** @type {?} */
    const tNode = /** @type {?} */ (lViewData[TVIEW].data[nodeIndex]);
    if (tNode && tNode.localNames) {
        /** @type {?} */
        const result = {};
        for (let i = 0; i < tNode.localNames.length; i += 2) {
            /** @type {?} */
            const localRefName = tNode.localNames[i];
            /** @type {?} */
            const directiveIndex = /** @type {?} */ (tNode.localNames[i + 1]);
            result[localRefName] =
                directiveIndex === -1 ? /** @type {?} */ ((getNativeByTNode(tNode, lViewData))) : lViewData[directiveIndex];
        }
        return result;
    }
    return null;
}
/**
 * @param {?} tNode
 * @return {?}
 */
function getDirectiveStartIndex(tNode) {
    // the tNode instances store a flag value which then has a
    // pointer which tells the starting index of where all the
    // active directives are in the master directive array
    return tNode.flags >> 15 /* DirectiveStartingIndexShift */;
}
/**
 * @param {?} tNode
 * @param {?} startIndex
 * @return {?}
 */
function getDirectiveEndIndex(tNode, startIndex) {
    /** @type {?} */
    const count = tNode.flags & 4095 /* DirectiveCountMask */;
    return count ? (startIndex + count) : -1;
}
//# sourceMappingURL=context_discovery.js.map