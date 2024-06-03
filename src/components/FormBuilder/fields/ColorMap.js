/* eslint-disable jsx-a11y/mouse-events-have-key-events, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions,max-len */
import React from 'react';
import PropTypes from 'prop-types';

import {hexToHSL} from '@helpers';

import imgColorMap from '../../../images/img_colormap.gif';

const handleInputChange = (target, indexName, onChange) => {
    const {value} = target;
    const regexp = /^#([a-fA-F0-9]{0,2}){0,3}$/;

    if (regexp.test(value)) {
        return onChange({
            hex: value, hsl: hexToHSL(value), indexName
        });
    }

    return false;
};

const ColorMap = ({
    id,
    mapName,
    handleColor,
    currentColor,
    indexColor
}) => (
    <>
        <img
            className=""
            src={imgColorMap}
            useMap={`#${mapName}`}
            alt="colormap"
        />
        <map name={mapName} id={id}>
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="63,0,72,4,72,15,63,19,54,15,54,4"
                onClick={() => handleColor({
                    hex: '#003366', hsl: '1, 20, 54', indexColor
                })}
                alt="#003366"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="81,0,90,4,90,15,81,19,72,15,72,4"
                onClick={() => handleColor({
                    hex: '#336699', hsl: '1, 20, 72', indexColor
                })}
                alt="#336699"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="99,0,108,4,108,15,99,19,90,15,90,4"
                onClick={() => handleColor({
                    hex: '#3366CC', hsl: '1, 20, 90', indexColor
                })}
                alt="#3366CC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="117,0,126,4,126,15,117,19,108,15,108,4"
                onClick={() => handleColor({
                    hex: '#003399', hsl: '1, 20, 108', indexColor
                })}
                alt="#003399"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="135,0,144,4,144,15,135,19,126,15,126,4"
                onClick={() => handleColor({
                    hex: '#000099', hsl: '1, 20, 126', indexColor
                })}
                alt="#000099"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="153,0,162,4,162,15,153,19,144,15,144,4"
                onClick={() => handleColor({
                    hex: '#0000CC', hsl: '1, 20, 144', indexColor
                })}
                alt="#0000CC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="171,0,180,4,180,15,171,19,162,15,162,4"
                onClick={() => handleColor({
                    hex: '#000066', hsl: '1, 20, 162', indexColor
                })}
                alt="#000066"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="54,15,63,19,63,30,54,34,45,30,45,19"
                onClick={() => handleColor({
                    hex: '#006666', hsl: '1, 35, 45', indexColor
                })}
                alt="#006666"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="72,15,81,19,81,30,72,34,63,30,63,19"
                onClick={() => handleColor({
                    hex: '#006699', hsl: '1, 35, 63', indexColor
                })}
                alt="#006699"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="90,15,99,19,99,30,90,34,81,30,81,19"
                onClick={() => handleColor({
                    hex: '#0099CC', hsl: '1, 35, 81', indexColor
                })}
                alt="#0099CC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="108,15,117,19,117,30,108,34,99,30,99,19"
                onClick={() => handleColor({
                    hex: '#0066CC', hsl: '1, 35, 99', indexColor
                })}
                alt="#0066CC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="126,15,135,19,135,30,126,34,117,30,117,19"
                onClick={() => handleColor({
                    hex: '#0033CC', hsl: '1, 35, 117', indexColor
                })}
                alt="#0033CC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="144,15,153,19,153,30,144,34,135,30,135,19"
                onClick={() => handleColor({
                    hex: '#0000FF', hsl: '1, 35, 135', indexColor
                })}
                alt="#0000FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="162,15,171,19,171,30,162,34,153,30,153,19"
                onClick={() => handleColor({
                    hex: '#3333FF', hsl: '1, 35, 153', indexColor
                })}
                alt="#3333FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="180,15,189,19,189,30,180,34,171,30,171,19"
                onClick={() => handleColor({
                    hex: '#333399', hsl: '1, 35, 171', indexColor
                })}
                alt="#333399"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="45,30,54,34,54,45,45,49,36,45,36,34"
                onClick={() => handleColor({
                    hex: '#669999', hsl: '1, 50, 36', indexColor
                })}
                alt="#669999"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="63,30,72,34,72,45,63,49,54,45,54,34"
                onClick={() => handleColor({
                    hex: '#009999', hsl: '1, 50, 54', indexColor
                })}
                alt="#009999"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="81,30,90,34,90,45,81,49,72,45,72,34"
                onClick={() => handleColor({
                    hex: '#33CCCC', hsl: '1, 50, 72', indexColor
                })}
                alt="#33CCCC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="99,30,108,34,108,45,99,49,90,45,90,34"
                onClick={() => handleColor({
                    hex: '#00CCFF', hsl: '1, 50, 90', indexColor
                })}
                alt="#00CCFF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="117,30,126,34,126,45,117,49,108,45,108,34"
                onClick={() => handleColor({
                    hex: '#0099FF', hsl: '1, 50, 108', indexColor
                })}
                alt="#0099FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="135,30,144,34,144,45,135,49,126,45,126,34"
                onClick={() => handleColor({
                    hex: '#0066FF', hsl: '1, 50, 126', indexColor
                })}
                alt="#0066FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="153,30,162,34,162,45,153,49,144,45,144,34"
                onClick={() => handleColor({
                    hex: '#3366FF', hsl: '1, 50, 144', indexColor
                })}
                alt="#3366FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="171,30,180,34,180,45,171,49,162,45,162,34"
                onClick={() => handleColor({
                    hex: '#3333CC', hsl: '1, 50, 162', indexColor
                })}
                alt="#3333CC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="189,30,198,34,198,45,189,49,180,45,180,34"
                onClick={() => handleColor({
                    hex: '#666699', hsl: '1, 50, 180', indexColor
                })}
                alt="#666699"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="36,45,45,49,45,60,36,64,27,60,27,49"
                onClick={() => handleColor({
                    hex: '#339966', hsl: '1, 65, 27', indexColor
                })}
                alt="#339966"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="54,45,63,49,63,60,54,64,45,60,45,49"
                onClick={() => handleColor({
                    hex: '#00CC99', hsl: '1, 65, 45', indexColor
                })}
                alt="#00CC99"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="72,45,81,49,81,60,72,64,63,60,63,49"
                onClick={() => handleColor({
                    hex: '#00FFCC', hsl: '1, 65, 63', indexColor
                })}
                alt="#00FFCC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="90,45,99,49,99,60,90,64,81,60,81,49"
                onClick={() => handleColor({
                    hex: '#00FFFF', hsl: '1, 65, 81', indexColor
                })}
                alt="#00FFFF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="108,45,117,49,117,60,108,64,99,60,99,49"
                onClick={() => handleColor({
                    hex: '#33CCFF', hsl: '1, 65, 99', indexColor
                })}
                alt="#33CCFF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="126,45,135,49,135,60,126,64,117,60,117,49"
                onClick={() => handleColor({
                    hex: '#3399FF', hsl: '1, 65, 117', indexColor
                })}
                alt="#3399FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="144,45,153,49,153,60,144,64,135,60,135,49"
                onClick={() => handleColor({
                    hex: '#6699FF', hsl: '1, 65, 135', indexColor
                })}
                alt="#6699FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="162,45,171,49,171,60,162,64,153,60,153,49"
                onClick={() => handleColor({
                    hex: '#6666FF', hsl: '1, 65, 153', indexColor
                })}
                alt="#6666FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="180,45,189,49,189,60,180,64,171,60,171,49"
                onClick={() => handleColor({
                    hex: '#6600FF', hsl: '1, 65, 171', indexColor
                })}
                alt="#6600FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="198,45,207,49,207,60,198,64,189,60,189,49"
                onClick={() => handleColor({
                    hex: '#6600CC', hsl: '1, 65, 189', indexColor
                })}
                alt="#6600CC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="27,60,36,64,36,75,27,79,18,75,18,64"
                onClick={() => handleColor({
                    hex: '#339933', hsl: '1, 80, 18', indexColor
                })}
                alt="#339933"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="45,60,54,64,54,75,45,79,36,75,36,64"
                onClick={() => handleColor({
                    hex: '#00CC66', hsl: '1, 80, 36', indexColor
                })}
                alt="#00CC66"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="63,60,72,64,72,75,63,79,54,75,54,64"
                onClick={() => handleColor({
                    hex: '#00FF99', hsl: '1, 80, 54', indexColor
                })}
                alt="#00FF99"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="81,60,90,64,90,75,81,79,72,75,72,64"
                onClick={() => handleColor({
                    hex: '#66FFCC', hsl: '1, 80, 72', indexColor
                })}
                alt="#66FFCC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="99,60,108,64,108,75,99,79,90,75,90,64"
                onClick={() => handleColor({
                    hex: '#66FFFF', hsl: '1, 80, 90', indexColor
                })}
                alt="#66FFFF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="117,60,126,64,126,75,117,79,108,75,108,64"
                onClick={() => handleColor({
                    hex: '#66CCFF', hsl: '1, 80, 108', indexColor
                })}
                alt="#66CCFF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="135,60,144,64,144,75,135,79,126,75,126,64"
                onClick={() => handleColor({
                    hex: '#99CCFF', hsl: '1, 80, 126', indexColor
                })}
                alt="#99CCFF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="153,60,162,64,162,75,153,79,144,75,144,64"
                onClick={() => handleColor({
                    hex: '#9999FF', hsl: '1, 80, 144', indexColor
                })}
                alt="#9999FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="171,60,180,64,180,75,171,79,162,75,162,64"
                onClick={() => handleColor({
                    hex: '#9966FF', hsl: '1, 80, 162', indexColor
                })}
                alt="#9966FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="189,60,198,64,198,75,189,79,180,75,180,64"
                onClick={() => handleColor({
                    hex: '#9933FF', hsl: '1, 80, 180', indexColor
                })}
                alt="#9933FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="207,60,216,64,216,75,207,79,198,75,198,64"
                onClick={() => handleColor({
                    hex: '#9900FF', hsl: '1, 80, 198', indexColor
                })}
                alt="#9900FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="18,75,27,79,27,90,18,94,9,90,9,79"
                onClick={() => handleColor({
                    hex: '#006600', hsl: '1, 95, 9', indexColor
                })}
                alt="#006600"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="36,75,45,79,45,90,36,94,27,90,27,79"
                onClick={() => handleColor({
                    hex: '#00CC00', hsl: '1, 95, 27', indexColor
                })}
                alt="#00CC00"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="54,75,63,79,63,90,54,94,45,90,45,79"
                onClick={() => handleColor({
                    hex: '#00FF00', hsl: '1, 95, 45', indexColor
                })}
                alt="#00FF00"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="72,75,81,79,81,90,72,94,63,90,63,79"
                onClick={() => handleColor({
                    hex: '#66FF99', hsl: '1, 95, 63', indexColor
                })}
                alt="#66FF99"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="90,75,99,79,99,90,90,94,81,90,81,79"
                onClick={() => handleColor({
                    hex: '#99FFCC', hsl: '1, 95, 81', indexColor
                })}
                alt="#99FFCC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="108,75,117,79,117,90,108,94,99,90,99,79"
                onClick={() => handleColor({
                    hex: '#CCFFFF', hsl: '1, 95, 99', indexColor
                })}
                alt="#CCFFFF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="126,75,135,79,135,90,126,94,117,90,117,79"
                onClick={() => handleColor({
                    hex: '#CCCCFF', hsl: '1, 95, 117', indexColor
                })}
                alt="#CCCCFF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="144,75,153,79,153,90,144,94,135,90,135,79"
                onClick={() => handleColor({
                    hex: '#CC99FF', hsl: '1, 95, 135', indexColor
                })}
                alt="#CC99FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="162,75,171,79,171,90,162,94,153,90,153,79"
                onClick={() => handleColor({
                    hex: '#CC66FF', hsl: '1, 95, 153', indexColor
                })}
                alt="#CC66FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="180,75,189,79,189,90,180,94,171,90,171,79"
                onClick={() => handleColor({
                    hex: '#CC33FF', hsl: '1, 95, 171', indexColor
                })}
                alt="#CC33FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="198,75,207,79,207,90,198,94,189,90,189,79"
                onClick={() => handleColor({
                    hex: '#CC00FF', hsl: '1, 95, 189', indexColor
                })}
                alt="#CC00FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="216,75,225,79,225,90,216,94,207,90,207,79"
                onClick={() => handleColor({
                    hex: '#9900CC', hsl: '1, 95, 207', indexColor
                })}
                alt="#9900CC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="9,90,18,94,18,105,9,109,0,105,0,94"
                onClick={() => handleColor({
                    hex: '#003300', hsl: '1, 110, 0', indexColor
                })}
                alt="#003300"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="27,90,36,94,36,105,27,109,18,105,18,94"
                onClick={() => handleColor({
                    hex: '#009933', hsl: '1, 110, 18', indexColor
                })}
                alt="#009933"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="45,90,54,94,54,105,45,109,36,105,36,94"
                onClick={() => handleColor({
                    hex: '#33CC33', hsl: '1, 110, 36', indexColor
                })}
                alt="#33CC33"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="63,90,72,94,72,105,63,109,54,105,54,94"
                onClick={() => handleColor({
                    hex: '#66FF66', hsl: '1, 110, 54', indexColor
                })}
                alt="#66FF66"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="81,90,90,94,90,105,81,109,72,105,72,94"
                onClick={() => handleColor({
                    hex: '#99FF99', hsl: '1, 110, 72', indexColor
                })}
                alt="#99FF99"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="99,90,108,94,108,105,99,109,90,105,90,94"
                onClick={() => handleColor({
                    hex: '#CCFFCC', hsl: '1, 110, 90', indexColor
                })}
                alt="#CCFFCC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="117,90,126,94,126,105,117,109,108,105,108,94"
                onClick={() => handleColor({
                    hex: '#FFFFFF', hsl: '1, 110, 108', indexColor
                })}
                alt="#FFFFFF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="135,90,144,94,144,105,135,109,126,105,126,94"
                onClick={() => handleColor({
                    hex: '#FFCCFF', hsl: '1, 110, 126', indexColor
                })}
                alt="#FFCCFF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="153,90,162,94,162,105,153,109,144,105,144,94"
                onClick={() => handleColor({
                    hex: '#FF99FF', hsl: '1, 110, 144', indexColor
                })}
                alt="#FF99FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="171,90,180,94,180,105,171,109,162,105,162,94"
                onClick={() => handleColor({
                    hex: '#FF66FF', hsl: '1, 110, 162', indexColor
                })}
                alt="#FF66FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="189,90,198,94,198,105,189,109,180,105,180,94"
                onClick={() => handleColor({
                    hex: '#FF00FF', hsl: '1, 110, 180', indexColor
                })}
                alt="#FF00FF"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="207,90,216,94,216,105,207,109,198,105,198,94"
                onClick={() => handleColor({
                    hex: '#CC00CC', hsl: '1, 110, 198', indexColor
                })}
                alt="#CC00CC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="225,90,234,94,234,105,225,109,216,105,216,94"
                onClick={() => handleColor({
                    hex: '#660066', hsl: '1, 110, 216', indexColor
                })}
                alt="#660066"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="18,105,27,109,27,120,18,124,9,120,9,109"
                onClick={() => handleColor({
                    hex: '#336600', hsl: '1, 125, 9', indexColor
                })}
                alt="#336600"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="36,105,45,109,45,120,36,124,27,120,27,109"
                onClick={() => handleColor({
                    hex: '#009900', hsl: '1, 125, 27', indexColor
                })}
                alt="#009900"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="54,105,63,109,63,120,54,124,45,120,45,109"
                onClick={() => handleColor({
                    hex: '#66FF33', hsl: '1, 125, 45', indexColor
                })}
                alt="#66FF33"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="72,105,81,109,81,120,72,124,63,120,63,109"
                onClick={() => handleColor({
                    hex: '#99FF66', hsl: '1, 125, 63', indexColor
                })}
                alt="#99FF66"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="90,105,99,109,99,120,90,124,81,120,81,109"
                onClick={() => handleColor({
                    hex: '#CCFF99', hsl: '1, 125, 81', indexColor
                })}
                alt="#CCFF99"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="108,105,117,109,117,120,108,124,99,120,99,109"
                onClick={() => handleColor({
                    hex: '#FFFFCC', hsl: '1, 125, 99', indexColor
                })}
                alt="#FFFFCC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="126,105,135,109,135,120,126,124,117,120,117,109"
                onClick={() => handleColor({
                    hex: '#FFCCCC', hsl: '1, 125, 117', indexColor
                })}
                alt="#FFCCCC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="144,105,153,109,153,120,144,124,135,120,135,109"
                onClick={() => handleColor({
                    hex: '#FF99CC', hsl: '1, 125, 135', indexColor
                })}
                alt="#FF99CC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="162,105,171,109,171,120,162,124,153,120,153,109"
                onClick={() => handleColor({
                    hex: '#FF66CC', hsl: '1, 125, 153', indexColor
                })}
                alt="#FF66CC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="180,105,189,109,189,120,180,124,171,120,171,109"
                onClick={() => handleColor({
                    hex: '#FF33CC', hsl: '1, 125, 171', indexColor
                })}
                alt="#FF33CC"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="198,105,207,109,207,120,198,124,189,120,189,109"
                onClick={() => handleColor({
                    hex: '#CC0099', hsl: '1, 125, 189', indexColor
                })}
                alt="#CC0099"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="216,105,225,109,225,120,216,124,207,120,207,109"
                onClick={() => handleColor({
                    hex: '#993399', hsl: '1, 125, 207', indexColor
                })}
                alt="#993399"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="27,120,36,124,36,135,27,139,18,135,18,124"
                onClick={() => handleColor({
                    hex: '#333300', hsl: '1, 140, 18', indexColor
                })}
                alt="#333300"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="45,120,54,124,54,135,45,139,36,135,36,124"
                onClick={() => handleColor({
                    hex: '#669900', hsl: '1, 140, 36', indexColor
                })}
                alt="#669900"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="63,120,72,124,72,135,63,139,54,135,54,124"
                onClick={() => handleColor({
                    hex: '#99FF33', hsl: '1, 140, 54', indexColor
                })}
                alt="#99FF33"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="81,120,90,124,90,135,81,139,72,135,72,124"
                onClick={() => handleColor({
                    hex: '#CCFF66', hsl: '1, 140, 72', indexColor
                })}
                alt="#CCFF66"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="99,120,108,124,108,135,99,139,90,135,90,124"
                onClick={() => handleColor({
                    hex: '#FFFF99', hsl: '1, 140, 90', indexColor
                })}
                alt="#FFFF99"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="117,120,126,124,126,135,117,139,108,135,108,124"
                onClick={() => handleColor({
                    hex: '#FFCC99', hsl: '1, 140, 108', indexColor
                })}
                alt="#FFCC99"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="135,120,144,124,144,135,135,139,126,135,126,124"
                onClick={() => handleColor({
                    hex: '#FF9999', hsl: '1, 140, 126', indexColor
                })}
                alt="#FF9999"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="153,120,162,124,162,135,153,139,144,135,144,124"
                onClick={() => handleColor({
                    hex: '#FF6699', hsl: '1, 140, 144', indexColor
                })}
                alt="#FF6699"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="171,120,180,124,180,135,171,139,162,135,162,124"
                onClick={() => handleColor({
                    hex: '#FF3399', hsl: '1, 140, 162', indexColor
                })}
                alt="#FF3399"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="189,120,198,124,198,135,189,139,180,135,180,124"
                onClick={() => handleColor({
                    hex: '#CC3399', hsl: '1, 140, 180', indexColor
                })}
                alt="#CC3399"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="207,120,216,124,216,135,207,139,198,135,198,124"
                onClick={() => handleColor({
                    hex: '#990099', hsl: '1, 140, 198', indexColor
                })}
                alt="#990099"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="36,135,45,139,45,150,36,154,27,150,27,139"
                onClick={() => handleColor({
                    hex: '#666633', hsl: '1, 155, 27', indexColor
                })}
                alt="#666633"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="54,135,63,139,63,150,54,154,45,150,45,139"
                onClick={() => handleColor({
                    hex: '#99CC00', hsl: '1, 155, 45', indexColor
                })}
                alt="#99CC00"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="72,135,81,139,81,150,72,154,63,150,63,139"
                onClick={() => handleColor({
                    hex: '#CCFF33', hsl: '1, 155, 63', indexColor
                })}
                alt="#CCFF33"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="90,135,99,139,99,150,90,154,81,150,81,139"
                onClick={() => handleColor({
                    hex: '#FFFF66', hsl: '1, 155, 81', indexColor
                })}
                alt="#FFFF66"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="108,135,117,139,117,150,108,154,99,150,99,139"
                onClick={() => handleColor({
                    hex: '#FFCC66', hsl: '1, 155, 99', indexColor
                })}
                alt="#FFCC66"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="126,135,135,139,135,150,126,154,117,150,117,139"
                onClick={() => handleColor({
                    hex: '#FF9966', hsl: '1, 155, 117', indexColor
                })}
                alt="#FF9966"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="144,135,153,139,153,150,144,154,135,150,135,139"
                onClick={() => handleColor({
                    hex: '#FF6666', hsl: '1, 155, 135', indexColor
                })}
                alt="#FF6666"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="162,135,171,139,171,150,162,154,153,150,153,139"
                onClick={() => handleColor({
                    hex: '#FF0066', hsl: '1, 155, 153', indexColor
                })}
                alt="#FF0066"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="180,135,189,139,189,150,180,154,171,150,171,139"
                onClick={() => handleColor({
                    hex: '#CC6699', hsl: '1, 155, 171', indexColor
                })}
                alt="#CC6699"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="198,135,207,139,207,150,198,154,189,150,189,139"
                onClick={() => handleColor({
                    hex: '#993366', hsl: '1, 155, 189', indexColor
                })}
                alt="#993366"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="45,150,54,154,54,165,45,169,36,165,36,154"
                onClick={() => handleColor({
                    hex: '#999966', hsl: '1, 170, 36', indexColor
                })}
                alt="#999966"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="63,150,72,154,72,165,63,169,54,165,54,154"
                onClick={() => handleColor({
                    hex: '#CCCC00', hsl: '1, 170, 54', indexColor
                })}
                alt="#CCCC00"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="81,150,90,154,90,165,81,169,72,165,72,154"
                onClick={() => handleColor({
                    hex: '#FFFF00', hsl: '1, 170, 72', indexColor
                })}
                alt="#FFFF00"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="99,150,108,154,108,165,99,169,90,165,90,154"
                onClick={() => handleColor({
                    hex: '#FFCC00', hsl: '1, 170, 90', indexColor
                })}
                alt="#FFCC00"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="117,150,126,154,126,165,117,169,108,165,108,154"
                onClick={() => handleColor({
                    hex: '#FF9933', hsl: '1, 170, 108', indexColor
                })}
                alt="#FF9933"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="135,150,144,154,144,165,135,169,126,165,126,154"
                onClick={() => handleColor({
                    hex: '#FF6600', hsl: '1, 170, 126', indexColor
                })}
                alt="#FF6600"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="153,150,162,154,162,165,153,169,144,165,144,154"
                onClick={() => handleColor({
                    hex: '#FF5050', hsl: '1, 170, 144', indexColor
                })}
                alt="#FF5050"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="171,150,180,154,180,165,171,169,162,165,162,154"
                onClick={() => handleColor({
                    hex: '#CC0066', hsl: '1, 170, 162', indexColor
                })}
                alt="#CC0066"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="189,150,198,154,198,165,189,169,180,165,180,154"
                onClick={() => handleColor({
                    hex: '#660033', hsl: '1, 170, 180', indexColor
                })}
                alt="#660033"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="54,165,63,169,63,180,54,184,45,180,45,169"
                onClick={() => handleColor({
                    hex: '#996633', hsl: '1, 185, 45', indexColor
                })}
                alt="#996633"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="72,165,81,169,81,180,72,184,63,180,63,169"
                onClick={() => handleColor({
                    hex: '#CC9900', hsl: '1, 185, 63', indexColor
                })}
                alt="#CC9900"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="90,165,99,169,99,180,90,184,81,180,81,169"
                onClick={() => handleColor({
                    hex: '#FF9900', hsl: '1, 185, 81', indexColor
                })}
                alt="#FF9900"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="108,165,117,169,117,180,108,184,99,180,99,169"
                onClick={() => handleColor({
                    hex: '#CC6600', hsl: '1, 185, 99', indexColor
                })}
                alt="#CC6600"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="126,165,135,169,135,180,126,184,117,180,117,169"
                onClick={() => handleColor({
                    hex: '#FF3300', hsl: '1, 185, 117', indexColor
                })}
                alt="#FF3300"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="144,165,153,169,153,180,144,184,135,180,135,169"
                onClick={() => handleColor({
                    hex: '#FF0000', hsl: '1, 185, 135', indexColor
                })}
                alt="#FF0000"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="162,165,171,169,171,180,162,184,153,180,153,169"
                onClick={() => handleColor({
                    hex: '#CC0000', hsl: '1, 185, 153', indexColor
                })}
                alt="#CC0000"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="180,165,189,169,189,180,180,184,171,180,171,169"
                onClick={() => handleColor({
                    hex: '#990033', hsl: '1, 185, 171', indexColor
                })}
                alt="#990033"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="63,180,72,184,72,195,63,199,54,195,54,184"
                onClick={() => handleColor({
                    hex: '#663300', hsl: '1, 200, 54', indexColor
                })}
                alt="#663300"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="81,180,90,184,90,195,81,199,72,195,72,184"
                onClick={() => handleColor({
                    hex: '#996600', hsl: '1, 200, 72', indexColor
                })}
                alt="#996600"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="99,180,108,184,108,195,99,199,90,195,90,184"
                onClick={() => handleColor({
                    hex: '#CC3300', hsl: '1, 200, 90', indexColor
                })}
                alt="#CC3300"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="117,180,126,184,126,195,117,199,108,195,108,184"
                onClick={() => handleColor({
                    hex: '#993300', hsl: '1, 200, 108', indexColor
                })}
                alt="#993300"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="135,180,144,184,144,195,135,199,126,195,126,184"
                onClick={() => handleColor({
                    hex: '#990000', hsl: '1, 200, 126', indexColor
                })}
                alt="#990000"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="153,180,162,184,162,195,153,199,144,195,144,184"
                onClick={() => handleColor({
                    hex: '#800000', hsl: '1, 200, 144', indexColor
                })}
                alt="#800000"
            />
            <area
                style={{cursor: 'pointer'}}
                shape="poly"
                coords="171,180,180,184,180,195,171,199,162,195,162,184"
                onClick={() => handleColor({
                    hex: '#993333', hsl: '1, 200, 162', indexColor
                })}
                alt="#993333"
            />
        </map>
        <div className="mx-auto w-50 my-4">
            <div
                id="divpreviewtop"
                style={{
                    backgroundColor: currentColor,
                    height: '20px',
                    width: '100%'
                }}
            >
                &nbsp;
            </div>
            <input
                id="divpreviewtxttop"
                style={{
                    paddingTop: '3px',
                    textAlign: 'center',
                    width: '100%'
                }}
                size="7"
                maxLength="7"
                value={currentColor}
                onChange={e => handleInputChange(e.target, indexColor, handleColor)}
            />
        </div>
    </>
);

ColorMap.propTypes = {
    id: PropTypes.string.isRequired,
    mapName: PropTypes.string.isRequired,
    handleColor: PropTypes.func.isRequired,
    currentColor: PropTypes.arrayOf({}).isRequired,
    indexColor: PropTypes.string.isRequired
};

export default ColorMap;
