import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import {searchInArray} from '@helpers';
import has from 'lodash/has';
import Types from '../types';

const {
    FETCH_PRODUCTS_SUCCEEDED,
    CLEAR_PRODUCT_FORM,
    SET_PRODUCT_PAGE,
    SET_PRODUCT_FILTERS,
    SORT_PRODUCT_LIST
} = Types;

const initialState = {
    documents: [],
    total: 0,
    selectedPage: 0,
    pageSize: 15,
    maxPaginationNumbers: 9,
    sortParams: {}
};

const List = (state = initialState, {type, ...props}) => {
    switch (type) {
        case FETCH_PRODUCTS_SUCCEEDED: {
            return {
                ...state,
                ...props
            };
        }
        case CLEAR_PRODUCT_FORM: {
            return {
                ...state,
                filtersApply: {
                    status: null,
                    roles: null,
                    term: ''
                }
            };
        }
        case SET_PRODUCT_PAGE: {
            return {
                ...state,
                selectedPage: get(props, 'nextPage')
            };
        }
        case SET_PRODUCT_FILTERS: {
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

        case SORT_PRODUCT_LIST: {
            const sortedResult = orderBy(get(state, 'documents'), get(props, 'headersToSort.key'), get(props, 'headersToSort.sort'));
            return {
                ...state,
                documents: sortedResult
            };
        }
        default:
            return state;
    }
};

export default List;
