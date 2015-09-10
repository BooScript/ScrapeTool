//Gets links and writes dump of profile data to file
//
// import modules.
var fs = require('fs');
require('./ProjectClass.js');
//var p = require('./parseProjDatafromJSON.js');
var scrape = require('./profileScrape.js');
var separator = require('./SplitTxtEachProj.js');



// import function to scrape profile
var GetProfileLinks = require('./GetProfileLinks_FromDump.js');
// all profile urls consist of this url
var baseURL = 'https://www.lendwithcare.org/';

// calls function from getlinksfromdump module that parses JSON object and returns array of profile links
var linksArr = GetProfileLinks.getProfileLinks;



// loop for each ink - scrape - then dump contents to rawcontent.txt file

    return new Promise(function (resolve, reject) {

        scrape.profileScrape(baseURL, linksArr, function(){
            separator.separateDumpToProjs();
        });
    });
