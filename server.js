var express = require('express');
var hbs = require('hbs');
var fs =require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res,next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) 
			console.log('Error cant write log');
	});
	next();
})

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());


app.get('/', (req, res) => {
	res.render('homepage.hbs', {
		pageTitle:'Home Page',
		welcomeMessage: 'Welcome to the HOME PAGE',
	});
});

app.get('/about',(req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Page error'
	});
});


app.listen(3000, ()=> {
	console.log('Server listening on port 3000');
});



