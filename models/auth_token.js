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