const Sequelize = require('sequelize');
const config = require('./config.json');
const fs = require('fs');

const sequelize = new Sequelize(config.development);

// Display all models in an Array
const modelsList = fs.readdirSync('./models');

// Loop that load each model from an Array
for (let model in modelsList) {
    require('../models/' + modelsList[model].split('.js')[0])(sequelize, Sequelize.DataTypes);
}

sequelize.sync().then(() => {
    console.log('Database synced');
    sequelize.close();
}).catch(console.error);