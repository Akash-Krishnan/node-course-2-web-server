var express = require('express');
var hbs = require('hbs');
var fs =require('fs');
var port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



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

// IF Maintainence 
// app.use((req, res, next) => {
// 	res.render('maintainence.hbs');
// })

app.use(express.static(__dirname + '/public'));

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

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle:'Proect Page',
		content: 'Our major projects'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Page error'
	});
});


app.listen(port, ()=> {
	console.log(`Server listening on port ${port}`);
});



