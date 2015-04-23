var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var http = require('http');

var config = require('./config')();
var routes = require('./controllers/index');
var users = require('./controllers/users');
var blog = require('./controllers/blog');
var admin = require('./controllers/admin')

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');

// Collins: Connect to mongo db. If failure, no work can be done
 mongoClient.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/blog',
      function(err, db){
        if (err) {
          console.log("Sorry, can't connect to the mongodb server ");
        }
        else {
          // Several callback can be registered for one request
          // next can assure next function is called
          var attachDB = function(req, res, next){
            req.db = db;
            next();
          }

          app.all('/blog*', attachDB, function(req, res, next) {
            blog.run(req, res, next);
          });

          app.all('/admin*', attachDB, function(req, res, next) {
            admin.run(req, res, next);
          });

          app.all('/users', attachDB, function(req, res, next) {
            users.run(req, res, next);
          })

          app.all('/', attachDB, function(req, res, next){
            routes.run(req, res, next);
          });

          http.createServer(app).listen(config.port, function(){
            console.log('Successfully connected to mongodb://' + config.mongo.host + ":" + config.mongo.port,
                      '\n Express server listening on port ' + config.port);
          });
        }

      });