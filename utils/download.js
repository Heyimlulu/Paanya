const fs = require('fs');
const ytdl = require('ytdl-core');
const events = require('events');

module.exports = async function(message, url, output) {

    let eventEmitter = new events.EventEmitter();

    const video = ytdl(url, { filter: format => format.container === 'mp4' });

    video.pipe(fs.createWriteStream(output));

    video.on('error', function(err) {
        console.error('error :', err);
        eventEmitter.emit('error', err.toString());
    });

    video.on('end', function() {
        eventEmitter.emit('end', output);
    });

    return eventEmitter;
}