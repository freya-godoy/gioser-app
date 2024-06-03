/* eslint-disable no-nested-ternary */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Nav,
    NavItem,
    NavLink,
    Label,
    Button,
    Collapse
} from 'reactstrap';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

import get from 'lodash/get';
import map from 'lodash/map';
import noop from 'lodash/noop';
import replace from 'lodash/replace';
import some from 'lodash/some';
import toNumber from 'lodash/toNumber';
import uniqueId from 'lodash/uniqueId';

const renderItem = (navItem, it, current) => (
    <Button
        key={uniqueId('verticalNavBar')}
        active={
            (current) ? (
                navItem.to
                    ? current === navItem.to
                    : toNumber(current) === toNumber(it)
            ) : false
        }
        onClick={() => (navItem.onClick ? navItem.onClick(navItem.to || it, navItem) : noop)}
        className={classNames(
            'border-top border-dark like-button position-relative',
            {
                'd-flex justify-content-stretch align-items-center': it > 100
            }
        )}
        tag={NavItem}
        disabled={get(navItem, 'disabled')}
        aria-label={`${it}-${current}`}
    >
        {it > 100 && (
            <SubdirectoryArrowRightIcon
                className="ml-4"
                color="warning"
                style={{
                    color: 'var(--body-1)'
                }}
            />
        )}
        {navItem.to ? (
            <NavLink
                className={classNames(
                    'stretched-link',
                    {
                        'not-allowed': get(navItem, 'disabled')
                    }
                )}
                tag={Link}
                to={navItem.to}
            >
                {navItem.label}
            </NavLink>
        ) : (
            <NavLink
                className={classNames(
                    'stretched-link',
                    {
                        'not-allowed': get(navItem, 'disabled')
                    }
                )}
            >
                {navItem.label}
            </NavLink>
        )}
    </Button>
);

const loopItems = (items, current, parent) => map(items, ({children, ...props}, it) => {
    if (!children) {
        return renderItem(props, parent ? parent + it : it, current);
    }
    const [isOpen, setOpen] = useState(some(children, ({to}) => to === current));
    const withChild = loopItems(children, current, (parent * 100 || 100) + it);

    return (
        <>
            <Button
                key={uniqueId('verticalNavBar')}
                className={classNames(
                    'border-dark border-top like-button btn btn-secondary nav-item justify-content-between d-flex align-items-center',
                    {
                        'not-allowed': get(props, 'disabled')
                    }
                )}
                tag={NavItem}
                onClick={() => {
                    if (props.onClick) {
                        props.onClick(it, props);
                    }
                    setOpen(prevVal => !prevVal);
                }}
                id={replace(get(props, 'label'), /\s/g, '')}
            >
                <NavLink className={get(props, 'disabled') && 'not-allowed'}>
                    {get(props, 'label')}
                </NavLink>
                <KeyboardArrowDownIcon
                    style={{
                        color: 'var(--body-1)'
                    }}
                    className={classNames('transition', {
                        'dropdown-open': isOpen, 'dropdown-closed': !isOpen
                    })}
                />
            </Button>
            <Collapse
                isOpen={isOpen}
            >
                <Nav vertical tabs>
                    {withChild}
                </Nav>
            </Collapse>
        </>
    );
});

const VerticalNavBar = ({
    title,
    navItems,
    current,
    paraph
}) => (
    <div className="menu mt-3">
        <Label>{title}</Label>
        {Boolean(paraph) && (
            <p className="mt-2 mb-4">
                {paraph}
            </p>
        )}
        <Nav vertical tabs>
            {loopItems(navItems, current)}
        </Nav>
        <br/>
    </div>
);

VerticalNavBar.propTypes = {
    title: PropTypes.string.isRequired,
    paraph: PropTypes.string,
    navItems: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        to: PropTypes.string
    })).isRequired,
    current: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

VerticalNavBar.defaultProps = {
    paraph: null
};

export default VerticalNavBar;
