const S = require('sequelize');

// Schema for todo model
module.exports = {
  messageVal: {
    type: S.STRING
  },
  user: {
    type: S.STRING
  }
};