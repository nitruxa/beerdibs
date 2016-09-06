import cache from 'cache-headers';
import deepFreeze from 'deep-freeze';
const { headerTypes } = cache;

export default deepFreeze({
    defaults: {
        [headerTypes.browser.varName]:  cache.TEN_MINUTES,
        [headerTypes.cdn.varName]: cache.ONE_WEEK,
        [headerTypes.staleRevalidate.varName]: cache.TEN_MINUTES,
        [headerTypes.staleError.varName]: cache.ONE_WEEK
    },
    development: {
        [headerTypes.browser.varName]: 10
    }
});
