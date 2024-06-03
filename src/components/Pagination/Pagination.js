/* eslint-disable no-shadow */
import React, {
    useEffect,
    useRef,
    useState
} from 'react';
import PropTypes from 'prop-types';
import Pagination from 'reactstrap/lib/Pagination';
import PaginationItem from 'reactstrap/lib/PaginationItem';
import PaginationLink from 'reactstrap/lib/PaginationLink';
import classNames from 'classnames';

import min from 'lodash/min';
import toNumber from 'lodash/toNumber';
import get from 'lodash/get';

const Index = ({
    currentPages,
    onSelect,
    maxPaginationNumbers,
    currentActivePage,
    firstPageText,
    previousPageText,
    nextPageText,
    lastPageText,
    selectedPage
}) => {
    const [activePage, setActivePage] = useState(currentActivePage);
    const [firstPaginationNumber, setFirstPaginationNumber] = useState(1);

    const prevActivePage = useRef();

    const getLastPaginationNumber = () => {
        const minNumberPages = min(
            [
                currentPages,
                maxPaginationNumbers
            ]
        );
        return firstPaginationNumber + minNumberPages;
    };

    const handlePaginationNumber = activePage => {
        const distance = Math.floor(maxPaginationNumbers / 2);
        const newFPNumber = activePage - distance;
        const newLPNumber = activePage + distance;

        if (newFPNumber < distance) {
            if (firstPaginationNumber !== 1) {
                setFirstPaginationNumber(1);
            }
        } else if (newLPNumber < currentPages) {
            setFirstPaginationNumber(newFPNumber);
        } else if (newLPNumber > currentPages) {
            setFirstPaginationNumber(currentPages - maxPaginationNumbers + 1);
        }
    };

    const handleClick = e => {
        e.preventDefault();
        let newActivePage = parseInt(
            // eslint-disable-next-line lodash/prefer-lodash-method
            e.currentTarget
                .getAttribute('id')
                .split('pagebutton')
                .pop(),
            10
        );
        if (newActivePage === -1) { newActivePage = 1; }
        prevActivePage.current = activePage;
        setActivePage(newActivePage);
        handlePaginationNumber(newActivePage);
        onSelect(newActivePage);
    };

    const numberedPagItem = (i, isNotMobile) => (
        <PaginationItem
            className="border-0"
            key={`pagebutton${i - 1}`}
            id={`pagebutton${i - 1}`}
            active={activePage === (i - 1)}
            onClick={e => handleClick(e)}
        >
            <PaginationLink
                className={classNames('border-0 ml-0', {'page-link-mobile': !isNotMobile})}
            >
                {i - 1}
            </PaginationLink>
        </PaginationItem>
    );

    const handleSelectNextOrPrevious = (e, direction) => {
        e.preventDefault();
        const newActivePage = direction === 'r' ? activePage + 1 : activePage - 1;
        prevActivePage.current = activePage;
        setActivePage(newActivePage);
        handlePaginationNumber(newActivePage);
        onSelect(newActivePage);
    };

    const nextOrPreviousPagItem = (name, page, direction, isNotMobile) => {
        const disabled = name === previousPageText
            ? activePage === page
            : activePage >= page;
        return (
            <PaginationItem
                className={classNames('border-0', {'my-auto': isNotMobile})}
                key={name}
                disabled={disabled}
                onClick={e => !disabled && handleSelectNextOrPrevious(e, direction)}
            >
                <PaginationLink className={classNames('border-0', {'my-auto': isNotMobile})}>
                    {name}
                </PaginationLink>
            </PaginationItem>
        );
    };

    const firstOrLastPagItem = (name, page, isNotMobile) => {
        let disabled = false;
        if (name === firstPageText) {
            disabled = activePage === page;
        } else if (name === lastPageText) {
            disabled = activePage === page;
        }
        return (
            <PaginationItem
                key={name}
                disabled={disabled}
                id={`pagebutton${page}`}
                onClick={event => !disabled && handleClick(event)}
                className={classNames('border-0', {'my-auto': isNotMobile})}
            >
                <PaginationLink className={classNames('border-0', {'my-auto': isNotMobile})}>
                    {name}
                </PaginationLink>
            </PaginationItem>
        );
    };

    const paginationItems = () => {
        const items = [];
        const isNotMobile = true;
        const lastPaginationNumber = getLastPaginationNumber();
        items.push(firstOrLastPagItem(firstPageText, 1, isNotMobile));
        items.push(nextOrPreviousPagItem(previousPageText, 1, 'l', isNotMobile));
        for (
            let i = firstPaginationNumber + 1;
            i <= lastPaginationNumber;
            // eslint-disable-next-line no-plusplus
            i++
        ) {
            items.push(numberedPagItem(i, isNotMobile));
        }
        items.push(nextOrPreviousPagItem(nextPageText, currentPages, 'r', isNotMobile));
        items.push(firstOrLastPagItem(lastPageText, currentPages, isNotMobile));
        return items;
    };

    useEffect(() => {
        let newActivePage = toNumber(selectedPage) + 1;
        if (newActivePage === -1) { newActivePage = 1; }
        prevActivePage.current = newActivePage;
        setActivePage(newActivePage);
        handlePaginationNumber(newActivePage);
    });

    useEffect(() => {
        if (get(prevActivePage, 'current') && activePage !== get(prevActivePage, 'current')) {
            handlePaginationNumber(activePage);
        }
    }, [activePage, prevActivePage]);

    return (
        <Pagination
            color="primary"
            className="border-0 d-flex align-items-center justify-content-center p-0"
        >
            {paginationItems()}
        </Pagination>
    );
};

Index.propTypes = {
    currentPages: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
    maxPaginationNumbers: PropTypes.number,
    currentActivePage: PropTypes.number,
    firstPageText: PropTypes.string,
    previousPageText: PropTypes.string,
    nextPageText: PropTypes.string,
    lastPageText: PropTypes.string,
    selectedPage: PropTypes.number.isRequired
};

Index.defaultProps = {
    maxPaginationNumbers: 5,
    currentActivePage: 1,
    firstPageText: '<<',
    previousPageText: '<',
    nextPageText: '>',
    lastPageText: '>>'
};

export default Index;
