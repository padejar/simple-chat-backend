const sequelize = require('../database/sequelize');
const Sequlieze = require('sequelize');

module.exports = sequelize.define('User', {
  id: {
    field: 'id',
    type: Sequlieze.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    field: 'name',
    type: Sequlieze.STRING,
    validate: {
      notEmpty: {
        args: true,
        message: 'Name is required',
      },
    }
  },
  email: {
    field: 'email',
    type: Sequlieze.STRING,
  },
  password: {
    field: 'password',
    type: Sequlieze.STRING,
  }
});