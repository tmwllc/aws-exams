'use strict';

var express = require('express'),
  exphbs = require('express-handlebars'),
  app = express(),
  hbs = exphbs.create({
    defaultLayout: 'main',
    partialsDir: [
      'shared/templates',
      'views/partials'
    ]
  });

app.engine('handlebars', hbs.engine);
app.set('port', process.env.port || 3000);
app.set('view engine', 'handlebars');
app.get('/', function(req, res) {
  res.render('index', {
    title: 'AWS Exam Tips',
    homeLinkClass: 'active'
  });
});

app.get('/developer-associate', function(req, res) {
  res.render('developer-associate', {
    title: 'Developer Associate',
    certification: 'developer-associate',
    devLinkClass: 'active'
  });
});

app.get('/solutions-architect-associate', function(req, res) {
  res.render('solutions-architect-associate', {
    title: 'Solutions Architect Associate',
    certification: 'solutions-architect-associate',
    saLinkClass: 'active'
  });
});

app.get('/sysops-admin-associate', function(req, res) {
  res.render('sysops-admin-associate', {
    title: 'SysOps Administrator Associate',
    certification: 'sysops-admin-associate',
    sysOpsLinkClass: 'active'
  })
})

app.use(express.static('public'));

app.use(function(req, res) {
  res.status(404).send('File Not Found');
});

app.use(function(error, req, res) {
  console.error(error.stack);
  res.status(505).send('Internal Server Error');
});

app.use(function(err, req, res) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(app.get('port'), function() {
  console.log('Example app listening on port 3000');
});
