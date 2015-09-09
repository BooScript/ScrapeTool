//Gets links and writes dump of profile data to file
//
// import modules.
var fs = require('fs');
require('./ProjectClass.js');
//var p = require('./parseProjDatafromJSON.js');
var scrape = require('./profileScrape.js');
var request = require("request");

// import function to scrape profile
var GetProfileLinks = require('./GetProfileLinks_FromDump.js');
// all profile urls consist of this url
var baseURL = 'https://www.lendwithcare.org/';
// get array of funded project profile links
var linksArr = GetProfileLinks.getProfileLinks;
var t = [];
// initialise writable stream

function writeToFile(data) {
    fs.writeFile('rawProfileContent2.txt', data, function () {
        console.log('file written!!!!!!!!');
    })
}
//count responses received
var responseCount = 0;
//scrape profiles
for (var i = 0; i < 40; i++) {

    //concatenate base url with profile link url to give request url
    var urlCur = baseURL + linksArr[i];

    request(urlCur, function(error, response, body){
            t.push(body);
            // increment response counter to keep track of responses received
            if(response){responseCount++}
           // this should be set to (last loop value -1) to ensure file is written after
          // all responses have been received
            if(responseCount === 39){writeToFile(t)}
        });

}


