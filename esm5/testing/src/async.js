/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { asyncFallback } from './async_fallback';
/**
 * Wraps a test function in an asynchronous test zone. The test will automatically
 * complete when all asynchronous calls within this zone are done. Can be used
 * to wrap an {@link inject} call.
 *
 * Example:
 *
 * ```
 * it('...', async(inject([AClass], (object) => {
 *   object.doSomething.then(() => {
 *     expect(...);
 *   })
 * });
 * ```
 *
 *
 */
export function async(fn) {
    var _Zone = typeof Zone !== 'undefined' ? Zone : null;
    if (!_Zone) {
        return function () {
            return Promise.reject('Zone is needed for the async() test helper but could not be found. ' +
                'Please make sure that your environment includes zone.js/dist/zone.js');
        };
    }
    var asyncTest = _Zone && _Zone[_Zone.__symbol__('asyncTest')];
    if (typeof asyncTest === 'function') {
        return asyncTest(fn);
    }
    // not using new version of zone.js
    // TODO @JiaLiPassion, remove this after all library updated to
    // newest version of zone.js(0.8.25)
    return asyncFallback(fn);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3Rlc3Rpbmcvc3JjL2FzeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUUvQzs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sVUFBVSxLQUFLLENBQUMsRUFBWTtJQUNoQyxJQUFNLEtBQUssR0FBUSxPQUFPLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzdELElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixPQUFPO1lBQ0wsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUNqQixxRUFBcUU7Z0JBQ3JFLHNFQUFzRSxDQUFDLENBQUM7UUFDOUUsQ0FBQyxDQUFDO0tBQ0g7SUFDRCxJQUFNLFNBQVMsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNoRSxJQUFJLE9BQU8sU0FBUyxLQUFLLFVBQVUsRUFBRTtRQUNuQyxPQUFPLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN0QjtJQUNELG1DQUFtQztJQUNuQywrREFBK0Q7SUFDL0Qsb0NBQW9DO0lBQ3BDLE9BQU8sYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7YXN5bmNGYWxsYmFja30gZnJvbSAnLi9hc3luY19mYWxsYmFjayc7XG5cbi8qKlxuICogV3JhcHMgYSB0ZXN0IGZ1bmN0aW9uIGluIGFuIGFzeW5jaHJvbm91cyB0ZXN0IHpvbmUuIFRoZSB0ZXN0IHdpbGwgYXV0b21hdGljYWxseVxuICogY29tcGxldGUgd2hlbiBhbGwgYXN5bmNocm9ub3VzIGNhbGxzIHdpdGhpbiB0aGlzIHpvbmUgYXJlIGRvbmUuIENhbiBiZSB1c2VkXG4gKiB0byB3cmFwIGFuIHtAbGluayBpbmplY3R9IGNhbGwuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIGl0KCcuLi4nLCBhc3luYyhpbmplY3QoW0FDbGFzc10sIChvYmplY3QpID0+IHtcbiAqICAgb2JqZWN0LmRvU29tZXRoaW5nLnRoZW4oKCkgPT4ge1xuICogICAgIGV4cGVjdCguLi4pO1xuICogICB9KVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXN5bmMoZm46IEZ1bmN0aW9uKTogKGRvbmU6IGFueSkgPT4gYW55IHtcbiAgY29uc3QgX1pvbmU6IGFueSA9IHR5cGVvZiBab25lICE9PSAndW5kZWZpbmVkJyA/IFpvbmUgOiBudWxsO1xuICBpZiAoIV9ab25lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICAgICdab25lIGlzIG5lZWRlZCBmb3IgdGhlIGFzeW5jKCkgdGVzdCBoZWxwZXIgYnV0IGNvdWxkIG5vdCBiZSBmb3VuZC4gJyArXG4gICAgICAgICAgJ1BsZWFzZSBtYWtlIHN1cmUgdGhhdCB5b3VyIGVudmlyb25tZW50IGluY2x1ZGVzIHpvbmUuanMvZGlzdC96b25lLmpzJyk7XG4gICAgfTtcbiAgfVxuICBjb25zdCBhc3luY1Rlc3QgPSBfWm9uZSAmJiBfWm9uZVtfWm9uZS5fX3N5bWJvbF9fKCdhc3luY1Rlc3QnKV07XG4gIGlmICh0eXBlb2YgYXN5bmNUZXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGFzeW5jVGVzdChmbik7XG4gIH1cbiAgLy8gbm90IHVzaW5nIG5ldyB2ZXJzaW9uIG9mIHpvbmUuanNcbiAgLy8gVE9ETyBASmlhTGlQYXNzaW9uLCByZW1vdmUgdGhpcyBhZnRlciBhbGwgbGlicmFyeSB1cGRhdGVkIHRvXG4gIC8vIG5ld2VzdCB2ZXJzaW9uIG9mIHpvbmUuanMoMC44LjI1KVxuICByZXR1cm4gYXN5bmNGYWxsYmFjayhmbik7XG59Il19