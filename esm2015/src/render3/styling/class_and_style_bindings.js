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
import { RendererStyleFlags3, isProceduralRenderer } from '../interfaces/renderer';
import { EMPTY_ARR, EMPTY_OBJ, createEmptyStylingContext } from './util';
/**
 * Creates a styling context template where styling information is stored.
 * Any styles that are later referenced using `updateStyleProp` must be
 * passed in within this function. Initial values for those styles are to
 * be declared after all initial style properties are declared (this change in
 * mode between declarations and initial styles is made possible using a special
 * enum value found in `definition.ts`).
 *
 * @param {?=} initialClassDeclarations a list of class declarations and initial class values
 *    that are used later within the styling context.
 *
 *    -> ['foo', 'bar', SPECIAL_ENUM_VAL, 'foo', true]
 *       This implies that `foo` and `bar` will be later styled and that the `foo`
 *       class will be applied to the element as an initial class since it's true
 * @param {?=} initialStyleDeclarations a list of style declarations and initial style values
 *    that are used later within the styling context.
 *
 *    -> ['width', 'height', SPECIAL_ENUM_VAL, 'width', '100px']
 *       This implies that `width` and `height` will be later styled and that the `width`
 *       property has an initial value of `100px`.
 *
 * @param {?=} styleSanitizer
 * @return {?}
 */
