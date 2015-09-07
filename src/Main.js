// import modules.

var fs = require('fs');

require('./ProjectClass.js');
var scrape = require('./profileScrape.js');


// import function to scrape profile
var GetProfileLinks = require('./GetProfileLinks_FromDump.js');

// all profile urls consist of this url
var baseURL = 'https://www.lendwithcare.org/';

//test projattr class is exposed
console.log( projectAttr);

// get array of funded project profile links
var linksArr = GetProfileLinks.getProfileLinks;

//array to hold project data
var profileDataRaw = [];


//scrape profiles
for (var i = 0; i < 20; i++ ) {
    //concatenate base url with profile link url
    var urlCur = baseURL + linksArr[i];

    profileDataRaw.push(scrape.profileScrape(urlCur));
}


// array to hold individual profile data
//var profilesArr = [];

//loop through

// write key project attributes to JSON file for completed projects
//fs.write('CompletedProjects.json', JSON.stringify(), 'w');
