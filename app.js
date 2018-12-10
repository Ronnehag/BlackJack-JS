const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// Sets view engine to ejs, default folder is 'views'
app.set('view engine', 'ejs');

// Adding routes
app.use(require('./routes/gameRoute'));

// Renders index page
app.get('/', (req, res) => {
    res.render('index');
});

// Listen to port set in package.json, otherwise 4000.
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});