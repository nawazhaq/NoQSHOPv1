var express = require('express')
var app = express()

var rp = require('request-promise')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
});

var itemList = [];

/*
   function: items - Retrieves the item detail based on bar code
   API Used : Walmart api.walmartlabs.com/v1/items/
   APIKey:pr2u3rcd89wt5wgjpf9u72w6

 */


//Get price and description of individual scanned item
app.get('/items', function(request, response) {
  var barCode = request.query.id;
  console.log('Retrieving the bar code::'+barCode);
    var listOfItems = [];
    listOfItems  =  addToCart({description:'Milk',price:"$10",rating:"****"});
  rp('http://api.walmartlabs.com/v1/items/12417832?format=json&apiKey=pr2u3rcd89wt5wgjpf9u72w6')
    .then(function (htmlString) {
      console.log('Response from WALMART API:'+htmlString);
      sendSMSToCustomer('Exclusive Offer!! milk at $2 / gallon.');
    })
    .catch(function (err) {
      // Crawling failed...
    });
  response.status(200).send(listOfItems);
});

function addToCart(item) {
  itemList.push(item);
  return itemList;

}

/*
 function: checkout - VISA
 API Used : VISA checkout
 APIKey:pr2u3rcd89wt5wgjpf9u72w6
 SS:
 */


app.post('/checkout', function(request, response) {

  //1.Call visa checkout to submit the payment

  //2.Notify customer with sms
  var msg = 'Hey Mr Nawaz.Thank for shopping .Your bill is ready at mymart.com/showbill?id=122.Total $25.!';
  sendSMSToCustomer(msg);

  //3.Update the walmart inventory
  response.status(200).send({});
});


/*
 function: Notifies customer with e-bill.
 API Used : TWILLIO API
 APIKey:ACbf0eb2acf8616bf6fb8c7f5891405e52
 SS:5245952438c95862fa42c46b72251d3a
 */

function sendSMSToCustomer(msg) {
  var client = require('twilio')('ACbf0eb2acf8616bf6fb8c7f5891405e52', '5245952438c95862fa42c46b72251d3a');
  client.sms.messages.create({
    body: msg,
    to: "+14805227910",
    from: "+16234321466"
  }, function(err, sms) {
    console.log(sms);
  });
}

app.get('/notify', function(request, response) {
  sendSMSToCustomer();
  response.status(200).send({});

});


//Update my list
app.get('/items', function(request, response) {
  response.status(200).send([{description:'Goodies',price:"$10",rating:"****"},{description:'IceCream',price:"$5",rating:"**"},{description:'Milk',price:"$2",rating:"****"}]);
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
