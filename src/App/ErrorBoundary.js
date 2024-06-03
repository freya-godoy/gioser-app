import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import logger from '@helpers/logger';

import ErrorPage from '@components/ErrorPage';

class ErrorBoundary extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        if (error) {
            if (process.env.NODE_ENV === 'production') {
                setTimeout(() => { window.location = '/'; }, 3500);
            }
            return {hasError: true};
        }
        if (!error) {
            return {hasError: false};
        }
        return null;
    }

    componentDidCatch(error, info) {
        logger.error(error);
        logger.error(info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <main>
                    <ErrorPage/>
                </main>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {children: PropTypes.elementType.isRequired};

export default ErrorBoundary;
