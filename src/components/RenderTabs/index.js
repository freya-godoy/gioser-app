import React from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import map from 'lodash/map';
import {
    Container, Row, Col, Nav, NavItem, NavLink
} from 'reactstrap';
import {isMobile} from 'react-device-detect';
import classnames from 'classnames';

const RenderTabs = ({
    navItems,
    cols,
    currenTab,
    finalId
}) => {
    if (!isMobile) {
        return (
            <Container className="mt-4">
                <Row className="w-100 m-0">
                    {map(navItems, item => (
                        <Col md={cols} xs={cols} className="p-0 border-shadow">
                            <Tab
                                label={item.label}
                                onClick={() => item.onClick()}
                                className={classnames('active', 'text-bold', 'w-100', {
                                    'is-active-tab': item.id === currenTab
                                })}
                                style={{
                                    maxWidth: '100%'
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
    return (
        <Nav tabs>
            {map(navItems, tab => (
                <NavItem style={{
                    width: '45vw'
                }}
                >
                    <NavLink
                        className={classnames({
                            active: finalId === tab.id
                        }, 'text-center', 'p-3', {
                            'is-active-tab': tab.id === currenTab
                        })}
                        onClick={() => { tab.onClick(); }}
                        style={{
                            maxWidth: '100%'
                        }}
                    >
                        {tab.label}
                    </NavLink>
                </NavItem>
            ))}
        </Nav>
    );
};
RenderTabs.propTypes = {
    navItems: PropTypes.shape({
    }).isRequired,
    currenTab: PropTypes.string.isRequired,
    cols: PropTypes.number,
    finalId: PropTypes.number.isRequired
};

RenderTabs.defaultProps = {
    cols: 3
};

export default RenderTabs;
