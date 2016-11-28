var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '../src')));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.listen(9000, function () {
  console.log('Starting server on port 9000');
});


app.post('/sendmail', function(request, response){
    
   console.log(request.firstName)
   console.log(request.name)

/*
	var nodemailer = require('nodemailer');

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: '"Fred Foo ?" <foo@blurdybloop.com>', // sender address
		to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
		subject: 'Hello ✔', // Subject line
		text: 'Hello world ?', // plaintext body
		html: '<b>Hello world ?</b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});
	* 
*/

    
    response.send("success");

});
