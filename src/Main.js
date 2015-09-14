//Gets links and writes dump of profile data to file
//
var async = require("async");
var fs = require('fs');
var p = require('./parseProjDatafromJSON');
var split = require('./SplitTxtEachProj.js');
var request = require("request");
var _ = require("lodash");


function writeToFile(data, callback) {
    fs.writeFile('rawProfileContent2.txt', data, function () {
        console.log('file written - ' + 'rawProfileContent2.txt');
        callback();
    })
}

// import function to get links
var GetProfileLinks = require('./GetProfileLinks_FromDump.js');
// calls function from getlinksfromdump module that parses JSON object and returns array of profile links
var linksArr = GetProfileLinks.getProfileLinks;
// all profile urls consist of this url
var baseURL = 'https://www.lendwithcare.org/';

// t termporarily stores data for each scrape to dump to file
var t = [];


var requestCounter=0;
var responseCounter=0;
function scrapeProfiles(callback) {

    // while loops until each batch of requests is done
    while(requestCounter<linksArr.length) { // loops for all links - THIS WILL TIMEOUT - make into queue
        var limit = 4; // how many request to make at once

     //  requestCounter++
    }
    //return the array containing the data dump from scrapes on profiles
    return t;
}
/*
function ScrapeTask(){
    async.eachLimit((linksArr), limit, function (url, index) { //The second argument (callback) is the continues the control flow
        var urlCur = baseURL + url;
        console.log(requestCounter + ' ' + urlCur);
        requestCounter++;
        request(urlCur, function (error, response, body) {

                if (error) {
                    console.log(error + ' ' + urlCur);
                    return;
                }
                if (response) {
                    t.push(body);
                    console.log(url);
                    responseCounter++;
                    if (responseCounter == requestCounter) {
                        writeToFile(t, callback);
                    }
                }
            },
            function (error) {
                if (error) {
                    console.log(error);
                }
            });
    });
}
*/

function QueueRequests(callback1) {
    console.log("setting queue workers to action");



    var concurrency = 40; // number of request to run in parallel
    var tasksList = linksArr;


    var q = async.queue(function (task, callback) {
        console.log('performing task ' + task.name);
        var urlCur = baseURL + task.name;
        request(urlCur, function (error, response, body) {

                if (error) {
                    console.log(error + ' ' + urlCur);
                    return;
                }
                if (response) {
                    t.push(body);
                    console.log(urlCur);
                    responseCounter++;
                   callback();
                }
            },
            function (error) {
                if (error) {
                    console.log(error);
                }
                console.log('done');
            });

    }, concurrency);


    q.drain = function () {
        //pass call back to resume next step in async series after file is written
        writeToFile(t, callback1);
    };

    tasksList.forEach( function(task){
        q.push({name: task}, function(err){
            //done
            if(err){
                console.log(err);
            }
        })
    })

}



async.series([

        function Write_Scraped_Profiles_Dump_To_File(callback){
            console.log('scrapping..' + 'for completed funding projects');


            QueueRequests(function(callback1){
                console.log('ok done.');
                callback(null, 'two');
            });

        },
        function Split_Scraped_Profiles_To_JSON(callback){
            // split files from dumped contents to individual projs and write to individualprojectsRaw.json
            console.log('splitting...');
            split.split ( function() {
                console.log('ok done.');
                callback(null, 'three');
            });
        },
        function Regex_Gets_Attributes_ForEach_Project_Then_Writes_ToFile(callback){
            // get links from casper links collection and scrape each profile then dump all contents
            console.log('parsing...');
            p.parsey(function(){
                console.log('ok done.');
                callback(null, 'four');});
        }
    ],
// optional callback
    function(err, results){
        // results is now equal to
        if(err){
            console.log(err);
        }
    });