export function createStylingContextTemplate(initialClassDeclarations, initialStyleDeclarations, styleSanitizer) {
    /** @type {?} */
    const initialStylingValues = [null];
    /** @type {?} */
    const context = createEmptyStylingContext(null, styleSanitizer, initialStylingValues);
    /** @type {?} */
    const stylesLookup = {};
    /** @type {?} */
    const classesLookup = {};
    /** @type {?} */
    let totalStyleDeclarations = 0;
    if (initialStyleDeclarations) {
        /** @type {?} */
        let hasPassedDeclarations = false;
        for (let i = 0; i < initialStyleDeclarations.length; i++) {
            /** @type {?} */
            const v = /** @type {?} */ (initialStyleDeclarations[i]);
            // this flag value marks where the declarations end the initial values begin
            if (v === 1 /* VALUES_MODE */) {
                hasPassedDeclarations = true;
            }
            else {
                /** @type {?} */
                const prop = /** @type {?} */ (v);
                if (hasPassedDeclarations) {
                    /** @type {?} */
                    const value = /** @type {?} */ (initialStyleDeclarations[++i]);
                    initialStylingValues.push(value);
                    stylesLookup[prop] = initialStylingValues.length - 1;
                }
                else {
                    totalStyleDeclarations++;
                    stylesLookup[prop] = 0;
                }
            }
        }
    }
    // make where the class offsets begin
    context[4 /* ClassOffsetPosition */] = totalStyleDeclarations;
    if (initialClassDeclarations) {
        /** @type {?} */
        let hasPassedDeclarations = false;
        for (let i = 0; i < initialClassDeclarations.length; i++) {
            /** @type {?} */
            const v = /** @type {?} */ (initialClassDeclarations[i]);
            // this flag value marks where the declarations end the initial values begin
            if (v === 1 /* VALUES_MODE */) {
                hasPassedDeclarations = true;
            }
            else {
                /** @type {?} */
                const className = /** @type {?} */ (v);
                if (hasPassedDeclarations) {
                    /** @type {?} */
                    const value = /** @type {?} */ (initialClassDeclarations[++i]);
                    initialStylingValues.push(value);
                    classesLookup[className] = initialStylingValues.length - 1;
                }
                else {
                    classesLookup[className] = 0;
                }
            }
        }
    }
    /** @type {?} */
    const styleProps = Object.keys(stylesLookup);
    /** @type {?} */
    const classNames = Object.keys(classesLookup);
    /** @type {?} */
    const classNamesIndexStart = styleProps.length;
    /** @type {?} */
    const totalProps = styleProps.length + classNames.length;
    /** @type {?} */
    const maxLength = totalProps * 3 /* Size */ * 2 + 8 /* SingleStylesStartPosition */;
    // we need to fill the array from the start so that we can access
    // both the multi and the single array positions in the same loop block
    for (let i = 8 /* SingleStylesStartPosition */; i < maxLength; i++) {
        context.push(null);
    }
    /** @type {?} */
    const singleStart = 8 /* SingleStylesStartPosition */;
    /** @type {?} */
    const multiStart = totalProps * 3 /* Size */ + 8 /* SingleStylesStartPosition */;
    // fill single and multi-level styles
    for (let i = 0; i < totalProps; i++) {
        /** @type {?} */
        const isClassBased = i >= classNamesIndexStart;
        /** @type {?} */
        const prop = isClassBased ? classNames[i - classNamesIndexStart] : styleProps[i];
        /** @type {?} */
        const indexForInitial = isClassBased ? classesLookup[prop] : stylesLookup[prop];
        /** @type {?} */
        const initialValue = initialStylingValues[indexForInitial];
        /** @type {?} */
        const indexForMulti = i * 3 /* Size */ + multiStart;
        /** @type {?} */
        const indexForSingle = i * 3 /* Size */ + singleStart;
        /** @type {?} */
        const initialFlag = prepareInitialFlag(prop, isClassBased, styleSanitizer || null);
        setFlag(context, indexForSingle, pointers(initialFlag, indexForInitial, indexForMulti));
        setProp(context, indexForSingle, prop);
        setValue(context, indexForSingle, null);
        /** @type {?} */
        const flagForMulti = initialFlag | (initialValue !== null ? 1 /* Dirty */ : 0 /* None */);
        setFlag(context, indexForMulti, pointers(flagForMulti, indexForInitial, indexForSingle));
        setProp(context, indexForMulti, prop);
        setValue(context, indexForMulti, null);
    }
    // there is no initial value flag for the master index since it doesn't
    // reference an initial style value
    setFlag(context, 3 /* MasterFlagPosition */, pointers(0, 0, multiStart));
    setContextDirty(context, initialStylingValues.length > 1);
    return context;
}
/**
 * Sets and resolves all `multi` styling on an `StylingContext` so that they can be
 * applied to the element once `renderStyling` is called.
 *
 * All missing styles/class (any values that are not provided in the new `styles`
 * or `classes` params) will resolve to `null` within their respective positions
 * in the context.
 *
 * @param {?} context The styling context that will be updated with the
 *    newly provided style values.
 * @param {?} classes The key/value map of CSS class names that will be used for the update.
 * @param {?=} styles The key/value map of CSS styles that will be used for the update.
 * @return {?}
 */
