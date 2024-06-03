import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import {searchInArray} from '@helpers';
import has from 'lodash/has';
import cloneDeep from 'lodash/cloneDeep';
import assignIn from 'lodash/assignIn';

import Types, {ADD_PRODUCT_TO_BASKET, DELETE_PRODUCT_TO_BASKET, CLEAR_BASKET} from '../types';

const {
    FETCH_ORDERS_SUCCEEDED,
    CLEAR_ORDER_FORM,
    SET_ORDER_PAGE,
    SET_ORDER_FILTERS,
    SORT_ORDER_LIST
} = Types;

const initialState = {
    documents: [],
    total: 0,
    selectedPage: 0,
    pageSize: 15,
    maxPaginationNumbers: 9,
    basket: {

    },
    mount: 0,
    numberId: 0,
    quantity: 0
};

// eslint-disable-next-line default-param-last
const List = (state = initialState, {type, ...props}) => {
    switch (type) {
        case FETCH_ORDERS_SUCCEEDED: {
            return {
                ...state,
                ...props
            };
        }
        case CLEAR_ORDER_FORM: {
            return {
                ...state,
                basket: {

                },
                mount: 0,
                numberId: 0,
                quantity: 0
            };
        }
        case SET_ORDER_PAGE: {
            return {
                ...state,
                selectedPage: get(props, 'nextPage')
            };
        }
        case SET_ORDER_FILTERS: {
            if (has(props, 'status')) {
                const searched = searchInArray(state.status, props.status);
                if (!searched && searched !== 0) {
                    state.status.push(props.status);
                } else {
                    state.status.splice(searched, 1);
                }
            }
            if (has(props, 'roles')) {
                const searched = searchInArray(state.roles, props.roles);
                if (!searched && searched !== 0) {
                    state.roles.push(props.roles);
                } else {
                    state.roles.splice(searched, 1);
                }
            }
            return {
                ...state,
                filtersApply: {
                    ...state.filtersApply, ...props
                }
            };
        }

        case SORT_ORDER_LIST: {
            const sortedResult = orderBy(get(state, 'documents'), get(props, 'headersToSort.key'), get(props, 'headersToSort.sort'));
            return {
                ...state,
                documents: sortedResult
            };
        }
        case ADD_PRODUCT_TO_BASKET: {
            if (props.basket) {
                return {
                    ...state,
                    quantity: props.quantity,
                    mount: props.mount,
                    basket: props.basket
                };
            }
            const currentProduct = get(state, `basket.${props.product?._id}`);
            if (currentProduct) {
                assignIn(props, {
                    product: {
                        ...props.product,
                        quantity: currentProduct.quantity + 1
                    }
                });
            } else {
                assignIn(props, {
                    product: {
                        ...props.product,
                        quantity: 1
                    }
                });
            }
            return {
                ...state,
                quantity: state.quantity + 1,
                mount: props.product.price + state.mount,
                basket: {
                    ...state.basket,
                    [props.product._id]: props.product
                }
            };
        }
        case DELETE_PRODUCT_TO_BASKET: {
            const basket = cloneDeep(state.basket);
            const id = props.product._id;
            const currentProduct = get(state, `basket.${id}`);
            if (props.allProducts) {
                delete basket[id];
                return {
                    ...state,
                    quantity: state.quantity - currentProduct.quantity,
                    mount: state.mount - (currentProduct.quantity * currentProduct.price),
                    basket
                };
            }
            if (currentProduct.quantity === 1) {
                delete basket[id];
                return {
                    ...state,
                    quantity: state.quantity - 1,
                    mount: state.mount - props.product.price,
                    basket
                };
            }
            assignIn(currentProduct, {
                quantity: currentProduct.quantity - 1
            });

            return {
                ...state,
                quantity: state.quantity - 1,
                mount: state.mount - props.product.price,
                basket: {
                    ...state.basket,
                    [id]: {
                        ...props.product,
                        quantity: currentProduct.quantity
                    }
                }
            };
        }
        case CLEAR_BASKET: {
            return {
                ...state,
                quantity: 0,
                mount: 0,
                basket: {

                }
            };
        }
        default:
            return state;
    }
};

export default List;
