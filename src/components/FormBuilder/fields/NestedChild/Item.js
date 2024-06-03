/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classNames from 'classnames';
import {InputText} from '@fepp/form-builder/dist/fields';

import concat from 'lodash/concat';
import compact from 'lodash/compact';
import filter from 'lodash/filter';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import join from 'lodash/join';
import map from 'lodash/map';
import set from 'lodash/set';
import size from 'lodash/size';
import sortBy from 'lodash/sortBy';
import toNumber from 'lodash/toNumber';
import toPath from 'lodash/toPath';

import {addChild, childModel} from './utils';

/**
 * @param {Object} levelText text of levels, used as title
 * @param {String} title title of the current showed item
 * @param {Object[]} collection collection of the current item
 * @param {Object} main main information of data
 * @param {Number} level current we are seeing level
 * @param {String} path path of the item we are modifying this is used to set the values
 * @param {Function} onChange onChange function
 * @param {Number} current which item we are touching its a number
 * @param {Function} onClick handle CLick function
 * @param {Boolean} lastPosition is this si thee last position of our collection used to add children's
 * @param {Number} id  id of current object
 * @param {Function} handleDrag handleDrag function, to set which object we are moving to
 * @param {Object} dragItem current item dragged
 * @param {Number} depth maximum levels allowed
 * @param {Number} maxChild maximum children's per level allowed
 * @param {Number} position position of the current item
 * @param {*} param0
 */
