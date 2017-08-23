exports.LOGGED_USERS = [];
var express = require("express"),
    app = express(),
	path = require('path'),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    auth = require('./routes/auth.js'),
    db = require('./config_db').db;

app.use(express.static('public'));

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

    next();
}

app.use(allowCrossDomain);

// HTML read
var fileSystem = require("fs");

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
app.all('/app/*', [require('./middlewares/validateRequest')]);


// Index route
var router = express.Router();

/*
 * Routes that can be accessed by any one
 */
router.get('/prueba', function(req, res) {
    console.log(db);
    var client = db.connect("agenda");
    db.query('SELECT * FROM sla limit 100', client, res2 => {
        db.disconnect(client)
        res.send(res2.rows)
    },e => {
        db.disconnect(client)
        res.status(500).send("ERROR");
    })
});

router.route('/login').post(auth.login);

router.get('/app', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/', 'app.html'));
});

app.get('/app/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/', 'app.html'));
})

app.use(router);

/*
 * Routes that can be accessed only by autheticated users (API routes)
 */
// var usuarioRoutersHandler = require("./routersHandlers/usuarioRoutersHandler").getUsuarioRoutersHandler(express);
// app.use('/api/v1/', usuarioRoutersHandler);


var port = process.env.PORT||3000;
// Start server
var server = app.listen(port, function() {
	console.log("Node server running on port " + port);
});


/*
require('jsreport')({ httpPort: 3001, httpsPort: 0 }).init();

router.get('/reportexample.pdf' ,function(req,res,next){
  // var html = require('./public/factura.html');
  var post_data= JSON.stringify({
    template:{
      content: fs.readFileSync(path.join("./public/factura.html"), 'utf8'),
      engine: 'jsrender',
      recipe : 'phantom-pdf'
     },
    options:{
        'preview':'true'
    },
    data: {
        img_path: "http://localhost:3000/img/logo.png",
        razon_social: "LOLATO EDUARDO RICARDO"
    }
  });
  var post_options = {
      host: 'localhost',
      port: '3001',
      path: '/api/report',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
  };

  var post_req = http.request(post_options, function(response) {
      response.pipe(res);
    }).on('error', function(e) {
      res.sendStatus(500);
    });
    post_req.write(post_data);
    post_req.end();
});
*/
