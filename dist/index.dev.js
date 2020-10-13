"use strict";

var express = require("express");

var app = express();

var pool = require('./db');

app.use(express.json()); // => reg.body
//ROUTES//
//get all todos

app.get("/todos", function _callee(req, res) {
  var allTodos;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(pool.query("SELECT * FROM todo"));

        case 3:
          allTodos = _context.sent;
          res.json(allTodos.rows);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //get a todo

app.get("/todos/:id", function _callee2(req, res) {
  var id, todo;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]));

        case 4:
          todo = _context2.sent;
          res.json(todo.rows[0]);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0.message);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); //create a todo

app.post("/todos", function _callee3(req, res) {
  var description, newTodo;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          description = req.body.description;
          _context3.next = 4;
          return regeneratorRuntime.awrap(pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]));

        case 4:
          newTodo = _context3.sent;
          res.json(newTodo.rows[0]);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0.message);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //update a todo

app.put("/todos/:id", function _callee4(req, res) {
  var id, description, updateTodo;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id; //where

          description = req.body.description;
          _context4.next = 5;
          return regeneratorRuntime.awrap(pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]));

        case 5:
          updateTodo = _context4.sent;
          res.json("Todo was Updated!");
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.message);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); //delete a todo

app["delete"]("/todos/:id", function _callee5(req, res) {
  var id, deleteTodo;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(pool.query("DELETE FROM todo WHERE todo_id = $1", [id]));

        case 4:
          deleteTodo = _context5.sent;
          res.json("Todo was successfully deleted");
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0.message);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.listen(3000, function () {
  console.log("server is listening on port 3000");
});