export function updateStylingMap(context, classes, styles) {
    styles = styles || null;
    /** @type {?} */
    const ignoreAllClassUpdates = classes === context[6 /* PreviousMultiClassValue */];
    /** @type {?} */
    const ignoreAllStyleUpdates = styles === context[7 /* PreviousMultiStyleValue */];
    if (ignoreAllClassUpdates && ignoreAllStyleUpdates)
        return;
    /** @type {?} */
    let classNames = EMPTY_ARR;
    /** @type {?} */
    let applyAllClasses = false;
    // each time a string-based value pops up then it shouldn't require a deep
    // check of what's changed.
    if (!ignoreAllClassUpdates) {
        context[6 /* PreviousMultiClassValue */] = classes;
        if (typeof classes == 'string') {
            classNames = classes.split(/\s+/);
            // this boolean is used to avoid having to create a key/value map of `true` values
            // since a classname string implies that all those classes are added
            applyAllClasses = true;
        }
        else {
            classNames = classes ? Object.keys(classes) : EMPTY_ARR;
        }
    }
    classes = /** @type {?} */ ((classes || EMPTY_OBJ));
    if (!ignoreAllStyleUpdates) {
        context[7 /* PreviousMultiStyleValue */] = styles;
    }
    /** @type {?} */
    const styleProps = styles ? Object.keys(styles) : EMPTY_ARR;
    styles = styles || EMPTY_OBJ;
    /** @type {?} */
    const classesStartIndex = styleProps.length;
    /** @type {?} */
    const multiStartIndex = getMultiStartIndex(context);
    /** @type {?} */
    let dirty = false;
    /** @type {?} */
    let ctxIndex = multiStartIndex;
    /** @type {?} */
    let propIndex = 0;
    /** @type {?} */
    const propLimit = styleProps.length + classNames.length;
    // the main loop here will try and figure out how the shape of the provided
    // styles differ with respect to the context. Later if the context/styles/classes
    // are off-balance then they will be dealt in another loop after this one
    while (ctxIndex < context.length && propIndex < propLimit) {
        /** @type {?} */
        const isClassBased = propIndex >= classesStartIndex;
        /** @type {?} */
        const processValue = (!isClassBased && !ignoreAllStyleUpdates) || (isClassBased && !ignoreAllClassUpdates);
        // when there is a cache-hit for a string-based class then we should
        // avoid doing any work diffing any of the changes
        if (processValue) {
            /** @type {?} */
            const adjustedPropIndex = isClassBased ? propIndex - classesStartIndex : propIndex;
            /** @type {?} */
            const newProp = isClassBased ? classNames[adjustedPropIndex] : styleProps[adjustedPropIndex];
            /** @type {?} */
            const newValue = isClassBased ? (applyAllClasses ? true : classes[newProp]) : styles[newProp];
            /** @type {?} */
            const prop = getProp(context, ctxIndex);
            if (prop === newProp) {
                /** @type {?} */
                const value = getValue(context, ctxIndex);
                /** @type {?} */
                const flag = getPointers(context, ctxIndex);
                if (hasValueChanged(flag, value, newValue)) {
                    setValue(context, ctxIndex, newValue);
                    /** @type {?} */
                    const initialValue = getInitialValue(context, flag);
                    // there is no point in setting this to dirty if the previously
                    // rendered value was being referenced by the initial style (or null)
                    if (hasValueChanged(flag, initialValue, newValue)) {
                        setDirty(context, ctxIndex, true);
                        dirty = true;
                    }
                }
            }
            else {
                /** @type {?} */
                const indexOfEntry = findEntryPositionByProp(context, newProp, ctxIndex);
                if (indexOfEntry > 0) {
                    /** @type {?} */
                    const valueToCompare = getValue(context, indexOfEntry);
                    /** @type {?} */
                    const flagToCompare = getPointers(context, indexOfEntry);
                    swapMultiContextEntries(context, ctxIndex, indexOfEntry);
                    if (hasValueChanged(flagToCompare, valueToCompare, newValue)) {
                        /** @type {?} */
                        const initialValue = getInitialValue(context, flagToCompare);
                        setValue(context, ctxIndex, newValue);
                        if (hasValueChanged(flagToCompare, initialValue, newValue)) {
                            setDirty(context, ctxIndex, true);
                            dirty = true;
                        }
                    }
                }
                else {
                    /** @type {?} */
                    const newFlag = prepareInitialFlag(newProp, isClassBased, getStyleSanitizer(context));
                    insertNewMultiProperty(context, ctxIndex, isClassBased, newProp, newFlag, newValue);
                    dirty = true;
                }
            }
        }
        ctxIndex += 3 /* Size */;
        propIndex++;
    }
    // this means that there are left-over values in the context that
    // were not included in the provided styles/classes and in this
    // case the  goal is to "remove" them from the context (by nullifying)
    while (ctxIndex < context.length) {
        /** @type {?} */
        const flag = getPointers(context, ctxIndex);
        /** @type {?} */
        const isClassBased = (flag & 2 /* Class */) === 2 /* Class */;
        /** @type {?} */
        const processValue = (!isClassBased && !ignoreAllStyleUpdates) || (isClassBased && !ignoreAllClassUpdates);
        if (processValue) {
            /** @type {?} */
            const value = getValue(context, ctxIndex);
            /** @type {?} */
            const doRemoveValue = valueExists(value, isClassBased);
            if (doRemoveValue) {
                setDirty(context, ctxIndex, true);
                setValue(context, ctxIndex, null);
                dirty = true;
            }
        }
        ctxIndex += 3 /* Size */;
    }
    /** @type {?} */
    const sanitizer = getStyleSanitizer(context);
    while (propIndex < propLimit) {
        /** @type {?} */
        const isClassBased = propIndex >= classesStartIndex;
        /** @type {?} */
        const processValue = (!isClassBased && !ignoreAllStyleUpdates) || (isClassBased && !ignoreAllClassUpdates);
        if (processValue) {
            /** @type {?} */
            const adjustedPropIndex = isClassBased ? propIndex - classesStartIndex : propIndex;
            /** @type {?} */
            const prop = isClassBased ? classNames[adjustedPropIndex] : styleProps[adjustedPropIndex];
            /** @type {?} */
            const value = isClassBased ? (applyAllClasses ? true : classes[prop]) : styles[prop];
            /** @type {?} */
            const flag = prepareInitialFlag(prop, isClassBased, sanitizer) | 1 /* Dirty */;
            context.push(flag, prop, value);
            dirty = true;
        }
        propIndex++;
    }
    if (dirty) {
        setContextDirty(context, true);
    }
}
/**
 * Sets and resolves a single styling property/value on the provided `StylingContext` so
 * that they can be applied to the element once `renderStyling` is called.
 *
 * Note that prop-level styling values are considered higher priority than any styling that
 * has been applied using `updateStylingMap`, therefore, when styling values are rendered
 * then any styles/classes that have been applied using this function will be considered first
 * (then multi values second and then initial values as a backup).
 *
 * @param {?} context The styling context that will be updated with the
 *    newly provided style value.
 * @param {?} index The index of the property which is being updated.
 * @param {?} value The CSS style value that will be assigned
 * @return {?}
 */
