/**
 * Created by Tom on 07/09/2015.
 */// scrapes a given profile and then writes all content to rawcontent.txt
var request = require("request");
var separator = require('./SplitTxtEachProj.js');
var fs = require('fs');
//expose function for profile scrape
module.exports.profileScrape = scrapeProfiles;

function writeToFile(data, callback) {
    fs.writeFile('rawProfileContent2.txt', data, function () {
        console.log('dump file written!!!!!!!!');
        //now call callback which splits dump to individual projects
        callback();
    })

}

//scrape profiles and write dump to rawcontent file
function scrapeProfiles(baseURL, linksArr, callback) {
    // t termporarily stoes data for each scrape to dump to file
    var temporaryStore = [];
    //count responses received
    var responseCount = 0;
    var length = linksArr.length;
    for (var i = 0; i <length; i++) {
        //concatenate base url with profile link url to give request url
        var urlCur = baseURL + linksArr[i];

        request(urlCur, function (error, response, body) {
            temporaryStore.push(body);
            // increment response counter to keep track of responses received
            if (response) {
                responseCount++
            }
            // this should be set to (last loop value -1) to ensure file is written after
            // all responses have been received
            if (responseCount == 39) {
               console.log('dump written');
                 writeToFile(temporaryStore, callback);



            }
        });
    }
}
