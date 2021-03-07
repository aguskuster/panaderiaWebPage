const express = require('express');
const app = express();
const path = require('path');
const bp = require('body-parser');
const pool = require('./database');


app.use(express.static('public'));
app.use('/css', express.static(__dirname+'public/css'));
app.use('/js', express.static(__dirname+'public/js'));
app.use('/img', express.static(__dirname+'public/img'));


app.set('views','views');
app.set('view engine','ejs');

app.get('/', (req, res) => {
    res.render('index');
});


app.get('/productos', async (req, res) => {
    try {
        // get Connection
        const conn = await pool.getConnection();

        // Create Query 
        const query = 'select * from productos';

        //executing query
        const rows = await conn.query(query);
        //result
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
    }
});
app.use(bp.json());;
app.post('/new-product', async (req, res) => {
    console.log(req.body);
    
    // get Connection
    const conn = await pool.getConnection();

     // Create Query 
     const query = 'INSERT INTO productos (tipo,nombre) VALUES (?,?)';

    //executing query
    const result = await conn.query(query, [req.body.tipo, req.body.nombre]);
    //result
    res.status(200).json(result);
});


app.listen(3000, () => {
    console.log('Server on port', 3000);
});
