import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'reactstrap/lib/Button';
import ButtonGroup from 'reactstrap/lib/ButtonGroup';
import Container from 'reactstrap/lib/Container';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip';

import get from 'lodash/get';
import map from 'lodash/map';

const DrawInfo = ({
    activeTab,
    onToggle,
    document,
    columns
}) => {
    const Component = get(columns, `${activeTab}.Component`, null);
    return (
        <Container fluid className="mb-3">
            <Row>
                <Col>
                    <ButtonGroup
                        tabs
                        className=" d-flex"
                        style={{flex: 1}}
                    >
                        {map(columns, (column, it) => {
                            const id = `tab-navbar-dropdown-list-${it}`;
                            return (
                                <>
                                    <Button
                                        key={id}
                                        id={id}
                                        className={classNames('text-center border border-grey', {'bg-primary': activeTab === it})}
                                        color="link"
                                        onClick={column.action ? () => {
                                            onToggle(it);
                                            column.action(document);
                                        } : () => onToggle(it)}
                                    >
                                        {column.Icon && (
                                            <column.Icon
                                                size="1.5em"
                                                style={{color: activeTab === it ? '#fff' : '#969696'}}
                                            />
                                        )}
                                    </Button>
                                    {column.title && (
                                        <UncontrolledTooltip placement="top" target={id}>
                                            {column.title}
                                        </UncontrolledTooltip>
                                    )}
                                </>
                            );
                        })}
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    {(Component && (<Component {...document}/>)) || null}
                </Col>
            </Row>
        </Container>
    );
};

DrawInfo.propTypes = {
    activeTab: PropTypes.number.isRequired,
    onToggle: PropTypes.func.isRequired,
    document: PropTypes.shape({}).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.oneOf([
            PropTypes.string,
            PropTypes.number
        ])
    })).isRequired
};

export default DrawInfo;
