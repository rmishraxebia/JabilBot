var restify = require('restify');
var builder = require('botbuilder');

var http =  require("http");
var url =  require("url");
var markdown = require( "markdown" ).markdown;

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

//=========================================================
// Bots Dialogs
//=========================================================

var intents = new builder.IntentDialog();
bot.dialog('/', intents);

intents.matches(/^show orders for HP/i, [
    
    function (session, results) {
     // session.send('Ok... Changed your name to %s', session.userData.name);
		 var fs = require("fs");
	console.log("\n *STARTING* \n");
	// Get content from file
	var contents = fs.readFileSync("data.json");
	//console.log(JSON.stringify(contents));
	// Define to JSON type
	var jsonData = JSON.parse(contents);
	// Get Value from JSON
	console.log("Order_ID:", jsonData.Orders.Order_ID);
		console.log("Order_ID:", jsonData.Orders.Order_Name);
			console.log("Order_ID:", jsonData.Orders.Shipping_Date);
				console.log("Order_ID:", jsonData.Orders.Status);
			console.log("Order_ID:", jsonData.Orders.Supervisor.Name);		
					console.log("Products:", jsonData.Orders.Products);	
					var products = jsonData.Orders.Products;
					
					console.log("Products:1234", products);	
					
				//foreach( product in products){
				//	console.log("********:",product);	
				//	session.send(product.Product_Name);
				//}
				// var selectedCardName = results.response.entity;
			var card = createProductCard( products, session);

			// attach the card to the reply message
			var msg = new builder.Message(session).addAttachment(card);
			session.send(msg);
			for (var i = 0; i < products.length; i++) {
				link = '['+ products[i].Product_Name+']'+' (http://localhost:3978/fetchProduct)' +'\n' ;
			session.send(link +  products[i].WIP_Status);
			}
			
				
				 

    }
]);

intents.onDefault([
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    },
    function (session, results) {
        session.send('Hello %s!', session.userData.name);
    }
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);

function createProductCard(products, session) {
	var string=' ';
	 for (var i = 0; i < products.length; i++) {
					 console.log("****##***:",products[i].Product_Name);
					//session.send(products[i].Product_Name);	
						 string = string + products[i].Product_Name+'\r\n';
				 }
	var marked = require('marked');
    return new builder.HeroCard(session)
        .title('Customer Orders')
        .subtitle('Products in your order are :')
        .text(string)

		//.text('hi')
       // .images(getSampleCardImages(session))
       // .buttons(getSampleCardActions(session))
		;
}

bot.dialog('/fetchProduct', [
   
    function (prodName, session, results) {
			 var fs = require("fs");
        var contents = fs.readFileSync("data.json");
	//console.log(JSON.stringify(contents));
	// Define to JSON type
	var jsonData = JSON.parse(contents);
	// Get Value from JSON
	console.log("Order_ID:", jsonData.Orders.Order_ID);
		console.log("Order_ID:", jsonData.Orders.Order_Name);
			console.log("Order_ID:", jsonData.Orders.Shipping_Date);
				console.log("Order_ID:", jsonData.Orders.Status);
			console.log("Order_ID:", jsonData.Orders.Supervisor.Name);		
					console.log("Products:", jsonData.Orders.Products);	
					var products = jsonData.Orders.Products;
					var string= '';
					 for (var i = 0; i < products.length; i++) {
					 console.log("****##***:",products[i].Product_Name);
					//session.send(products[i].Product_Name);	
						 string = string + products[i].Product_Name+'\r\n';
						 if(products[i].WIP_Phase == 'Delayed'){
							 		var card = createDetailsCard( products, session);

			// attach the card to the reply message
			var msg = new builder.Message(session).addAttachment(card);
			session.send(msg);
						 }
							 
				 }
       // session.endDialog();
    }
]);


function createDetailsCard(products, session) {
	var string=' ';
	 for (var i = 0; i < products.length; i++) {
					 console.log("****#delayed#***:",products[i].Product_Name);
					//session.send(products[i].Product_Name);
				if(products[i].WIP_Phase == 'Delayed'){					
						 string = 'Product_Name:'+ products[i].Product_Name+' Order_Line:'+ products[i].Order_Line;
				 }
	 }
	 
	var marked = require('marked');
    return new builder.HeroCard(session)
        .title('Product Details')
  
        .text(string);
		console.log("Products:Delayed", string);	
}

intents.matches(/^show delayed orders for HP/i, [
    
    function (session, results) {
     // session.send('Ok... Changed your name to %s', session.userData.name);
		 var fs = require("fs");
	console.log("\n *STARTING* \n");
	// Get content from file
	var contents = fs.readFileSync("data.json");
	//console.log(JSON.stringify(contents));
	// Define to JSON type
	var jsonData = JSON.parse(contents);
	// Get Value from JSON
	console.log("Order_ID:", jsonData.Orders.Order_ID);
		console.log("Order_ID:", jsonData.Orders.Order_Name);
			console.log("Order_ID:", jsonData.Orders.Shipping_Date);
				console.log("Order_ID:", jsonData.Orders.Status);
			console.log("Order_ID:", jsonData.Orders.Supervisor.Name);		
					console.log("Products:", jsonData.Orders.Products);	
					var products = jsonData.Orders.Products;
					
					console.log("Products:1234", products);	
					
				//foreach( product in products){
				//	console.log("********:",product);	
				//	session.send(product.Product_Name);
				//}
				// var selectedCardName = results.response.entity;
			//var card = createProductCard( products, session);

			// attach the card to the reply message
			//var msg = new builder.Message(session).addAttachment(card);
			//session.send(msg);
			for (var i = 0; i < products.length; i++) {
				if(products[i].WIP_Status == 'Delayed'){
					 session.beginDialog('/fetchProduct');
				}
				//link = '['+ products[i].Product_Name+']'+' (http://localhost:3978/fetchProduct)' +'\n' ;
			//session.send(link +  products[i].WIP_Status);
			}
			
				
				 

    }]);

