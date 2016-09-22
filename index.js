var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
});

var itemList = [];
//Get price and description of individual scanned item
app.get('/items', function(request, response) {
  console.log('Retrieving');
  var barCode = request.query.id;

  //1.Make call to merchant API to get price and description

  //2.Add the item to the list

    var listOfItems = [];

    listOfItems  =  addToCart({description:'Goodies',price:"$10"});

  //3.Return the list

  response.status(200).send(listOfItems);
});


function addToCart(item) {

  itemList.push(item);
  console.log('push');
  return itemList;

}

app.post('/items', function(request, response) {
  var barCode = request.query.id;
  response.status(200).send([{description:'Goodies',price:10},{description:'IceCream',price:5},{description:'Milk',price:2}]);
});


app.get('/items', function(request, response) {

  var query = request.query.id;
  response.status(200).send([{description:'Goodies',price:10},{description:'IceCream',price:5},{description:'Milk',price:2}]);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
