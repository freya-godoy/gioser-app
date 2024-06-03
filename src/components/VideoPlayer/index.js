/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';

function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

const VideoPlayer = ({url, img, height}) => {
    if (includes(url, 'http')) {
        if (includes(url, 'youtu') || includes(url, 'youtube')) {
            const videoId = getId(url);
            if (videoId) {
                return (
                    <div className="youtube" data-embed={videoId}>
                        <div className="play-button"/>
                    </div>
                );
            }
            return null;
        }
    }
    return null;
};

VideoPlayer.propTypes = {
    img: PropTypes.string,
    url: PropTypes.string,
    height: PropTypes.string
};

VideoPlayer.defaultProps = {
    img: '',
    url: '',
    height: null
};

export default VideoPlayer;
