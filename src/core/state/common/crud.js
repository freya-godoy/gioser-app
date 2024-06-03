/* eslint-disable max-classes-per-file */
import cloneDeep from 'lodash/cloneDeep';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import hasIn from 'lodash/hasIn';
import includes from 'lodash/includes';
import lowerFirst from 'lodash/lowerFirst';
import replace from 'lodash/replace';
import set from 'lodash/set';
import snakeCase from 'lodash/snakeCase';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';
import toUpper from 'lodash/toUpper';
import values from 'lodash/values';

const upperSnake = type => toUpper(snakeCase(type));

class Types {
    constructor(entity) {
        set(this, `FETCH_${upperSnake(entity)}S_REQUESTED`, `FETCH_${upperSnake(entity)}S_REQUESTED`);
        set(this, `FETCH_${upperSnake(entity)}S_SUCCEEDED`, `FETCH_${upperSnake(entity)}S_SUCCEEDED`);
        set(this, `FETCH_${upperSnake(entity)}_REQUESTED`, `FETCH_${upperSnake(entity)}_REQUESTED`);
        set(this, `FETCH_${upperSnake(entity)}_SUCCEEDED`, `FETCH_${upperSnake(entity)}_SUCCEEDED`);
        set(this, `FETCH_${upperSnake(entity)}S_BY_TERM_REQUESTED`, `FETCH_${upperSnake(entity)}S_BY_TERM_REQUESTED`);
        set(this, `FETCH_${upperSnake(entity)}S_BY_TERM_SUCCEEDED`, `FETCH_${upperSnake(entity)}S_BY_TERM_SUCCEEDED`);
        set(this, `SUBMIT_${upperSnake(entity)}_REQUESTED`, `SUBMIT_${upperSnake(entity)}_REQUESTED`);
        set(this, `DELETE_${upperSnake(entity)}_REQUESTED`, `DELETE_${upperSnake(entity)}_REQUESTED`);
        set(this, `DELETE_${upperSnake(entity)}_SUCCEEDED`, `DELETE_${upperSnake(entity)}_SUCCEEDED`);
        set(this, `CLEAR_${upperSnake(entity)}_FORM`, `CLEAR_${upperSnake(entity)}_FORM`);
        set(this, `CLEAR_${upperSnake(entity)}_FILTERS`, `CLEAR_${upperSnake(entity)}_FILTERS`);
        set(this, `UPDATE_${upperSnake(entity)}_FORM`, `UPDATE_${upperSnake(entity)}_FORM`);
        set(this, `SORT_${upperSnake(entity)}_LIST`, `SORT_${upperSnake(entity)}_LIST`);
        set(this, `SET_${upperSnake(entity)}_PAGE`, `SET_${upperSnake(entity)}_PAGE`);
        set(this, `SET_${upperSnake(entity)}_PAGE_SIZE`, `SET_${upperSnake(entity)}_PAGE_SIZE`);
        set(this, `SET_${upperSnake(entity)}_FILTERS`, `SET_${upperSnake(entity)}_FILTERS`);
        set(this, `FILTER_${upperSnake(entity)}_LIST`, `FILTER_${upperSnake(entity)}_LIST`);
        set(this, `SUBMIT_${upperSnake(entity)}_UICOMP_REQUESTED`, `SUBMIT_${upperSnake(entity)}_UI_COMP_REQUESTED`);
        set(this, `SUBMIT_${upperSnake(entity)}_UICOMP_SUCCEEDED`, `SUBMIT_${upperSnake(entity)}_UI_COMP_SUCCEEDED`);
        set(this, `FETCH_${upperSnake(entity)}_CSV_DOWNLOAD_REQUESTED`, `FETCH_${upperSnake(entity)}_CSV_DOWNLOAD_REQUESTED`);
        set(this, `FETCH_${upperSnake(entity)}S_CSV_DOWNLOAD_REQUESTED`, `FETCH_${upperSnake(entity)}S_CSV_DOWNLOAD_REQUESTED`);
    }

    static get(type) {
        return this[type];
    }
}

/**
 * Class Actions based on entity name. it will transformed from camelCase to UPPER snake case
 * @example myCoolState to MY_COOL_STATE
 * @class
 * @constructor
 * @public
 */
class Actions {
    constructor(entity) {
        const crudTypes = new Types(entity);
        forEach(values(crudTypes), type => {
            const name = replace(lowerFirst(startCase(toLower(type))), /\s/g, '');
            if (includes(type, `FETCH_${upperSnake(entity)}_REQUESTED`) || includes(type, 'DELETE')) {
                set(this, name, id => ({
                    type, id
                }));
            } else if (includes([`FETCH_${upperSnake(entity)}S_REQUESTED`, `FETCH_${upperSnake(entity)}S_BY_TERM_REQUESTED`], type)) {
                set(this, name, filters => ({
                    type, filters
                }));
            } else {
                set(this, name, props => ({
                    type, ...(hasIn(props, 'type') ? {form: props} : props)
                }));
            }
        });
    }
    /**
     * @name Actions#fetch{entity}Requested
     * @function
     * @memberof A
     * @description Return the FETCH_{upperSnake(entity)]S_REQUESTED
     * @param {Number} N - The number of times to print.
     */
}

/**
 * @param {String} name
 * @param {Object} initialState
 * @param {Function} handledSate
 *
 * return {ReduxReducer} a react reducer switch based on crud types.
 */
const Reducers = (entity, initialState, handledSate) => {
    const entityNameUpper = upperSnake(entity);
    return (state = cloneDeep(initialState), {type, ...props}) => {
        switch (type) {
            case `FETCH_${entityNameUpper}S_SUCCEEDED`:
            case `FETCH_${entityNameUpper}S_BY_TERM_SUCCEEDED`:
                return {
                    ...state,
                    list: {
                        ...get(initialState, 'list', {}),
                        ...props
                    }
                };
            case `FETCH_${entityNameUpper}_SUCCEEDED`:
            case `UPDATE_${entityNameUpper}_FORM`:
                return {
                    ...state,
                    form: {...get(props, 'form', props)}
                };
            case `CLEAR_${entityNameUpper}_FORM`:
                return {
                    ...state,
                    form: cloneDeep(get(initialState, 'form', {}))
                };
            case `FETCH_${entityNameUpper}S_BY_TERM_REQUESTED`:
            case `SET_${entityNameUpper}_PAGE`:
            case `SET_${entityNameUpper}_PAGE_SIZE`:
            case `SET_${entityNameUpper}_FILTERS`:
                return {
                    ...state,
                    filters: {
                        ...get(initialState, 'filters', {}),
                        ...get(props, 'filters', props)
                    }
                };
            case `CLEAR_${entityNameUpper}_FILTERS`:
                return {
                    ...state,
                    filters: cloneDeep(get(initialState, 'filters', {}))
                };
            default:
                if (handledSate) {
                    return handledSate(state, {
                        type, ...props
                    });
                }
                return state;
        }
    };
};

export {
    Actions,
    Types,
    Reducers
};