const Item = ({
    levelText,
    title,
    collection,
    main,
    level,
    path,
    onChange,
    current,
    onClick,
    lastPosition,
    id,
    handleDrag,
    dragItem,
    depth,
    maxChild,
    position,
    parentHover,
    i18n
}) => {
    const [activeTab, toggle] = useState(null);
    const [newText, setNewText] = useState('');
    const [newChildText, setChildNewText] = useState('');
    const canAdd = toNumber(depth) === level && level !== 1;
    const [isShown, setIsShown] = useState(false);
    const stopPropagation = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = e => {
        stopPropagation(e);
        if (!dragItem.path) {
            handleDrag({
                path, id
            });
        }
    };

    const handleDrop = e => {
        stopPropagation(e);
        if (/^\d$/.test(dragItem.path)) {
            const oldOrder = get(main, `${dragItem.path}.order`);
            const newOrder = get(main, `${path}.order`);
            set(main, `${dragItem.path}.order`, newOrder);
            set(main, `${path}.order`, oldOrder);
            onChange({target: {value: compact(sortBy(main, m => m.order))}});
            handleDrag({});
            return;
        }

        const innerPath = toPath(dragItem.path);
        innerPath.pop();
        const route = join(innerPath, '.');
        const innerSubPath = toPath(path);
        innerSubPath.pop();
        const routeSub = join(innerSubPath, '.');

        if (routeSub === route) {
            const oldOrder = get(main, `${dragItem.path}.order`);
            const newOrder = get(main, `${path}.order`);
            set(main, `${dragItem.path}.order`, newOrder);
            set(main, `${path}.order`, oldOrder);
            set(main, route, sortBy(get(main, route), t => t.order));
            onChange({target: {value: compact(main)}});
        }
        handleDrag({});
    };
    const handleAdd = () => {
        const title = newText;
        if (!isEmpty(title) && !(size(main) >= maxChild)) {
            if (/^\d+$/.test(path)) {
                // eslint-disable-next-line no-param-reassign
                main = concat(main, childModel({
                    title, id: size(main) + 1, order: size(main) + 1
                }));
            } else {
                let collectionPath = toPath(path);
                collectionPath.pop();
                collectionPath = join(collectionPath, '.');
                const collection = get(main, collectionPath);
                const newValues = addChild(collection, {title});
                const parentPath = toPath(collectionPath);
                parentPath.pop();
                set(main, collectionPath, newValues);
            }
            onChange({target: {value: main}});
            setNewText('');
        }
    };

    const handleAddChild = () => {
        const title = newChildText;
        setChildNewText('');
        if (!isEmpty(title)) {
            const newValues = addChild(collection, {title});
            set(main, `${path}.collection`, newValues);
            onChange({target: {value: main}});
        }
    };

    return (
        <span className={classNames('', {'nested-item-active': isShown || parentHover})}>
            <Container
                onDragOver={e => stopPropagation(e)}
                onDrop={e => handleDrop(e)}
                fluid
                className="not-background"
            >
                <Row
                    onDrag={e => handleDragEnter(e)}
                    draggable
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                    onBlur={() => {
                        setIsShown(false);
                    }}
                    className={classNames('py-2', {
                        'row-active': isShown, 'row-inactive': !isShown
                    })}
                >
                    <Col className="d-inline-flex align-items-center w-100">
                        <span className="inactive draggable" aria-labelledby={id}>
                            <ControlCameraIcon
                                fontSize="small"
                                className={classNames('', {'text-transparent': !isShown})}
                            />
                        </span>
                        <span className="position-relative w-100">
                            {current === position && activeTab === null && (
                                <InputText
                                    className="ml-3 border-0"
                                    onClick={() => toggle(null)}
                                    value={title || ''}
                                    placeholder={`${get(i18n, 'add')} titulo de ${levelText[level]}`}
                                    maxLength={240}
                                    onChange={({target: {value}}) => {
                                        const innerPath = toPath(path);
                                        innerPath.pop();
                                        set(main, path, {
                                            ...get(main, path), title: value
                                        });
                                        onChange({target: {value: main}});
                                    }}
                                />
                            )}
                            {(current !== position || activeTab !== null) && (
                                <div
                                    onClick={() => {
                                        onClick();
                                        toggle(null);
                                    }}
                                >
                                    <span className="form-control span-info">
                                        {level > 1 && ('└')}
                                    &nbsp;
                                        <span className="inactive">
                                            {levelText[level]}
                                            &nbsp;
                                            :
                                            &nbsp;
                                        </span>
                                        {title}
                                    </span>
                                </div>
                            )}
                        </span>
                        <span className="inactive">
                            {isShown && (
                                <UncontrolledDropdown setActiveFromChild>
                                    <DropdownToggle tag="a" className="nav-link">
                                        <MoreVertIcon fontSize="small"/>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => {
                                            onClick();
                                            toggle(null);
                                        }}
                                        >
                                            <span
                                                className="nested--icon"
                                            >
                                                <EditIcon fontSize="small"/>
                                            &nbsp;
                                                {get(i18n, 'edit')}
                                            </span>
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => {
                                                if (level > 1) {
                                                    const innerPath = toPath(path);
                                                    innerPath.pop();
                                                    let route = join(innerPath, '.');
                                                    const newValues = filter(get(main, route), (_, it) => it !== toNumber(position));
                                                    innerPath.pop();
                                                    route = join(innerPath, '.');
                                                    set(main, route, {
                                                        ...get(main, route), collection: newValues
                                                    });
                                                    onChange({target: {value: main}});
                                                } else {
                                                    const newValues = filter(main, (_, it) => it !== toNumber(position));
                                                    onChange({target: {value: newValues}});
                                                }
                                            }}
                                            className="nested--icon"
                                        >
                                            <span
                                                className="nested--icon"
                                            >
                                                <DeleteForeverIcon fontSize="small"/>
                                                &nbsp;
                                                {get(i18n, 'delete')}
                                            </span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            )}
                        </span>
                    </Col>
                </Row>
                {!canAdd && title && current === position && map(collection, (coll, it) => (
                    <Row key={`${levelText[level]}.${coll.id}`}>
                        <Col className="ml-5">
                            <Item
                                {...{
                                    ...coll,
                                    level: level + 1,
                                    lastPosition: it + 1 === size(get(main, `${path}.collection`)) || !collection,
                                    main,
                                    path: `${path}.collection.${it}`,
                                    position: it,
                                    current: activeTab,
                                    levelText,
                                    depth,
                                    onClick: () => toggle(it),
                                    onChange,
                                    handleDrag,
                                    dragItem,
                                    parentHover: isShown || parentHover,
                                    i18n
                                }}
                            />
                        </Col>
                    </Row>
                ))}
                {!canAdd && !collection && current === position && depth !== '1' && (
                    <Row>
                        <Col className="ml-5">
                            <span className="d-inline-flex align-items-center ml-5">
                                └
                                <InputText
                                    disabled={maxChild === size(collection)}
                                    key="newSubItem"
                                    className="border-0 bg-transparent w-100"
                                    onClick={() => toggle(null)}
                                    placeholder={`${get(i18n, 'add')} ${levelText[level + 1]}`}
                                    maxLength={240}
                                    onKeyDown={e => {
                                        if (!isEmpty(newChildText) && e.key === 'Enter') {
                                            handleAddChild();
                                        }
                                    }}
                                    onBlur={() => handleAddChild()}
                                    value={newChildText || ''}
                                    onChange={({target: {value}}) => setChildNewText(value)}
                                />
                            </span>
                        </Col>
                    </Row>
                )}
            </Container>
            <Container
                fluid
                className="not-background"
            >
                {lastPosition && (
                    <Row>
                        <Col className="ml-5">
                            <span className="ml-1 d-inline-flex align-items-center">
                                {level > 1 && '└'}
                                <InputText
                                    key="newItem"
                                    className="border-0 bg-transparent"
                                    onClick={() => toggle(null)}
                                    placeholder={`${get(i18n, 'add')} ${levelText[level]}`}
                                    maxLength={240}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            handleAdd();
                                        }
                                    }}
                                    onBlur={() => handleAdd()}
                                    value={newText || ''}
                                    onChange={({target: {value}}) => setNewText(value)}
                                />
                            </span>
                        </Col>
                    </Row>
                )}
            </Container>
        </span>
    );
};

Item.propTypes = {
    handleDrag: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    current: PropTypes.string.isRequired,
    lastPosition: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    depth: PropTypes.string.isRequired,
    levelText: PropTypes.string.isRequired,
    maxChild: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    main: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    collection: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    i18n: PropTypes.shape({}).isRequired,
    dragItem: PropTypes.shape({path: PropTypes.string.isRequired}).isRequired,
    parentHover: PropTypes.bool
};

Item.defaultProps = {parentHover: false};

export default Item;
