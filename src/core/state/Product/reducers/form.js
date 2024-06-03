import Types from '../types';

const {
    FETCH_PRODUCT_SUCCEEDED,
    CLEAR_PRODUCT_FORM,
    UPDATE_PRODUCT_FORM
} = Types;

const initialState = {
    name: '',
    description: '',
    category: '',
    status: 'active'
};

// eslint-disable-next-line default-param-last
const Form = (state = initialState, {type, ...props}) => {
    switch (type) {
        case CLEAR_PRODUCT_FORM: {
            return {
                name: '',
                description: '',
                category: '',
                status: 'active'
            };
        }
        case UPDATE_PRODUCT_FORM: {
            return {
                ...state,
                ...props.form
            };
        }
        case FETCH_PRODUCT_SUCCEEDED: {
            return {
                ...state,
                ...props.form
            };
        }
        default:
            return state;
    }
};

export default Form;
