const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
require('express-async-errors');

//middlewares
app.use(cors({
    origin: '*'
}));
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api/category', require('./routes/category'));
app.use('/api/book', require('./routes/book'))
app.use('/api/copy', require('./routes/copy'))
app.use('/api/state', require('./routes/state'))
app.use('/api/card', require('./routes/card'))
app.use('/api/borrow', require('./routes/borrow'))
app.use('/api/fine', require('./routes/fine'))
app.use('/api/account', require('./routes/account'))
app.use('/api/auth', require('./routes/auth'))

app.get('*', (req, res) => {
    res.status(404).send("page not found");
});
app.use(require('./middlewares/error-handler'));

const PORT = process.env.PORT || process.env.LOCAL_PORT || 5000;
//async with connect database
app.listen(PORT, () => { console.log("on port " + PORT) });

//TODO
//UNIQUE CATEGORY + add "Other" category
//CRUD: check null or empty
//authenciation
//roles
//report
//mssql doesnt return nested error: proc -> trigger
//? change proc to return object after add, update,...
//? proc throw custom error on key conficts
