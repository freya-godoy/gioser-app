/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, {
    useEffect,
    useState,
    memo
} from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Row
} from 'reactstrap';
import {InputRadio} from '@fepp/form-builder/dist/components/fields';

import {
    normalizeColorValue
} from '@helpers';

import isPlainObject from 'lodash/isPlainObject';
import map from 'lodash/map';

import ColorMap from './ColorMap';

const MemoColorMap = memo(ColorMap);

const OwnColorPicker = ({
    value,
    name,
    onChange,
    positions
}) => {
    const initialFirstColor = '#000000';
    const initialSecondColor = '#000000';
    const initialGradientPosition = 'to right';

    const [radio, setRadio] = useState(false);
    const [firstColor, setFirstColor] = useState(initialFirstColor);
    const [secondColor, setSecondColor] = useState(initialSecondColor);
    const [gradientPosition, setGradientPosition] = useState(initialGradientPosition);
    const [gradient, setGradient] = useState(`linear-gradient(${gradientPosition},${firstColor} 0%,${secondColor} 100%)`);

    useEffect(() => {
        const normalizedValue = normalizeColorValue(value);
        if (isPlainObject(normalizedValue)) {
            const {
                position,
                firstColor,
                secondColor
            } = normalizedValue;
            const gradient = `linear-gradient(${position}, ${firstColor} 0%, ${secondColor} 100%)`;
            const assignAsync = () => {
                setFirstColor(firstColor);
                setSecondColor(secondColor);
                setGradientPosition(position);
                setGradient(gradient);
                setRadio('2');
                onChange({
                    target: {
                        name, value: gradient
                    }
                });
            };
            assignAsync();
        }
        if (!isPlainObject(normalizedValue) && normalizedValue) {
            setFirstColor(normalizedValue);
            setRadio('1');
        }
    }, [value]);

    useEffect(() => {
        if (radio === '1') {
            onChange({
                target: {
                    name, value: firstColor
                }
            });
            setFirstColor(firstColor);
        }
        if (radio === '2') {
            const gradient = `linear-gradient(${gradientPosition},${firstColor} 0%,${secondColor} 100%)`;
            onChange({
                target: {
                    name, value: gradient
                }
            });
            setGradient(gradient);
        }
    }, [
        radio,
        firstColor,
        secondColor,
        gradientPosition
    ]);

    const handleRadio = radio => {
        setRadio(radio);
    };

    const handleColor = ({hex, indexColor}) => {
        if (indexColor === 'solid') {
            setFirstColor(hex);
            if (radio === '1') {
                onChange({
                    target: {
                        name, value: hex
                    }
                });
            } else {
                onChange({
                    target: {
                        name, value: gradient
                    }
                });
            }
        } else {
            setSecondColor(hex);
            onChange({
                target: {
                    name, value: gradient
                }
            });
        }
    };

    const handleGradientPosition = position => {
        setGradientPosition(position);
    };

    return (
        <Row>
            <Col className="my-3 mx-auto">
                <InputRadio
                    value={radio}
                    name="own-color-picker-radio"
                    label="Colores"
                    text="Podrás definir un color para el portal"
                    onChange={({target: {value}}) => handleRadio(value)}
                    options={
                        [
                            {
                                _id: '1',
                                name: 'Solid'
                            },
                            {
                                _id: '2',
                                name: 'Gradient'
                            }
                        ]
                    }
                />
                <Row className="my-4 mx-auto">
                    {radio && (
                        <Col className="text-center mx-auto" sm="12" md="6">
                            <MemoColorMap
                                id="solid"
                                handleColor={e => handleColor({
                                    ...e, indexColor: 'solid'
                                })}
                                currentColor={firstColor}
                                indexColor="solid"
                                mapName="solid"
                            />
                        </Col>
                    )}
                    {radio === '2' && (
                        <Col className="text-center mx-auto" sm="12" md="6">
                            <MemoColorMap
                                id="gradient"
                                handleColor={e => handleColor({
                                    ...e, indexColor: 'gradient'
                                })}
                                currentColor={secondColor}
                                indexColor="gradient"
                                mapName="gradient"
                            />
                        </Col>
                    )}
                </Row>
                {radio === '2' && (
                    <>
                        {gradient}
                        <div
                            id="gradientPreview"
                            name="gradientPreview"
                            style={{
                                background: gradient,
                                height: '100px'
                            }}
                        />
                        <Row className="mt-5 mb-5">
                            {map(positions, p => (
                                <Col>
                                    <div
                                        id={p.position}
                                        name={p.position}
                                        onClick={() => handleGradientPosition(p.position)}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            textAlign: 'center',
                                            fontSize: '48px',
                                            cursor: 'pointer',
                                            backgroundColor: `linear-gradient(${p.position},${firstColor} 0%,${secondColor} 100%)`
                                        }}
                                    >
                                        {p.label}
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </>
                )}
            </Col>
        </Row>
    );
};

OwnColorPicker.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    positions: PropTypes.arrayOf({}).isRequired
};

OwnColorPicker.defaultProps = {value: ''};

OwnColorPicker.displayName = 'colorPicker';

export default OwnColorPicker;
