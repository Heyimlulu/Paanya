const Sequelize = require('sequelize');
const config = require('./config.json');
const fs = require('fs');
let db = [];

const sequelize = new Sequelize(config.development);

// Display all models in an Array
const modelsList = fs.readdirSync('./models');

// Loop that load each model from an Array
for (let model in modelsList) {
   db = require('../models/' + modelsList[model].split('.js')[0])(sequelize, Sequelize.DataTypes);
}

module.exports = { db };