export function updateStyleProp(context, index, value) {
    /** @type {?} */
    const singleIndex = 8 /* SingleStylesStartPosition */ + index * 3 /* Size */;
    /** @type {?} */
    const currValue = getValue(context, singleIndex);
    /** @type {?} */
    const currFlag = getPointers(context, singleIndex);
    // didn't change ... nothing to make a note of
    if (hasValueChanged(currFlag, currValue, value)) {
        // the value will always get updated (even if the dirty flag is skipped)
        setValue(context, singleIndex, value);
        /** @type {?} */
        const indexForMulti = getMultiOrSingleIndex(currFlag);
        /** @type {?} */
        const valueForMulti = getValue(context, indexForMulti);
        if (!valueForMulti || hasValueChanged(currFlag, valueForMulti, value)) {
            /** @type {?} */
            let multiDirty = false;
            /** @type {?} */
            let singleDirty = true;
            /** @type {?} */
            const isClassBased = (currFlag & 2 /* Class */) === 2 /* Class */;
            // only when the value is set to `null` should the multi-value get flagged
            if (!valueExists(value, isClassBased) && valueExists(valueForMulti, isClassBased)) {
                multiDirty = true;
                singleDirty = false;
            }
            setDirty(context, indexForMulti, multiDirty);
            setDirty(context, singleIndex, singleDirty);
            setContextDirty(context, true);
        }
    }
}
/**
 * This method will toggle the referenced CSS class (by the provided index)
 * within the given context.
 *
 * @param {?} context The styling context that will be updated with the
 *    newly provided class value.
 * @param {?} index The index of the CSS class which is being updated.
 * @param {?} addOrRemove Whether or not to add or remove the CSS class
 * @return {?}
 */
