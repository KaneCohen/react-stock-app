const fetch = require('isomorphic-fetch');
const express = require('express');
const app = express();

app.get('/fetch', (req, res) => {
  if (typeof req.query.symbol === 'undefined') {
    res.send('');
  }

  fetch(`http://data.benzinga.com/rest/richquoteDelayed?symbols=${req.query.symbol}`)
    .then(response => {
      if (response.status >= 400) {
        res.status(response.status).send('Error WHile Fetching Data');
      }
      return response.json();
    })
    .then(response => {
      res.json(response);
    });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(5105, () => {
  console.log('App listening on port 5105');
});
