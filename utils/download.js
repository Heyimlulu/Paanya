const fs = require('fs');
const ytdl = require('ytdl-core');
const os = require('os');

module.exports = async function(message, url) {

    let output = `${os.tmpdir()}/${message.id}_video.mp4`; // filename

    if (url.includes("http") || url.includes("www")) {

        const video = ytdl(url, { filter: format => format.container === 'mp4' });

        video.pipe(fs.createWriteStream(output));

        video.on('error', function(err) {
            console.error('error :', err);
            message.channel.send("An error has occured, i can't download from the link you provided.")
        });

        video.on('end', function() {
            message.channel.send(`Video downloaded by ${message.author.username}`, { files: [output] })
                .catch(error => {
                    message.channel.send('Uh Oh... File is too big to be send on discord');
                    console.error('error :', error);
                });
        });

    } else {
        await message.channel.send("You need to input a valid link!");
    }

}