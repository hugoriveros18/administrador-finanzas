const Sequelize = require('sequelize');

const { config } = require('../../config/config.js');
const { setupModels } = require('../db/models/index.js');

const USER = encodeURIComponent(config.db.user);
const PASSWORD = encodeURIComponent(config.db.password);
const URI = `postgres://${USER}:${PASSWORD}@${config.db.host}:${config.db.port}/${config.db.name}`;

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: true
});

setupModels(sequelize);

module.exports = sequelize