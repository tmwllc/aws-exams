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
app.set('view engine', 'handlebars');

// Middleware to expose the app's shared templates to the cliet-side of the app
// for pages which need them.
function exposeTemplates(req, res, next) {
  // Uses the `ExpressHandlebars` instance to get the get the **precompiled**
  // templates which will be shared with the client-side of the app.
  hbs.getTemplates('shared/templates/', {
    cache      : app.enabled('view cache'),
    precompiled: true
  }).then(function (templates) {
      // RegExp to remove the ".handlebars" extension from the template names.
      var extRegex = new RegExp(hbs.extname + '$');

      // Creates an array of templates which are exposed via
      // `res.locals.templates`.
      templates = Object.keys(templates).map(function (name) {
        return {
          name    : name.replace(extRegex, ''),
          template: templates[name]
        };
      });

      // Exposes the templates during view rendering.
      if (templates.length) {
        res.locals.templates = templates;
      }

      setImmediate(next);
    })
    .catch(next);
}

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

app.use(express.static('public'));

app.use(function(req, res) {
  res.status(404).send('File Not Found');
});

app.use(function(error, req, res) {
  console.error(error.stack);
  res.status(505).send('Internal Server Error');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000');
});
