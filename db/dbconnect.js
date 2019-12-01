const S = require('sequelize');

// Connects to a local database.
const sequelize = new S('test197', 'root', '(stuff)123', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  port: '3306',
  logging: false
});

// Register the 'todo' model with sequelize
const todo = sequelize.define('todo', require('./models/todo'));
const user = sequelize.define('user', require('./models/user'));
const message = sequelize.define('message', require('./models/message'));

// Load the sequelize models into the mysql database
sequelize.sync().then(() => console.log('synced'));

module.exports = {
  todo,
  user,
  message
};