export function updateClassProp(context, index, addOrRemove) {
    /** @type {?} */
    const adjustedIndex = index + context[4 /* ClassOffsetPosition */];
    updateStyleProp(context, adjustedIndex, addOrRemove);
}
/**
 * Renders all queued styling using a renderer onto the given element.
 *
 * This function works by rendering any styles (that have been applied
 * using `updateStylingMap`) and any classes (that have been applied using
 * `updateStyleProp`) onto the provided element using the provided renderer.
 * Just before the styles/classes are rendered a final key/value style map
 * will be assembled (if `styleStore` or `classStore` are provided).
 *
 * @param {?} context The styling context that will be used to determine
 *      what styles will be rendered
 * @param {?} renderer the renderer that will be used to apply the styling
 * @param {?=} styleStore if provided, the updated style values will be applied
 *    to this key/value map instead of being renderered via the renderer.
 * @param {?=} classStore if provided, the updated class values will be applied
 *    to this key/value map instead of being renderered via the renderer.
 * @return {?}
 */
export function renderStyling(context, renderer, styleStore, classStore) {
    if (isContextDirty(context)) {
        /** @type {?} */
        const native = /** @type {?} */ ((context[5 /* ElementPosition */]));
        /** @type {?} */
        const multiStartIndex = getMultiStartIndex(context);
        /** @type {?} */
        const styleSanitizer = getStyleSanitizer(context);
        for (let i = 8 /* SingleStylesStartPosition */; i < context.length; i += 3 /* Size */) {
            // there is no point in rendering styles that have not changed on screen
            if (isDirty(context, i)) {
                /** @type {?} */
                const prop = getProp(context, i);
                /** @type {?} */
                const value = getValue(context, i);
                /** @type {?} */
                const flag = getPointers(context, i);
                /** @type {?} */
                const isClassBased = flag & 2 /* Class */ ? true : false;
                /** @type {?} */
                const isInSingleRegion = i < multiStartIndex;
                /** @type {?} */
                let valueToApply = value;
                // VALUE DEFER CASE 1: Use a multi value instead of a null single value
                // this check implies that a single value was removed and we
                // should now defer to a multi value and use that (if set).
                if (isInSingleRegion && !valueExists(valueToApply, isClassBased)) {
                    /** @type {?} */
                    const multiIndex = getMultiOrSingleIndex(flag);
                    valueToApply = getValue(context, multiIndex);
                }
                // VALUE DEFER CASE 2: Use the initial value if all else fails (is falsy)
                // the initial value will always be a string or null,
                // therefore we can safely adopt it incase there's nothing else
                // note that this should always be a falsy check since `false` is used
                // for both class and style comparisons (styles can't be false and false
                // classes are turned off and should therefore defer to their initial values)
                if (!valueExists(valueToApply, isClassBased)) {
                    valueToApply = getInitialValue(context, flag);
                }
                if (isClassBased) {
                    setClass(native, prop, valueToApply ? true : false, renderer, classStore);
                }
                else {
                    /** @type {?} */
                    const sanitizer = (flag & 4 /* Sanitize */) ? styleSanitizer : null;
                    setStyle(native, prop, /** @type {?} */ (valueToApply), renderer, sanitizer, styleStore);
                }
                setDirty(context, i, false);
            }
        }
        setContextDirty(context, false);
    }
}
/**
 * This function renders a given CSS prop/value entry using the
 * provided renderer. If a `store` value is provided then
 * that will be used a render context instead of the provided
 * renderer.
 *
 * @param {?} native the DOM Element
 * @param {?} prop the CSS style property that will be rendered
 * @param {?} value the CSS style value that will be rendered
 * @param {?} renderer
 * @param {?} sanitizer
 * @param {?=} store an optional key/value map that will be used as a context to render styles on
 * @return {?}
 */
