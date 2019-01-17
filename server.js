var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');
const socket = require('socket.io');

var config = require('./config.json');
var Note = require('./server/schema/note');
//importing routes
var route = require('./server/controller/note.js');
//port number
var port = process.env.PORT || 3011;
//connect to mongodb
mongoose.connect(config.MONOGO_DB_URL);
//on mongodb connection error
mongoose.connection.on('error', function (err) {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
    console.log(err);
    mongoose.disconnect();
});
//on mongodb connected
mongoose.connection.on('connected', function () {
    console.log('MongoDB connected!');
});
//express app object
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var server = app.listen(port, (err) => {
    console.log('NotesSaver server started at port: ' + port);
});

var io = socket(server);

io.on('connection', function(socket){
    console.log('Made socket connection');
    console.log('Made socket connection',socket.id);
})


// https://stackoverflow.com/questions/25463423/res-sendfile-absolute-path

app.get('/', function (req, res) {
    // res.send('Hello Prashansha here..')
    res.sendFile('index.html', {root:path.join(__dirname,'./')})
});



var apiRoutes = express.Router();

//Adding middleware, to add middleware we need cors, nody-parser
app.use(cors());

//static files
app.use(express.static(path.join(__dirname)));

//For creating route to home page
app.get('/', (req, res) => {
    res.send('NotesSaver app');
});

//Here all route api call with this particular route. eg. /api/createnote
app.use('/notesaver', route);



app.use('/app', apiRoutes)



console.log('Magic happens at http://localhost:' + port);
