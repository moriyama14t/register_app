'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    question: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
  };
  return User;
};