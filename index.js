var dotEnv          = require('dotenv').config(),
    express         = require('express'),
    morgan          = require('morgan'),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    app             = express(),
    apiAuthRouter   = require('./server/routes/api/auth.js'),
    apiUsersRouter = require('./server/routes/api/users.js'),
    path = require('path'),
    ejsLayouts = require('express-ejs-layouts'),
    igdb = require('igdb-api-node').default;


// connect to db
// process.env.MONGOLAB_URI is DEPRECATED
// process.env.MONGODB_URI is needed for when we deploy to Heroku
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/start-select-db' );

// log requests to STDOUT
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// set view engine
app.set('view engine', 'ejs');

// ejs
app.use(ejsLayouts);

// flash messages, NEEDS express-flash
// app.use(flash())

// This is how we read the cookies sent over from the browser
app.use(cookieParser());

// set static file root folder
app.use(express.static(__dirname + '/client/public'));

// set views folder
app.set('views', path.join(__dirname, '/server/views'));

// IGDB
const apiKey = process.env.IGDB_API_KEY;
const client = igdb(apiKey);

// root view
app.get('/', function (req, res) {
  res.render('home');
});

app.get('/getVideoGameData', function (req, res) {
  console.log('REQ.BODY = ', req.body);
  client.games({
    // search: req.body, // Sends search query
    fields: 'name',
    limit: 5, // Limit to 5 results
    offset: 15 // Index offset for results
  }).then(response => {
    console.log(response)
      res.send(response);
  }).catch(error => {
    throw error;
  });
});

// API call



app.use('/api/auth', apiAuthRouter);
app.use('/api/users', apiUsersRouter);

// Listen on port for connections
// process.env.PORT is needed for when we deploy to Heroku
var port = process.env.PORT || 3000;
app.listen( port, function() {
  console.log('Server running on port:3000');
});
