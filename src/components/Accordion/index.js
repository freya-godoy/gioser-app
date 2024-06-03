import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const Accordion = ({title, children, active}) => {
    const [isActive, setActive] = useState(active || '');
    const content = useRef(null);

    function toggleAccordion() {
        setActive(isActive === '' ? 'active' : '');
    }

    return (
        <div className="w-100">
            <div
                className={`accordion ${isActive} red-color subtitle`}
                onClick={toggleAccordion}
                style={{display: 'flex'}}
                role="button"
                tabIndex="0"
                aria-hidden="true"
            >
                <span
                    style={{
                        flex: '0 0 95%',
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}
                >
                    {title}
                </span>
                <span
                    style={{
                        flex: '0 0 5%',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    {isActive === '' && (
                        <KeyboardArrowUpIcon style={{fontSize: '2rem'}}/>
                    )}
                    {isActive !== '' && (
                        <KeyboardArrowDownIcon style={{fontSize: '2rem'}}/>
                    )}
                </span>
            </div>
            {isActive !== '' && (
                <div
                    ref={content}
                    className="accordion-content"
                >
                    <div className="accordion_text">{children}</div>
                </div>
            )}
        </div>
    );
};

Accordion.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    active: PropTypes.bool.isRequired
};

export default Accordion;
