/* eslint-disable lodash/import-scope */
// eslint-disable-next-line import/no-unresolved
const sharp = require('sharp');
const fetch = require('node-fetch');
const crypto = require('crypto');
const fs = require('fs');
const {URL} = require('url');

const toNumber = require('lodash/toNumber');

module.exports = async (url, height, width) => {
    let idToDigest = url;

    if (height && width) {
        idToDigest += `height_${height}_width_${width}`;
    }

    const id = crypto.createHash('md5').update(idToDigest).digest('hex');

    if (fs.existsSync(`.cache-images/${id}`)) {
        return `.cache-images/${id}`;
    }

    const image = await fetch(new URL(url));
    const bufferImage = await image.buffer();
    if (height && width) {
        await sharp(bufferImage).toFormat('webp').resize(toNumber(width), toNumber(height)).toFile(`.cache-images/${id}`);
    } else {
        await sharp(bufferImage).toFormat('webp').toFile(`.cache-images/${id}`);
    }

    return `.cache-images/${id}`;
};