function setStyle(native, prop, value, renderer, sanitizer, store) {
    value = sanitizer && value ? sanitizer(prop, value) : value;
    if (store) {
        store[prop] = value;
    }
    else if (value) {
        ngDevMode && ngDevMode.rendererSetStyle++;
        isProceduralRenderer(renderer) ?
            renderer.setStyle(native, prop, value, RendererStyleFlags3.DashCase) :
            native['style'].setProperty(prop, value);
    }
    else {
        ngDevMode && ngDevMode.rendererRemoveStyle++;
        isProceduralRenderer(renderer) ?
            renderer.removeStyle(native, prop, RendererStyleFlags3.DashCase) :
            native['style'].removeProperty(prop);
    }
}
/**
 * This function renders a given CSS class value using the provided
 * renderer (by adding or removing it from the provided element).
 * If a `store` value is provided then that will be used a render
 * context instead of the provided renderer.
 *
 * @param {?} native the DOM Element
 * @param {?} className
 * @param {?} add
 * @param {?} renderer
 * @param {?=} store an optional key/value map that will be used as a context to render styles on
 * @return {?}
 */
function setClass(native, className, add, renderer, store) {
    if (store) {
        store[className] = add;
    }
    else if (add) {
        ngDevMode && ngDevMode.rendererAddClass++;
        isProceduralRenderer(renderer) ? renderer.addClass(native, className) :
            native['classList'].add(className);
    }
    else {
        ngDevMode && ngDevMode.rendererRemoveClass++;
        isProceduralRenderer(renderer) ? renderer.removeClass(native, className) :
            native['classList'].remove(className);
    }
}
/**
 * @param {?} context
 * @param {?} index
 * @param {?} isDirtyYes
 * @return {?}
 */
function setDirty(context, index, isDirtyYes) {
    /** @type {?} */
    const adjustedIndex = index >= 8 /* SingleStylesStartPosition */ ? (index + 0 /* FlagsOffset */) : index;
    if (isDirtyYes) {
        (/** @type {?} */ (context[adjustedIndex])) |= 1 /* Dirty */;
    }
    else {
        (/** @type {?} */ (context[adjustedIndex])) &= ~1 /* Dirty */;
    }
}
/**
 * @param {?} context
 * @param {?} index
 * @return {?}
 */
function isDirty(context, index) {
    /** @type {?} */
    const adjustedIndex = index >= 8 /* SingleStylesStartPosition */ ? (index + 0 /* FlagsOffset */) : index;
    return ((/** @type {?} */ (context[adjustedIndex])) & 1 /* Dirty */) == 1 /* Dirty */;
}
/**
 * @param {?} context
 * @param {?} index
 * @return {?}
 */
function isClassBased(context, index) {
    /** @type {?} */
    const adjustedIndex = index >= 8 /* SingleStylesStartPosition */ ? (index + 0 /* FlagsOffset */) : index;
    return ((/** @type {?} */ (context[adjustedIndex])) & 2 /* Class */) == 2 /* Class */;
}
/**
 * @param {?} context
 * @param {?} index
 * @return {?}
 */
function isSanitizable(context, index) {
    /** @type {?} */
    const adjustedIndex = index >= 8 /* SingleStylesStartPosition */ ? (index + 0 /* FlagsOffset */) : index;
    return ((/** @type {?} */ (context[adjustedIndex])) & 4 /* Sanitize */) == 4 /* Sanitize */;
}
/**
 * @param {?} configFlag
 * @param {?} staticIndex
 * @param {?} dynamicIndex
 * @return {?}
 */
function pointers(configFlag, staticIndex, dynamicIndex) {
    return (configFlag & 7 /* BitMask */) | (staticIndex << 3 /* BitCountSize */) |
        (dynamicIndex << (14 /* BitCountSize */ + 3 /* BitCountSize */));
}
/**
 * @param {?} context
 * @param {?} flag
 * @return {?}
 */
function getInitialValue(context, flag) {
    /** @type {?} */
    const index = getInitialIndex(flag);
    return /** @type {?} */ (context[2 /* InitialStylesPosition */][index]);
}
/**
 * @param {?} flag
 * @return {?}
 */
function getInitialIndex(flag) {
    return (flag >> 3 /* BitCountSize */) & 16383 /* BitMask */;
}
/**
 * @param {?} flag
 * @return {?}
 */
