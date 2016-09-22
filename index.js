var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
});

app.get('/items', function(request, response) {

  var query = request.query.id;
  response.status(200).send([{description:'Goodies',price:10},{description:'IceCream',price:5},{description:'Milk',price:2}]);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
