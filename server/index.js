const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const fs = require("fs");
app.use(cors());
app.use(express.json());

//initialize table
app.post("/game", async(req,res)=>{
    try {
        var sql = fs.readFileSync('database.sql').toString();
        const newGame = await pool.query(sql);
        res.json(newGame.rows);
    } catch (error) {
        console.log("error")
        console.log(error.message);
        res.status(500).send(error.message)
    }
})

//get table
app.get("/game/get/:table/:data/:condition", async(req,res)=>{
    try {
        const table = req.params.table;
        const data = req.params.data;
        const condition = req.params.condition;
        //e.g http://localhost:5321/game/match_in/*/true is same as SELECT * FROM match_in
        //    http://localhost:5321/game/match_in/name/match_id > 2 is same as SELECT name FROM match_in WHERE match_id > 2


        const allGames = await pool.query(`SELECT ${data} FROM ${table} WHERE ${condition}`);
        console.log(allGames.rows);
        res.json(allGames.rows);
    } catch (error) {
        console.log("error")
        console.log(error.message);
        res.status(500).send(error.message)
    }
})

//Delete tuple
app.delete("/game/delete/:table/:attribute/:value", async(req,res)=>{
    try {
        const table = req.params.table;
        const attribute = req.params.attribute;
        const value = req.params.value;
        console.log(table)
        console.log(attribute)
        console.log(value)
        const deleteTuple = await pool.query(`DELETE FROM ${table} WHERE ${attribute} = '${value}'`);
       
        res.json("Deleted!");
    } catch (error) {
        console.log("error")
        console.log(error.message);
        res.status(500).send(error.message)
    }
})

//Insert tuple

app.put("/game/insert/:table/:value", async(req,res)=>{
    try {
        //e.g http://localhost:5321/game/insert/items/'NewItem', '+150 ability power', '3600'
        //same as INSERT INTO items ('NewItem', '+150 ability power', '3600');
        const table = req.params.table;
        const value = req.params.value;
        const deleteTuple = await pool.query(`INSERT INTO ${table} VALUES (${value})`);
        res.json("Inserted!");
    } catch (error) {
        console.log("error")
        console.log(error.message);
        res.status(500).send(error.message)
    }
})

//Update tuple
app.put("/game/update/:table/:value/:condition", async(req,res)=>{

    //e.g http://localhost:5321/game/update/items/function='none'/name='newitems'
    //same as UPDATE items SET function = 'none' WHERE name='newitems';
     try {
        const table = req.params.table;
        const value = req.params.value;
        const condition = req.params.condition;
        const deleteTuple = await pool.query(`UPDATE ${table} SET ${value} WHERE ${condition}`);
       
        res.json("Updated!");
    } catch (error) {
        console.log("error")
        console.log(error.message);
        res.status(500).send(error.message)
    }
})

app.listen(5321,()=>{
    console.log("server started on 5321 port")
});