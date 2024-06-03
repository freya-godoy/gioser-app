import {Types} from '../common/crud';

const crudTypes = new Types('order');

export const ADD_PRODUCT_TO_BASKET = 'ADD_PRODUCT_TO_BASKET';
export const DELETE_PRODUCT_TO_BASKET = 'DELETE_PRODUCT_TO_BASKET';
export const CLEAR_BASKET = 'CLEAR_BASKET';
export const UPDATE_SINGLE_QUANTITY = 'UPDATE_SINGLE_QUANTITY';

export default {
    ADD_PRODUCT_TO_BASKET,
    DELETE_PRODUCT_TO_BASKET,
    CLEAR_BASKET,
    UPDATE_SINGLE_QUANTITY,
    ...crudTypes
};