function getMultiOrSingleIndex(flag) {
    /** @type {?} */
    const index = (flag >> (14 /* BitCountSize */ + 3 /* BitCountSize */)) & 16383 /* BitMask */;
    return index >= 8 /* SingleStylesStartPosition */ ? index : -1;
}
/**
 * @param {?} context
 * @return {?}
 */
function getMultiStartIndex(context) {
    return /** @type {?} */ (getMultiOrSingleIndex(context[3 /* MasterFlagPosition */]));
}
/**
 * @param {?} context
 * @return {?}
 */
function getStyleSanitizer(context) {
    return context[1 /* StyleSanitizerPosition */];
}
/**
 * @param {?} context
 * @param {?} index
 * @param {?} prop
 * @return {?}
 */
function setProp(context, index, prop) {
    context[index + 1 /* PropertyOffset */] = prop;
}
/**
 * @param {?} context
 * @param {?} index
 * @param {?} value
 * @return {?}
 */
function setValue(context, index, value) {
    context[index + 2 /* ValueOffset */] = value;
}
/**
 * @param {?} context
 * @param {?} index
 * @param {?} flag
 * @return {?}
 */
function setFlag(context, index, flag) {
    /** @type {?} */
    const adjustedIndex = index === 3 /* MasterFlagPosition */ ? index : (index + 0 /* FlagsOffset */);
    context[adjustedIndex] = flag;
}
/**
 * @param {?} context
 * @param {?} index
 * @return {?}
 */
function getPointers(context, index) {
    /** @type {?} */
    const adjustedIndex = index === 3 /* MasterFlagPosition */ ? index : (index + 0 /* FlagsOffset */);
    return /** @type {?} */ (context[adjustedIndex]);
}
/**
 * @param {?} context
 * @param {?} index
 * @return {?}
 */
function getValue(context, index) {
    return /** @type {?} */ (context[index + 2 /* ValueOffset */]);
}
/**
 * @param {?} context
 * @param {?} index
 * @return {?}
 */
function getProp(context, index) {
    return /** @type {?} */ (context[index + 1 /* PropertyOffset */]);
}
/**
 * @param {?} context
 * @return {?}
 */
export function isContextDirty(context) {
    return isDirty(context, 3 /* MasterFlagPosition */);
}
/**
 * @param {?} context
 * @param {?} isDirtyYes
 * @return {?}
 */
export function setContextDirty(context, isDirtyYes) {
    setDirty(context, 3 /* MasterFlagPosition */, isDirtyYes);
}
/**
 * @param {?} context
 * @param {?} prop
 * @param {?=} startIndex
 * @return {?}
 */
function findEntryPositionByProp(context, prop, startIndex) {
    for (let i = (startIndex || 0) + 1 /* PropertyOffset */; i < context.length; i += 3 /* Size */) {
        /** @type {?} */
        const thisProp = context[i];
        if (thisProp == prop) {
            return i - 1 /* PropertyOffset */;
        }
    }
    return -1;
}
/**
 * @param {?} context
 * @param {?} indexA
 * @param {?} indexB
 * @return {?}
 */
function swapMultiContextEntries(context, indexA, indexB) {
    /** @type {?} */
    const tmpValue = getValue(context, indexA);
    /** @type {?} */
    const tmpProp = getProp(context, indexA);
    /** @type {?} */
    const tmpFlag = getPointers(context, indexA);
    /** @type {?} */
    let flagA = tmpFlag;
    /** @type {?} */
    let flagB = getPointers(context, indexB);
    /** @type {?} */
    const singleIndexA = getMultiOrSingleIndex(flagA);
    if (singleIndexA >= 0) {
        /** @type {?} */
        const _flag = getPointers(context, singleIndexA);
        /** @type {?} */
        const _initial = getInitialIndex(_flag);
        setFlag(context, singleIndexA, pointers(_flag, _initial, indexB));
    }
    /** @type {?} */
    const singleIndexB = getMultiOrSingleIndex(flagB);
    if (singleIndexB >= 0) {
        /** @type {?} */
        const _flag = getPointers(context, singleIndexB);
        /** @type {?} */
        const _initial = getInitialIndex(_flag);
        setFlag(context, singleIndexB, pointers(_flag, _initial, indexA));
    }
    setValue(context, indexA, getValue(context, indexB));
    setProp(context, indexA, getProp(context, indexB));
    setFlag(context, indexA, getPointers(context, indexB));
    setValue(context, indexB, tmpValue);
    setProp(context, indexB, tmpProp);
    setFlag(context, indexB, tmpFlag);
}
/**
 * @param {?} context
 * @param {?} indexStartPosition
 * @return {?}
 */
