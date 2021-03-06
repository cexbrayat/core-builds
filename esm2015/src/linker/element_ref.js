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
import { R3_ELEMENT_REF_FACTORY } from '../ivy_switch/runtime/index';
/**
 * A wrapper around a native element inside of a View.
 *
 * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
 * element.
 *
 * \@security Permitting direct access to the DOM can make your application more vulnerable to
 * XSS attacks. Carefully review any use of `ElementRef` in your code. For more detail, see the
 * [Security Guide](http://g.co/ng/security).
 *
 *
 * @template T
 */
export class ElementRef {
    /**
     * @param {?} nativeElement
     */
    constructor(nativeElement) { this.nativeElement = nativeElement; }
}
/**
 * \@internal
 */
ElementRef.__NG_ELEMENT_ID__ = () => R3_ELEMENT_REF_FACTORY(ElementRef);
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    ElementRef.__NG_ELEMENT_ID__;
    /**
     * The underlying native element or `null` if direct access to native elements is not supported
     * (e.g. when the application runs in a web worker).
     *
     * <div class="callout is-critical">
     *   <header>Use with caution</header>
     *   <p>
     *    Use this API as the last resort when direct access to DOM is needed. Use templating and
     *    data-binding provided by Angular instead. Alternatively you can take a look at {\@link
     * Renderer2}
     *    which provides API that can safely be used even when direct access to native elements is not
     *    supported.
     *   </p>
     *   <p>
     *    Relying on direct DOM access creates tight coupling between your application and rendering
     *    layers which will make it impossible to separate the two and deploy your application into a
     *    web worker.
     *   </p>
     * </div>
     *
     * @type {?}
     */
    ElementRef.prototype.nativeElement;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudF9yZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9saW5rZXIvZWxlbWVudF9yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFpQm5FLE1BQU0sT0FBTyxVQUFVOzs7O0lBd0JyQixZQUFZLGFBQWdCLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUMsRUFBRTs7Ozs7QUFHckUsK0JBQTZDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1IzX0VMRU1FTlRfUkVGX0ZBQ1RPUll9IGZyb20gJy4uL2l2eV9zd2l0Y2gvcnVudGltZS9pbmRleCc7XG5cbi8qKlxuICogQSB3cmFwcGVyIGFyb3VuZCBhIG5hdGl2ZSBlbGVtZW50IGluc2lkZSBvZiBhIFZpZXcuXG4gKlxuICogQW4gYEVsZW1lbnRSZWZgIGlzIGJhY2tlZCBieSBhIHJlbmRlci1zcGVjaWZpYyBlbGVtZW50LiBJbiB0aGUgYnJvd3NlciwgdGhpcyBpcyB1c3VhbGx5IGEgRE9NXG4gKiBlbGVtZW50LlxuICpcbiAqIEBzZWN1cml0eSBQZXJtaXR0aW5nIGRpcmVjdCBhY2Nlc3MgdG8gdGhlIERPTSBjYW4gbWFrZSB5b3VyIGFwcGxpY2F0aW9uIG1vcmUgdnVsbmVyYWJsZSB0b1xuICogWFNTIGF0dGFja3MuIENhcmVmdWxseSByZXZpZXcgYW55IHVzZSBvZiBgRWxlbWVudFJlZmAgaW4geW91ciBjb2RlLiBGb3IgbW9yZSBkZXRhaWwsIHNlZSB0aGVcbiAqIFtTZWN1cml0eSBHdWlkZV0oaHR0cDovL2cuY28vbmcvc2VjdXJpdHkpLlxuICpcbiAqXG4gKi9cbi8vIE5vdGU6IFdlIGRvbid0IGV4cG9zZSB0aGluZ3MgbGlrZSBgSW5qZWN0b3JgLCBgVmlld0NvbnRhaW5lcmAsIC4uLiBoZXJlLFxuLy8gaS5lLiB1c2VycyBoYXZlIHRvIGFzayBmb3Igd2hhdCB0aGV5IG5lZWQuIFdpdGggdGhhdCwgd2UgY2FuIGJ1aWxkIGJldHRlciBhbmFseXNpcyB0b29sc1xuLy8gYW5kIGNvdWxkIGRvIGJldHRlciBjb2RlZ2VuIGluIHRoZSBmdXR1cmUuXG5leHBvcnQgY2xhc3MgRWxlbWVudFJlZjxUID0gYW55PiB7XG4gIC8qKlxuICAgKiBUaGUgdW5kZXJseWluZyBuYXRpdmUgZWxlbWVudCBvciBgbnVsbGAgaWYgZGlyZWN0IGFjY2VzcyB0byBuYXRpdmUgZWxlbWVudHMgaXMgbm90IHN1cHBvcnRlZFxuICAgKiAoZS5nLiB3aGVuIHRoZSBhcHBsaWNhdGlvbiBydW5zIGluIGEgd2ViIHdvcmtlcikuXG4gICAqXG4gICAqIDxkaXYgY2xhc3M9XCJjYWxsb3V0IGlzLWNyaXRpY2FsXCI+XG4gICAqICAgPGhlYWRlcj5Vc2Ugd2l0aCBjYXV0aW9uPC9oZWFkZXI+XG4gICAqICAgPHA+XG4gICAqICAgIFVzZSB0aGlzIEFQSSBhcyB0aGUgbGFzdCByZXNvcnQgd2hlbiBkaXJlY3QgYWNjZXNzIHRvIERPTSBpcyBuZWVkZWQuIFVzZSB0ZW1wbGF0aW5nIGFuZFxuICAgKiAgICBkYXRhLWJpbmRpbmcgcHJvdmlkZWQgYnkgQW5ndWxhciBpbnN0ZWFkLiBBbHRlcm5hdGl2ZWx5IHlvdSBjYW4gdGFrZSBhIGxvb2sgYXQge0BsaW5rXG4gICAqIFJlbmRlcmVyMn1cbiAgICogICAgd2hpY2ggcHJvdmlkZXMgQVBJIHRoYXQgY2FuIHNhZmVseSBiZSB1c2VkIGV2ZW4gd2hlbiBkaXJlY3QgYWNjZXNzIHRvIG5hdGl2ZSBlbGVtZW50cyBpcyBub3RcbiAgICogICAgc3VwcG9ydGVkLlxuICAgKiAgIDwvcD5cbiAgICogICA8cD5cbiAgICogICAgUmVseWluZyBvbiBkaXJlY3QgRE9NIGFjY2VzcyBjcmVhdGVzIHRpZ2h0IGNvdXBsaW5nIGJldHdlZW4geW91ciBhcHBsaWNhdGlvbiBhbmQgcmVuZGVyaW5nXG4gICAqICAgIGxheWVycyB3aGljaCB3aWxsIG1ha2UgaXQgaW1wb3NzaWJsZSB0byBzZXBhcmF0ZSB0aGUgdHdvIGFuZCBkZXBsb3kgeW91ciBhcHBsaWNhdGlvbiBpbnRvIGFcbiAgICogICAgd2ViIHdvcmtlci5cbiAgICogICA8L3A+XG4gICAqIDwvZGl2PlxuICAgKlxuICAgKi9cbiAgcHVibGljIG5hdGl2ZUVsZW1lbnQ6IFQ7XG5cbiAgY29uc3RydWN0b3IobmF0aXZlRWxlbWVudDogVCkgeyB0aGlzLm5hdGl2ZUVsZW1lbnQgPSBuYXRpdmVFbGVtZW50OyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBzdGF0aWMgX19OR19FTEVNRU5UX0lEX186ICgpID0+IEVsZW1lbnRSZWYgPSAoKSA9PiBSM19FTEVNRU5UX1JFRl9GQUNUT1JZKEVsZW1lbnRSZWYpO1xufVxuIl19