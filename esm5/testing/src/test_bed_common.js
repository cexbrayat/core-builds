/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
/**
 * An abstract class for inserting the root test component element in a platform independent way.
 *
 * @experimental
 */
var TestComponentRenderer = /** @class */ (function () {
    function TestComponentRenderer() {
    }
    TestComponentRenderer.prototype.insertRootElement = function (rootElementId) { };
    return TestComponentRenderer;
}());
export { TestComponentRenderer };
/**
 * @experimental
 */
export var ComponentFixtureAutoDetect = new InjectionToken('ComponentFixtureAutoDetect');
/**
 * @experimental
 */
export var ComponentFixtureNoNgZone = new InjectionToken('ComponentFixtureNoNgZone');
//# sourceMappingURL=test_bed_common.js.map