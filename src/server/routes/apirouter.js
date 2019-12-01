const db = require('../../../db/api');
// The API router that processes api requests.
const apiRouter = require('express').Router();

apiRouter.get('/todos', (req, res) => {
  db.todos.getTodos().then(todos => res.json(todos));
});

// route to add new todo to the database
apiRouter.post('/todo', (req, res) => {
  const newTodo = req.body.todo;
  db.todos.addTodo(newTodo).then(todos => res.json(todos));
});

// route to remove a todo from the database
apiRouter.post('/remove_todo', (req, res) => {
  const todoId = req.body.todoId;
  db.todos.removeTodo({ where: { id: todoId } }).then(todos => res.json(todos));
});

apiRouter.post('/addMsg', (req, res) => {
  const user = req.body.user;
  const newMsg = req.body.message;
  db.messages.addMsg(user, newMsg).then(msgs => res.json(msgs));
});

apiRouter.get('/messages', (req, res) => {
  db.messages.getMessages().then(msgs => {
    res.json(msgs);
  });
});

// route to remove a msg from the database
apiRouter.post('/remove_message', (req, res) => {
  const msgId = req.body.msgId;
  db.messages.removeMsg({ where: { id: msgId } }).then(msgs => res.json(msgs));
});
module.exports = apiRouter;
