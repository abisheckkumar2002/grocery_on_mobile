
import { combineReducers } from 'redux'
import fetchcartReducer from './fetchcart';
import homeproductsReducer from './homeproducts'
import categoryproductsReducer from './categoriesfilter'
import searchReducer from './search'
import similarproReducer from './similarpro';
import wishlistReducer from './wishlist'
const rootReducer = combineReducers({
    cart:fetchcartReducer,
    homeproducts:homeproductsReducer,
    categoryproducts:categoryproductsReducer,
    search:searchReducer,
    similarpro:similarproReducer,
    wishlist:wishlistReducer
})
export default rootReducer;