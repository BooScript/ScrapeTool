/**
 * Created by Tom on 07/09/2015.
 */// scrapes a given profile


//expose function for profile scrape
module.exports.profileScrape = profileScrape;

//expose arrays to hold scraped profile data
    //expose array that stores body of dom
module.exports.profileDataRaw =  profileDataRaw;
    //expose array that stores selected elements of dom
module.exports.profileDataSelected = profileDataSelected;

//import modules
var fs = require('fs');
var request = require("request");
//    cheerio = require("cheerio");

//array to store dump of entire body from DOM for profiles
var profileDataRaw = [];
// array to store explicit elements mentioned in profilescrape function
var profileDataSelected = [];

function profileScrape(queryUrl, lastScrape) {


// function that takes an array of project urls to query and returns object of all projects attributes

    request(queryUrl, function (error, response, body) {
        if (!error) {

            // write file shouldnt be there
            //it is only used to provide the callback function as i didnt know how else to implement it
            fs.writeFile('gg.txt', 'h', function(){
            console.log('called');
                profileDataRaw.push(body);
             //   profileDataSelected.push(keyAttributes);
                if(lastScrape) {
                    console.log(profileDataRaw);

                    fs.writeFile('ggp.txt', profileDataRaw, function () {
                        console.log('file written!!!!!!!!');
                    });
                }
            });
                return true;

        }
        if (error) {
            console.log('http request failed to give response');
        }

    });

}
