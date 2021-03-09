'use strict';

var flowy = require('flowy');
var request = require('request');
var cheerio = require('cheerio');

module.exports = function(term) {
  return new Promise((ok, nok) => {
    var url = urlForTerm(term);
    request(url, (err, res, body) => {
      if (err) return nok(err)
      if (res.statusCode != 200) {
        throw new Error(`Bad status (${res.statusCode}) for the url: ${url}`)
      }
      return ok(stripBody(body))
    });
  })
};

function urlForTerm(term) {
    var langs = {
        deen: 'http://pocket.dict.cc',
        deru: 'http://deru.pocket.dict.cc'
    };

    var lang = term.match(/[а-яА-Я]/) ? 'deru' : 'deen';
    return langs[lang] + '?s=' + encodeURIComponent(term);
}

function stripBody(html) {
  var $ = cheerio.load(html);
  var results = $.html('body > div > dl')
  return results && `<div class="dictcc">${results}</div>`
}
