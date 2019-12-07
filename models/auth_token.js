'use strict';
module.exports = (sequelize, DataTypes) => {
  
    const AuthToken = sequelize.define('AuthToken', {
      token: DataTypes.STRING
    }, {});
    
    // set up the associations so we can make queries that include
    // the related objects
    AuthToken.associate = function(models) {
      AuthToken.belongsTo(models.User);
    };

    return AuthToken;
  };
  const sequelize = require('../database/sequelize');
const Sequlieze = require('sequelize');

module.exports = sequelize.define('AuthToken', {
  id: {
    field: 'id',
    type: Sequlieze.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  token: {
    field: 'token',
    type: Sequlieze.STRING,
    validate: {
      notEmpty: {
        args: true,
        message: 'Name is required',
      },
    }
  },
  user_id: {
    field: 'user_id',
    type: Sequlieze.BIGINT,
  }
});