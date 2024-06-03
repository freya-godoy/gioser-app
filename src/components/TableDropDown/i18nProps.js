import PropTypes from 'prop-types';

export default {
    i18n: PropTypes.shape({
        sortBy: PropTypes.string.isRequired,
        resultSetTitle: PropTypes.string.isRequired
    }).isRequired
};
