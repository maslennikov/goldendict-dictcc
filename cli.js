'use strict';

var lookup = require('.');

var term = process.argv.slice(2).join(' ');

lookup(term)
  .catch(err => '<span style="color: red">' + err.message + '</span>')
  .then(result => {
    console.log(result || '<span class=".noresult">No results</span>')
  })
