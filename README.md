# Paanya

Paanya is a simple and fun discord bot with moderation, auto-color rank, text-to-speech, strawpoll commands and more

## Paanya features

- Get a random image from [imgur](https://giphy.com/) and  [giphy.](https://imgur.com/)
- Get a random subreddit from [reddit.](https://www.reddit.com/)
- Fetch an article from [Urban Dictionary](https://www.urbandictionary.com/)
- Measure your cuteness with the Cute o'meter
- Roleplay commands (hug, cuddle, ...)
- Fake a user/bot using webhooks!
- Get a good looking color with the auto-color command!
- And more!

## Paanya commands

***nya help \<command\>*** to see the help for a specific command.

- ``nya help`` : **Show all commands**
- ``nya advice`` : **Send some random advice**
- ``nya 8ball`` : **Fortune-telling or seeking advice**
- ``nya server`` : **Show information about a server**
- ``nya stats`` : **Show some stats about the bot**
- ``nya invite`` : **Send you a link to invite me in your server**

## Getting started

### Prerequisites

You need to do the following
- Install [NodeJS](https://nodejs.org/) on your computer
- Install the DiscordJS module. You can check their official website and documentation [here.](https://discord.js.org/#/)
  - You can also check their guide [here.](https://discordjs.guide/)
- Install theses modules to get the music command working
  - discordjs/opus
  - ffmpeg, ffmpeg-static, flutent-ffmpeg
  - ytdl-core
- Register to the Google Cloud platform for the tts commands
- Register to theses websites to get your API key 
  - imgur 
  - giphy
  - reddit 
  - RapidAPI for Urban Dictionary
  - Danbooru
  - Google credentials for tts command
- A PostGreSQL database for the logging feature

### Installing

```
git clone https://github.com/Heyimlulu/Paanya.git
npm install
```

### Running

> config.json 

```
{
  "owner": "", <-- Your discord user ID
  "prefix": ["nya"],
  "statsChannel": "", <-- Channel ID where logs will be
  "danbooru": {
    "login": "" <-- Your danbooru login for the the danbooru command
  }
}
```

> .env-example 

- First rename ``.env-example`` to ``.env``

First enter your bot token. You can find it in your applications tab on [Discord Developer Portal](https://discord.com/developers/applications)

```
TOKEN=YOUR-DISCORD-BOT-TOKEN
```

You can put your API keys if you want all the bot features (Optional)
- Replace ``*`` with your own API Secret Key
- Set your JSON key file to use the Google Cloud commands

```
IMGUR_SECRET_KEY=********************
GIPHY_SECRET_KEY=********************
URBAN_DICTIONARY_SECRET_KEY=********************
DANBOORU_SECRET_KEY=********************
GOOGLE_APPLICATION_CREDENTIALS=PathToYourJSONKeyFile
```

If you want to use the logging feature, you'll need to get your PostGreSQL URL 

```
DATABASE_URL = **************************
```

Now you can run the bot with

```
npm start or node index.js
```

## Using my bot

You can find my bot in these website. Don't forget to vote if you do like it ;)

- [discordbotlist.com](https://discordbotlist.com/bots/paanya)
- [top.gg](https://top.gg/bot/829230505123119164) 

## Built with

- [Discord.JS](https://discord.js.org/#/) - Discord API used
- [Discord-akairo](https://discord-akairo.github.io/#/) - Framework used for Discord.JS

<a href="https://github.com/Heyimlulu/Paanya">
  <img height="300px" align="center" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/JetBrains_Logo_2016.svg/1200px-JetBrains_Logo_2016.svg.png">
</a>
<a href="https://github.com/Heyimlulu/Paanya">
  <img height="50px" align="center" src="https://cdn.worldvectorlogo.com/logos/intellijidea.svg">
</a>

## Author

- Heyimlulu
