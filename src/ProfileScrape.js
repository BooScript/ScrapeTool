/**
 * Created by Tom on 07/09/2015.
 */
// scrapes a given profile
module.exports.profileScrape = profileScrape;

var request = require("request"),

    cheerio = require("cheerio");

function profileScrape(queryUrl) {

// function that takes an array of project urls to query and returns object of all projects attributes
//function getKeyAttributes(queryUrlArr){}
    request(queryUrl, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body);

            //initialise empty array to store key project attributes
            var keyAttributes = [];
            $('h1').each(function () {
                keyAttributes.push(this.children[0].data);
            });
            $('label').each(function () {
                keyAttributes.push(this.children[0].data);
            });


            $('p').each(function () {
                keyAttributes.push(this.children[0].data);
            });

            $('span.time').each(function () {
                keyAttributes.push(this.children[0].data);
            });
            $('div.gm-style').each(function () {
                keyAttributes.push(this.children.data);
            });

            // loop for each h3 element on page and push key attributes to array
            $('h3').each(function () {
                keyAttributes.push(this.children[0].data);
            });

            $('.span').each(function () {
                keyAttributes.push(this.children[0].data);
            });

            $('td').each(function () {
                keyAttributes.push(this.children[0].data);
            });



            console.log(keyAttributes);
        }
        if (error) {
            console.log('http request failed to give response');
        }

        return keyAttributes;
    });

}