import 'mobx-react-lite/batchingForReactNative'
import user from './user'
import payment from './payment'
import money from './money'
import common from './common'
import food from "./food";

/**
 * Combine all stores
 */

export default {
    user,
    payment,
    common,
    money,
    food
};
