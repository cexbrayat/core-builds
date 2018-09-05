/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Component, Directive, NgModule, Pipe, ɵReflectionCapabilities as ReflectionCapabilities } from '@angular/core';
import { MetadataOverrider } from './metadata_overrider';
var reflection = new ReflectionCapabilities();
/**
 * Allows to override ivy metadata for tests (via the `TestBed`).
 */
var OverrideResolver = /** @class */ (function () {
    function OverrideResolver() {
        this.overrides = new Map();
        this.resolved = new Map();
    }
    OverrideResolver.prototype.setOverrides = function (overrides) {
        var _this = this;
        this.overrides.clear();
        overrides.forEach(function (_a) {
            var type = _a[0], override = _a[1];
            return _this.overrides.set(type, override);
        });
    };
    OverrideResolver.prototype.getAnnotation = function (type) {
        var _this = this;
        return reflection.annotations(type).find(function (a) { return a instanceof _this.type; }) || null;
    };
    OverrideResolver.prototype.resolve = function (type) {
        var resolved = this.resolved.get(type) || null;
        if (!resolved) {
            resolved = this.getAnnotation(type);
            if (resolved) {
                var override = this.overrides.get(type);
                if (override) {
                    var overrider = new MetadataOverrider();
                    resolved = overrider.overrideMetadata(this.type, resolved, override);
                }
            }
            this.resolved.set(type, resolved);
        }
        return resolved;
    };
    return OverrideResolver;
}());
var DirectiveResolver = /** @class */ (function (_super) {
    tslib_1.__extends(DirectiveResolver, _super);
    function DirectiveResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DirectiveResolver.prototype, "type", {
        get: function () { return Directive; },
        enumerable: true,
        configurable: true
    });
    return DirectiveResolver;
}(OverrideResolver));
export { DirectiveResolver };
var ComponentResolver = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentResolver, _super);
    function ComponentResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ComponentResolver.prototype, "type", {
        get: function () { return Component; },
        enumerable: true,
        configurable: true
    });
    return ComponentResolver;
}(OverrideResolver));
export { ComponentResolver };
var PipeResolver = /** @class */ (function (_super) {
    tslib_1.__extends(PipeResolver, _super);
    function PipeResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PipeResolver.prototype, "type", {
        get: function () { return Pipe; },
        enumerable: true,
        configurable: true
    });
    return PipeResolver;
}(OverrideResolver));
export { PipeResolver };
var NgModuleResolver = /** @class */ (function (_super) {
    tslib_1.__extends(NgModuleResolver, _super);
    function NgModuleResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NgModuleResolver.prototype, "type", {
        get: function () { return NgModule; },
        enumerable: true,
        configurable: true
    });
    return NgModuleResolver;
}(OverrideResolver));
export { NgModuleResolver };
//# sourceMappingURL=resolvers.js.map