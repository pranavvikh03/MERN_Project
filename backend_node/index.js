const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')

connectToMongo();
const app = express()
const port = 80;

app.use(express.json())
app.use(cors())
app.use('/api/auth', require("./routes/auth"))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res)=>{
    console.log("Homepage");
});

app.listen(port,()=>{
    console.log(`Server is listening on ${port} port`);
});