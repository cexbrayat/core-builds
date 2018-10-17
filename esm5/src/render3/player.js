/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { getContext } from './context_discovery';
import { scheduleTick } from './instructions';
import { CorePlayerHandler } from './styling/core_player_handler';
import { getOrCreatePlayerContext } from './styling/util';
import { getRootContext } from './util';
/**
 * @param {?} ref
 * @param {?} player
 * @return {?}
 */
export function addPlayer(ref, player) {
    /** @type {?} */
    var elementContext = /** @type {?} */ ((getContext(ref)));
    /** @type {?} */
    var animationContext = /** @type {?} */ ((getOrCreatePlayerContext(elementContext.native, elementContext)));
    animationContext.push(player);
    player.addEventListener(200 /* Destroyed */, function () {
        /** @type {?} */
        var index = animationContext.indexOf(player);
        if (index >= 0) {
            animationContext.splice(index, 1);
        }
        player.destroy();
    });
    /** @type {?} */
    var rootContext = getRootContext(elementContext.lViewData);
    /** @type {?} */
    var playerHandler = rootContext.playerHandler || (rootContext.playerHandler = new CorePlayerHandler());
    playerHandler.queuePlayer(player, ref);
    /** @type {?} */
    var nothingScheduled = rootContext.flags === 0 /* Empty */;
    // change detection may or may not happen therefore
    // the core code needs to be kicked off to flush the animations
    rootContext.flags |= 2 /* FlushPlayers */;
    if (nothingScheduled) {
        scheduleTick(rootContext);
    }
}
/**
 * @param {?} ref
 * @return {?}
 */
export function getPlayers(ref) {
    return getOrCreatePlayerContext(ref);
}
//# sourceMappingURL=player.js.map