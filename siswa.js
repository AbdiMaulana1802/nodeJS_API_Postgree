const express = require("express");
const app = express();
const pool = require('./db');

app.use(express.json()) // => reg.body

//ROUTES//

//get all todos
app.get("/siswa", async(req, res) => {
    try {
        const allSiswa = await pool.query("SELECT * FROM data_siswa");

        res.json(allSiswa.rows);

    } catch (err) {
        console.error(err.message);

    }

});

//get a todo

app.get("/siswa/:id", async(req, res) => {
    const { id } = req.params;

    try {
        const data_siswa = await pool.query("SELECT * FROM data_siswa WHERE id_siswa = $1", [id])
        res.json(data_siswa.rows[0]);

    } catch (err) {
        console.error(err.message);

    }

});

//create a todo

app.post("/siswa", async(req, res) => {
    try {
        const { nama_siswa } = req.body;
        const { nisn } = req.body;
        const { kelas } = req.body;
        const { alamat } = req.body;
        const newTodo = await pool.query("INSERT INTO data_siswa (nama_siswa,nisn,kelas,alamat) VALUES ($1,$2,$3,$4) RETURNING *", [nama_siswa, nisn, kelas, alamat]);

        res.json(newTodo.rows[0]);

    } catch (err) {
        console.error(err.message);

    }

});

//update a todo
app.put("/siswa/:id", async(req, res) => {
    try {
        const { id } = req.params; //where
        const { nama_siswa } = req.body;
        const { nisn } = req.body;
        const { kelas } = req.body;
        const { alamat } = req.body;

        const updateTodo = await pool.query("UPDATE data_siswa SET nama_siswa = $1, nisn = $2, kelas = $3, alamat = $4  WHERE id_siswa = $5", [nama_siswa, nisn, kelas, alamat, id]);
        res.json("data telah di update !");

    } catch (err) {
        console.error(err.message);


    }
});

//delete a todo

app.delete("/siswa/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM data_siswa WHERE id_siswa = $1", [id]
        );
        res.json("Data telah di hapus");

    } catch (err) {
        console.error(err.message);
    }

});



app.listen(3000, () => {
    console.log("Localhostnya memakai port 3000")
});