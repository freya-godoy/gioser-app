import sumBy from 'lodash/sumBy';
import Types from '../types';

const {
    FETCH_ORDER_SUCCEEDED,
    CLEAR_ORDER_FORM,
    UPDATE_ORDER_FORM
} = Types;

const initialState = {
    detail: '',
    price: 0,
    status: 'pending',
    numberId: 0,
    userId: 99,
    total: 0
};

// eslint-disable-next-line default-param-last
const Form = (state = initialState, {type, ...props}) => {
    switch (type) {
        case CLEAR_ORDER_FORM: {
            return {
                detail: '',
                price: 0,
                status: 'pending',
                numberId: 0,
                total: 0
            };
        }
        case UPDATE_ORDER_FORM: {
            // eslint-disable-next-line lodash/prop-shorthand
            const total = sumBy(props.products, 'price');
            return {
                ...state,
                ...props,
                total
            };
        }
        case FETCH_ORDER_SUCCEEDED: {
            return {
                ...state,
                ...props
            };
        }
        default:
            return state;
    }
};

export default Form;
