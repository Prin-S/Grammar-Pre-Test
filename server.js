'use strict';

require('dotenv').config();

const express = require('express');
let app = express();
app.use('/public', express.static(process.cwd() + '/public'));

const router = express.Router();

//const cors = require('cors');

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routing for API
const routes = require('./routes/api.js');
routes(app);

router.get('/', (req, res) => {
  routes.then(data => {
      const chartData = data.map(d => {
          return {
              percentages: d.percentages
          };
      });
      //res.render('index', { chartData });
      console.log("yay");
  }).catch(err => {
      console.log(err);
  });
});

module.exports = router;

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.route('/:entry/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/result.html');
});

//404 Not Found
app.use(function(req, res) {
    res.status(404)
      .type('text')
      .send('Not Found');
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});