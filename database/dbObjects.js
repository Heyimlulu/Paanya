const Sequelize = require('sequelize');
const config = require('./config.json');
const fs = require('fs');
let db = [];
const model = '';

const sequelize = new Sequelize(config.development);

// Display all models in an Array
const modelsList = fs.readdirSync('./models');

// Loop that load each model from an Array
for (let model in modelsList) {
   model = require('../models/' + modelsList[model].split('.js')[0])(sequelize, Sequelize.DataTypes);
   db[model.name] = model
}

Object.keys(db).forEach(modelName => {
   if (db[modelName].associate) {
      db[modelName].associate(db);
   }
});

console.log(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;