const S = require('sequelize');

// Schema for user model
module.exports = {
  username: { type: S.STRING },
  password: { type: S.STRING },
};
