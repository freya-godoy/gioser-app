import React from 'react';
import {
    Container, Row, Col
} from 'reactstrap';
import {PropTypes} from 'prop-types';
import GoBackIcon from '@components/GoBackIcon';

const HeaderProfile = ({avatar, image, title, subtitle, description, isMobile}) => (
    <Container className="p-0">
        <Row className="m-0">
            <Col md={4} sm={3} xs={3} className="mt-2">
                <picture>
                    <source className="avatar" width={isMobile ? '70' : '118'} height={isMobile ? '70' : '118'} srcSet={avatar}/>
                    <img className="avatar" width={isMobile ? '70' : '118'} height={isMobile ? '70' : '118'} alt="avatar" src={image}/>
                </picture>
            </Col>
            <Col md={8} sm={9} xs={9}>
                <h2 style={{justifyContent: 'left'}} className="text-primary">{title}</h2>
                {subtitle && <large className="text-muted">{subtitle}</large> }
                <br/>
                <h4 className="text-muted">{description}</h4>
            </Col>
        </Row>
    </Container>
);

HeaderProfile.propTypes = {
    avatar: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired,
    onClickGoBack: PropTypes.oneOfType([
        PropTypes.any,
        PropTypes.func
    ]).isRequired
};

export default HeaderProfile;
