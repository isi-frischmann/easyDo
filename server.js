const path = require('path');

const port = 8000;

// express
var express = require('express');
const app = express();

// bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static( __dirname + '/public/dist/public'));


// ============ Session ============
const session = require('express-session');
app.use(session({
    secret: 'secretSessions',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 100 } // maxAge is in milliseconds
}));

// ============ Flash Messages ============
const flash = require('express-flash');
app.use(flash());

const dbName = 'toDo_db';

// DB connection
require('./server/config/mongoose.js')(dbName);


// model file
require('./server/models/toDo.models.js');


// routes
require('./server/config/routes.js')(app);

//  show all 
 app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./public/dist/public/index.html'))
});

const server = app.listen(port);