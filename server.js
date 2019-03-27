const express = require('express');
const currency = require('./app.js')
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials((__dirname + '/views/partials'))

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('message', (text) => {
    return text.toUpperCase();
});

app.get('/404', (request, response) => {
    response.send({
        error: 'Page not found'
    })
});

app.use ((request, response, next) => {
    response.render('maint.hbs', {
        title:'thing'
    });
});
// app.use((request, response, next) => {
//     var time = new Date().toString();
//     // console.log(`${time}: ${request.method} ${request.url}`);
//     var log = `${time}: ${request.method} ${request.url}`;
//     fs.appendFile('server.log', log + '\n', (error) => {
//         if (error) {
//             console.log('unable to log message');
//         }
//     });
// //     next();
//
// });

app.get('/home', (request, response) => {
    response.render('main.hbs', {
        title:'Main page',
        welcome: 'Hello!',
        pages: ['/info', '/currency'],
    })
});

app.get('/404', (request, response) => {
    response.send({
        error: 'Page not found'
    })
});

// app.get('/', (request, response) => {
//     response.send('<h1>My Website</h1><a href="/info.html">About Me</a><br><a href="/currency.html">Currency Converter</a>')
// });

app.get('/info', (request, response) => {
    response.render('about.hbs', {
        title: 'About page',
        welcome: 'Hello!',
        pages: ['/home', '/currency']
    });
});

app.get('/currency', (request, response) => {
    currency.getResults(10, 'CAD', 'EUR').then((result) => {
        response.render('currency.hbs', {
            title: 'Currency converter',
            welcome: '',
            result: result,
            pages: ['/home', '/info']
        })    
    }).catch((error) => {
        response.send(error);
    })
});

app.listen(8080, () => {
    console.log('Server is up on the port 8080');
});