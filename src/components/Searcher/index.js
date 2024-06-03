import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Form,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import {MdSearch} from 'react-icons/md';

import get from 'lodash/get';

const Searcher = ({
    onSearch,
    i18n,
    setFilter,
    values,
    withoutTitle,
    autoFocus
}) => {
    const handleChange = event => {
        event.preventDefault();
        const {value} = event.target;
        setFilter(value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSearch(values);
    };

    return (
        <Form onSubmit={handleSubmit} className="pr-2 pl-2">
            {!withoutTitle && (<h4 className="title-primary-hover">{get(i18n, 'searcher')}</h4>)}
            <InputGroup className="d-flex align-items-center">
                <Input
                    name="name"
                    value={get(values, 'term')}
                    placeholder={get(i18n, 'searcherPlaceHolder', 'search...')}
                    onChange={handleChange}
                    autoFocus={autoFocus}
                />
                <InputGroupAddon addonType="append">
                    <Button
                        color="primary"
                        className="searcher-button"
                        type="submit"
                    >
                        <MdSearch
                            size="1.5em"
                        />
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        </Form>
    );
};

Searcher.propTypes = {
    onSearch: PropTypes.func.isRequired,
    i18n: PropTypes.shape({}).isRequired,
    setFilter: PropTypes.func.isRequired,
    values: PropTypes.shape({}).isRequired,
    withoutTitle: PropTypes.shape({}).isRequired,
    autoFocus: PropTypes.bool
};

Searcher.defaultProps = {autoFocus: false};

export default Searcher;
