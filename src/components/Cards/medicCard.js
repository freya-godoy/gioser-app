import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import random from 'lodash/random';
import {
    Container, Row, Col
} from 'reactstrap';
import image from 'images/Avatar.webp';
import image2 from 'images/avatar.jpg';
import StarIcon from '@mui/icons-material/Star';

const MedicCard = ({avatar, listProps, key, user, onRedirectMedicProfile}) => (
    <Col md={3} xs={12} className="user-card p-0 pointer">
        <Container
            onClick={() => onRedirectMedicProfile({
                _id: key, ...user
            })}
            className="mb-2"
        >
            <Row className="line-bottom pb-2">
                <Col md={5} xs={4} className="d-flex justify-content-center align-items-center mt-4">
                    <picture>
                        <source className="avatar" width="80" height="80" srcSet={avatar || image}/>
                        <img className="avatar" width="80" height="80" alt="avatar" src={image2}/>
                    </picture>
                </Col>
                <Col md={5} xs={4} className="mt-2 d-flex justify-content-start align-items-center p-0">
                    <p className="w-100 card-text text-center">
                        {user.name}
                        {' '}
                        <br/>
                        {get(listProps, 'filters.specialty')}
                    </p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={6} xs={6} className="d-flex align-items-center">
                    <div>
                        <p style={{justifyContent: 'left'}} className="card-text">
                            <strong className="text-primary text-bold">Universidad:</strong>
                            <br/>
                            {user.university}
                        </p>
                        <p className="card-text">
                            <span className="text-primary text-bold">Ciudad:</span>
                            <br/>
                            {user.city}
                        </p>
                    </div>
                </Col>
                <Col md={5} xs={6} className="d-flex align-items-center">
                    <div>
                        <p style={{justifyContent: 'left'}} className="card-text">
                            <span className="text-primary font-weight-bold">Ranking:</span>
                            <br/>
                            {random(0, 5)}
                            <StarIcon className="text-primary font-weight-bold pb-1" size="14px"/>
                        </p>
                        <p className="card-text">
                            <span className="text-primary font-weight-bold">Seguidores:</span>
                            <br/>
                            {random(230, 2000)}
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    </Col>

);

MedicCard.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        university: PropTypes.string,
        city: PropTypes.string
    }).isRequired,
    key: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    onRedirectMedicProfile: PropTypes.func.isRequired,
    listProps: PropTypes.shape({}).isRequired,
    avatar: PropTypes.shape({}).isRequired
};
export default MedicCard;
