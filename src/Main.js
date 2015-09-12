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
// import function to get links
    var GetProfileLinks = require('./GetProfileLinks_FromDump.js');
// calls function from getlinksfromdump module that parses JSON object and returns array of profile links
    var linksArr = GetProfileLinks.getProfileLinks;
// all profile urls consist of this url
    var baseURL = 'https://www.lendwithcare.org/';
// t termporarily stoes data for each scrape to dump to file
    var t = [];


//scrape profiles
var limit = 10;
    var counter=0;
    async.eachLimit((linksArr), limit, function (url, index) { //The second argument (callback) is the continues the control flow
            var urlCur = baseURL + url;
            console.log(urlCur);

            request(urlCur, function (error, response, body) {
                    if(error){

                        console.log(error + urlCur );

                        return;
                    }
                    if(response) {
                        t.push(body);
                        console.log(url);
                        counter++; 
                        if(counter ==limit){
                            writeToFile(t, callback);
                        }
                    }
        },

        function(err){
          // if any of the file processing produced an error, err would equal that error
            if( err ) {
                // One of the iterations produced an error.
                // All processing will now stop.
             console.log('A request for a profile failed tokl,; process');
            } else {
                console.log('requests for all profiles have been processed successfully');

        }


        });
    });


}
async.series([
        function tom(callback){
            // get links from casper links collection and scrape each profile then dump all contents
            console.log('step one!');
            d(function(){
                console.log('ok done - now  run alis');
                callback(null, 'two');
            });
        },
        function alis(callback){
            // split files from dumped contents to individual projs and write to individualprojectsRaw.json
            console.log('step two! - alis run');
            split.split ( function() {
                console.log('calling final step');
                callback(null, 'three');
            });
        },
        function writeAttributesJSON(callback){
            // get links from casper links collection and scrape each profile then dump all contents
            console.log('step three!');
            p.parsey(function(){
                console.log('ok final parse done');
                callback(null, 'four');});
        }
    ],
// optional callback
    function(err, results){
        // results is now equal to ['one', 'two']
    });
