import React from 'react';
import PropTypes from 'prop-types';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
} from 'reactstrap';
import classNames from 'classnames';

import map from 'lodash/map';

const DropdownWitChild = ({
    dropdown,
    padding,
    onClick
}) => {
    const items = childrens => map(childrens, child => {
        if (child.items) {
            return (
                <DropdownWitChild {...{
                    dropdown: child, padding: true, onClick
                }}
                />
            );
        }

        return (
            <DropdownItem
                className="my-2 pointer"
                text
                data-content={`{{${child.key}}}`}
                onClickCapture={() => onClick(`{{${child.key}}}`)}
            >
                {child.label}
            </DropdownItem>
        );
    });

    return (
        <UncontrolledDropdown key={dropdown.key} className={classNames('mt-3', {'ml-2': padding})}>
            <DropdownToggle caret>
                {dropdown.label}
            </DropdownToggle>
            <DropdownMenu className="w-100 border-1">
                {items(dropdown.items)}
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

DropdownWitChild.propTypes = {
    dropdown: PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.shape({}))
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    padding: PropTypes.bool
};

DropdownWitChild.defaultProps = {padding: false};

export default DropdownWitChild;
