import {Actions} from '../common/crud';
import {DELETE_PRODUCT_TO_BASKET, ADD_PRODUCT_TO_BASKET, CLEAR_BASKET} from './types';

const orderActions = new Actions('order');

export const addProductToBasket = payload => ({
    type: ADD_PRODUCT_TO_BASKET,
    ...payload
});

export const deleteProductToBasket = payload => ({
    type: DELETE_PRODUCT_TO_BASKET, ...payload
});

export const clearProductBasket = payload => ({
    type: CLEAR_BASKET, ...payload
});

export default {
    ...orderActions
};
