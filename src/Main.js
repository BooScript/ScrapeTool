// import modules.
//var Q = require('q');

var fs = require('fs');
var Promise = require("bluebird");
require('./ProjectClass.js');
var scrape = require('./profileScrape.js');


// import function to scrape profile
var GetProfileLinks = require('./GetProfileLinks_FromDump.js');

// all profile urls consist of this url
var baseURL = 'https://www.lendwithcare.org/';

//test projattr class is exposed
//console.log( projectAttr);

// get array of funded project profile links
var linksArr = GetProfileLinks.getProfileLinks;

var wstream = fs.createWriteStream('myOutput.txt');
//scrape profiles
for (var i = 0; i < 80; i++ ) {
    //concatenate base url with profile link url to give request url
    var urlCur = baseURL + linksArr[i];

// set i to determine last call in order to time file write to end of scraping operation
    if(i !== 79){ var t = scrape.profileScrape(urlCur);}
        else{var t = scrape.profileScrape(urlCur, true);}

    //setTimeout(null,5000);
}


// write key project attributes to JSON file for completed projects
//fs.write('CompletedProjects.json', JSON.stringify(), 'w');


