"use strict";

var express = require("express");

var app = express();

var pool = require('./db');

app.use(express.json()); // => reg.body
//ROUTES//
//get all todos

app.get("/siswa", function _callee(req, res) {
  var allSiswa;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(pool.query("SELECT * FROM data_siswa"));

        case 3:
          allSiswa = _context.sent;
          res.json(allSiswa.rows);
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

app.get("/siswa/:id", function _callee2(req, res) {
  var id, data_siswa;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(pool.query("SELECT * FROM data_siswa WHERE id_siswa = $1", [id]));

        case 4:
          data_siswa = _context2.sent;
          res.json(data_siswa.rows[0]);
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

app.post("/siswa", function _callee3(req, res) {
  var nama_siswa, nisn, kelas, alamat, newTodo;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          nama_siswa = req.body.nama_siswa;
          nisn = req.body.nisn;
          kelas = req.body.kelas;
          alamat = req.body.alamat;
          _context3.next = 7;
          return regeneratorRuntime.awrap(pool.query("INSERT INTO data_siswa (nama_siswa,nisn,kelas,alamat) VALUES ($1,$2,$3,$4) RETURNING *", [nama_siswa, nisn, kelas, alamat]));

        case 7:
          newTodo = _context3.sent;
          res.json(newTodo.rows[0]);
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0.message);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); //update a todo

app.put("/siswa/:id", function _callee4(req, res) {
  var id, nama_siswa, nisn, kelas, alamat, updateTodo;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id; //where

          nama_siswa = req.body.nama_siswa;
          nisn = req.body.nisn;
          kelas = req.body.kelas;
          alamat = req.body.alamat;
          _context4.next = 8;
          return regeneratorRuntime.awrap(pool.query("UPDATE data_siswa SET nama_siswa = $1, nisn = $2, kelas = $3, alamat = $4  WHERE id_siswa = $5", [nama_siswa, nisn, kelas, alamat, id]));

        case 8:
          updateTodo = _context4.sent;
          res.json("data telah di update !");
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.message);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 12]]);
}); //delete a todo

app["delete"]("/siswa/:id", function _callee5(req, res) {
  var id, deleteTodo;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(pool.query("DELETE FROM data_siswa WHERE id_siswa = $1", [id]));

        case 4:
          deleteTodo = _context5.sent;
          res.json("Data telah di hapus");
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
  console.log("Localhostnya memakai port 3000");
});