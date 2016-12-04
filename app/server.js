var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../src')));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.listen(9000, function () {
  console.log('Starting server on port 9000');
});


app.post('/sendmail', function(request, response, body){

   console.log(JSON.stringify(request.body));
   
    var password = "passhere"

	var nodemailer = require('nodemailer');

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport('smtps://benvalinesite%40gmail.com:' + password + '@smtp.gmail.com');

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: '"' + request.body.value.name + ' ?" <' + request.body.value.email + '>', // sender address
		to: 'benvalinesite@gmail.com', // list of receivers
		subject: 'from name: ' + request.body.value.name + ' email: ' + request.body.value.email, // Subject line
		text: request.body.value.message, // plaintext body
		html: request.body.value.message // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});

    
    response.send("success");

});
