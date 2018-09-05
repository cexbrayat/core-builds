/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, Directive, NgModule, Pipe, ɵReflectionCapabilities as ReflectionCapabilities } from '@angular/core';
import { MetadataOverrider } from './metadata_overrider';
const reflection = new ReflectionCapabilities();
/**
 * Allows to override ivy metadata for tests (via the `TestBed`).
 */
class OverrideResolver {
    constructor() {
        this.overrides = new Map();
        this.resolved = new Map();
    }
    setOverrides(overrides) {
        this.overrides.clear();
        overrides.forEach(([type, override]) => this.overrides.set(type, override));
    }
    getAnnotation(type) {
        return reflection.annotations(type).find(a => a instanceof this.type) || null;
    }
    resolve(type) {
        let resolved = this.resolved.get(type) || null;
        if (!resolved) {
            resolved = this.getAnnotation(type);
            if (resolved) {
                const override = this.overrides.get(type);
                if (override) {
                    const overrider = new MetadataOverrider();
                    resolved = overrider.overrideMetadata(this.type, resolved, override);
                }
            }
            this.resolved.set(type, resolved);
        }
        return resolved;
    }
}
export class DirectiveResolver extends OverrideResolver {
    get type() { return Directive; }
}
export class ComponentResolver extends OverrideResolver {
    get type() { return Component; }
}
export class PipeResolver extends OverrideResolver {
    get type() { return Pipe; }
}
export class NgModuleResolver extends OverrideResolver {
    get type() { return NgModule; }
}
//# sourceMappingURL=resolvers.js.map