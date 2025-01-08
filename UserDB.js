const express = require('express');
const pg = require('pg');
const app = express();
const port = 8081;
const cors = require('cors');


app.use(cors());


const pool = new pg.Pool({
    user: 'benjman',
    host: 'localhost',
    database: 'backyardtally_db',
    password: '0624',
    port: 5432,
});

app.use(express.json());


app.get('/', async(req,res) => { 
    res.status(200).json("test");
})


app.get('/userdb', async(req,res) => { 
    res.status(200).json("test");
})
app.post('/userdb', async (req, res) => {
    console.log(JSON.stringify(req.body))
    
    console.log("create user" + JSON.stringify(req.body));
    try {
        const query = 'INSERT INTO backyardtally.user_scores(username,ppr,dpr)  values ( $1,$2,$3 )';
        const values = [req.body.username, req.body.ppr, req.body.dpr];
        const result = await pool.query(query, values);
        res.status(200).json({ message:'DATA INSERTED SUCCESS', data:result.rows });

/*
const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
const values = ['brianc', 'brian.m.carlson@gmail.com']
 
const res = await client.query(text, values)
console.log(res.rows[0])*/

    } catch (err) {
        console.error('ERROR', err);
        res.status(500).json({message: 'ERROR INSERTING DATA', error: err});
    }
});

app.put('/userdb', async (req, res) => {
    console.log(JSON.stringify(req.body));
    const { username, ppr, dpr } = req.body;
    try{
        const query = `
        UPDATE backyardtally.user_scores
        SET ppr = $1, dpr = $2
        WHERE username = $3
        RETURNING *;
        `;
        const value = [ppr, dpr, username];

        const result = await pool.query(query, value);
        console.log(JSON.stringify(value));
        console.log(JSON.stringify(result));
        if (result.rowCount > 0) {
            console.log(JSON.stringify(result))
            res.json({
                success: true,
                message: 'USER UPDATED',
                user: result.rows[0],
            });
        }else {
            res.status(404).json({ success: false, message: 'User not found'});
        }
    } catch (err) {
        console.error('ERROR', err);
    }
})

app.get('/', async(req, res) =>{
    try {
        const res = await pool.query('SELECT * FROM backyardtally.user_scores');
        const rows = res.rows;
        res.render('index', { rows });
        } catch (err) {
            console.error('Error fetching data', err);
            res.status(500).send('ERROR FETCHING')
        }
    });


app.listen(port, () => {
    console.log(`Server on ${port} `);
});


