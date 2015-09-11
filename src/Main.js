//Gets links and writes dump of profile data to file
//
// import modules.
var async = require("async");
var fs = require('fs');
require('./ProjectClass.js');
var p = require('./parseProjDatafromJSON');
var split = require('./SplitTxtEachProj.js');
var request = require("request");

function d(callback) {
    function writeToFile(data) {
        fs.writeFile('rawProfileContent2.txt', data, function () {
            console.log('file written!!!!!!!!');
            //split.split();
        callback();
        })
    }

// import function to scrape profile
    var GetProfileLinks = require('./GetProfileLinks_FromDump.js');
// all profile urls consist of this url
    var baseURL = 'https://www.lendwithcare.org/';
// calls function from getlinksfromdump module that parses JSON object and returns array of profile links
    var linksArr = GetProfileLinks.getProfileLinks;
// t termporarily stoes data for each scrape to dump to file
    var t = [];

//count responses received
    var responseCount = 0;
//scrape profiles
    for (var i = 0; i < 40; i++) {
        //concatenate base url with profile link url to give request url
        var urlCur = baseURL + linksArr[i];

        request(urlCur, function (error, response, body) {
            t.push(body);
            // increment response counter to keep track of responses received
            if (response) {
                responseCount++
            }
            // this should be set to (last loop value -1) to ensure file is written after
            // all responses have been received
            if (responseCount === 39) {
                writeToFile(t, callback);

            }
        });
    }

}
async.series([
        function tom(callback){
            // get links from casper links collection and scrape each profile then dump all contents
            console.log('step one!');
            d(function(){
                console.log('ok done - now  run alis');
                callback(null, 'two');});
        },
        function alis(callback){
            // split files from dumped contents to individual projs and write to individualprojectsRaw.json
            console.log('step two! - alis run');
            split.split ( callback(null , 'two'));
        },
        function parsey(callback){
            // get links from casper links collection and scrape each profile then dump all contents
            console.log('step three!');
           p.parsey(function(){
                console.log('ok final parse and write done');
                callback(null, 'two');});
        }
    ],
// optional callback
    function(err, results){
        // results is now equal to ['one', 'two']
    });

