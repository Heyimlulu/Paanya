<p align="center">
  <img style="max-width:100%;" src="https://i.imgur.com/zOl84re.jpeg" alt="Paanya - Discord Bot" />
</p>

<h1 align="center">
  Paanya Discord Bot
</h1>

<h4 align="center">
  Moderation, Fun, General, Image, Minigame, Social & Utility commands
</h4>

## Getting started

### Prerequisites

You need to do the following
- Install [NodeJS](https://nodejs.org/) on your computer
- Install the DiscordJS module. You can check their official website and documentation [here.](https://discord.js.org/#/)
  - You can also check their guide [here.](https://discordjs.guide/)
- Register to the Google Cloud platform for the tts commands
- Register to theses websites to get your API key 
  - imgur 
  - giphy
  - reddit 
  - RapidAPI for Urban Dictionary
  - Danbooru
- A PostGreSQL database for the logging feature

### Installing

```
git clone https://github.com/Heyimlulu/Paanya.git
npm install
```

### Running

- First rename ``.env-example`` to ``.env``

Enter your bot token. You can find it in your applications tab on [Discord Developer Portal](https://discord.com/developers/applications)

You can put your API keys if you want to use all the bot features (Optional)
- Replace ``*`` with your own API Secret Key
- Set your JSON key file to use the Google Cloud commands

```
TENOR_SECRET_KEY=********************
IMGUR_SECRET_KEY=********************
GIPHY_SECRET_KEY=********************
URBAN_DICTIONARY_SECRET_KEY=********************
DANBOORU_SECRET_KEY=********************
STEAM_SECRET_KEY=********************
GOOGLE_APPLICATION_CREDENTIALS=PathToYourJSONKeyFile
```

If you want to use the logging feature, you'll need to get your PostGreSQL URL 

```
DATABASE_URL = **************************
```

Now you can run the bot

```
#With Node
node index.js
npm start

#With pm2
pm2 start index.js --name "Paanya"
```

## Invite

You can find my bot in theses websites. Don't forget to vote if you do like it and want to support my bot ;)

<a href="https://top.gg/bot/829230505123119164" target="_blank">top.gg</a> |
<a href="https://discordbotlist.com/bots/paanya" target="_blank">discordbotlist.com</a> |
<a href="https://discord.bots.gg/bots/829230505123119164" target="_blank">discord.bots.gg</a>

## Built with

- [Discord.JS](https://discord.js.org/#/) - Discord API used
- [Discord-akairo](https://discord-akairo.github.io/#/) - Framework used for Discord.JS

<a href="https://github.com/Heyimlulu/Paanya">
  <img height="300px" align="center" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/JetBrains_Logo_2016.svg/1200px-JetBrains_Logo_2016.svg.png">
</a>
<a href="https://github.com/Heyimlulu/Paanya">
  <img height="50px" align="center" src="https://cdn.worldvectorlogo.com/logos/intellijidea.svg">
</a>

## Donation

<a href="https://www.paypal.com/donate?hosted_button_id=FLJ8V26SHZDKS&source=url">
  <img src="https://www.paypalobjects.com/en_US/CH/i/btn/btn_donateCC_LG.gif" alt="Donate with PayPal button" />
</a>

## Author

- Heyimlulu

## License

Licensed under the [GNU Affero General Public License v3.0 License](). Click for more information.

Paanya is named after the secondary character of "Mashiroiro Symphony", an anime by Minazuki, Futago (Art) & Palette (Story).
