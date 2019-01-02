var express = require('express');
var app = express();


///////////////////////////////////////////////////////////////////
//CORS Middleware, causes Express to allow Cross-Origin Requests
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',
            'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers',
            'Content-Type');
    next();
}
app.use(allowCrossDomain);
///////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////
//needed for post operation to parse request.body
app.use(express.bodyParser());
///////////////////////////////////////////////////////////////////

app.use('/scripts', express.static(__dirname + '/scripts'));
app.use(express.static(__dirname));

var PORT = 9898; // /////////////////////////////use your port number

app.listen(PORT);



app.get('/generate', function (request, response) {
    var shapes = ["square", "circle", "triangle"];
    var i = parseInt(Math.random() * shapes.length);
    var colours = ["red", "blue", "yellow", "green", "purple", "pink", "black"];
    var j = parseInt(Math.random() * colours.length);
    //draw(shapes[i], colours[j]);
    //create an object
     var newObj = {
                    "Shape": shapes[i],
                    "Color": colours[j]
                };
    return response.send(200, newObj);
});