function updateSinglePointerValues(context, indexStartPosition) {
    for (let i = indexStartPosition; i < context.length; i += 3 /* Size */) {
        /** @type {?} */
        const multiFlag = getPointers(context, i);
        /** @type {?} */
        const singleIndex = getMultiOrSingleIndex(multiFlag);
        if (singleIndex > 0) {
            /** @type {?} */
            const singleFlag = getPointers(context, singleIndex);
            /** @type {?} */
            const initialIndexForSingle = getInitialIndex(singleFlag);
            /** @type {?} */
            const flagValue = (isDirty(context, singleIndex) ? 1 /* Dirty */ : 0 /* None */) |
                (isClassBased(context, singleIndex) ? 2 /* Class */ : 0 /* None */) |
                (isSanitizable(context, singleIndex) ? 4 /* Sanitize */ : 0 /* None */);
            /** @type {?} */
            const updatedFlag = pointers(flagValue, initialIndexForSingle, i);
            setFlag(context, singleIndex, updatedFlag);
        }
    }
}
/**
 * @param {?} context
 * @param {?} index
 * @param {?} classBased
 * @param {?} name
 * @param {?} flag
 * @param {?} value
 * @return {?}
 */
function insertNewMultiProperty(context, index, classBased, name, flag, value) {
    /** @type {?} */
    const doShift = index < context.length;
    // prop does not exist in the list, add it in
    context.splice(index, 0, flag | 1 /* Dirty */ | (classBased ? 2 /* Class */ : 0 /* None */), name, value);
    if (doShift) {
        // because the value was inserted midway into the array then we
        // need to update all the shifted multi values' single value
        // pointers to point to the newly shifted location
        updateSinglePointerValues(context, index + 3 /* Size */);
    }
}
/**
 * @param {?} value
 * @param {?=} isClassBased
 * @return {?}
 */
function valueExists(value, isClassBased) {
    if (isClassBased) {
        return value ? true : false;
    }
    return value !== null;
}
/**
 * @param {?} name
 * @param {?} isClassBased
 * @param {?=} sanitizer
 * @return {?}
 */
function prepareInitialFlag(name, isClassBased, sanitizer) {
    if (isClassBased) {
        return 2 /* Class */;
    }
    else if (sanitizer && sanitizer(name)) {
        return 4 /* Sanitize */;
    }
    return 0 /* None */;
}
/**
 * @param {?} flag
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function hasValueChanged(flag, a, b) {
    /** @type {?} */
    const isClassBased = flag & 2 /* Class */;
    /** @type {?} */
    const hasValues = a && b;
    /** @type {?} */
    const usesSanitizer = flag & 4 /* Sanitize */;
    // the toString() comparison ensures that a value is checked
    // ... otherwise (during sanitization bypassing) the === comparsion
    // would fail since a new String() instance is created
    if (!isClassBased && hasValues && usesSanitizer) {
        // we know for sure we're dealing with strings at this point
        return (/** @type {?} */ (a)).toString() !== (/** @type {?} */ (b)).toString();
    }
    // everything else is safe to check with a normal equality check
    return a !== b;
}
//# sourceMappingURL=class_and_style_bindings.js.map