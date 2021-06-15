import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const productsReducer = (products = [], action) => {
    if (action.type === 'PRODUCT_ADDED') {
        if (products.find(product => product.id === action.payload.product.id)) {
            return products;
        }

        return [...products, action.payload.product];
    }

    if (action.type === 'PRODUCT_REMOVED') {
        return products.filter(product => product.id !== action.payload.product.id);
    }

    return products;
};

export default combineReducers({
    products: productsReducer,
    form: formReducer
});