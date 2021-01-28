const express = require('express');
const mongoose = require('mongoose');

require('dotenv/config');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//midllewears
app.use(cors());
app.use(bodyParser.json());


app.get('/',(req,res) => {
    res.send("home");
});

//db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const filmsRouter = require('./routes/films')
app.use('/films', filmsRouter)

app.listen(3000, () => console.log('Server Started'))