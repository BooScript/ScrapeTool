/**
 * Created by Tom on 04/09/2015.
 */
var links = [];
var casper = require('casper').create();
var fs = require('fs');



function getProfileLinks() {
    var links = document.querySelectorAll('a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

casper.start('https://www.lendwithcare.org/search/completed/funded', function() {

});

casper.then(function(){
    //store css selector for  button that loads more content
    var buttonCss = '#card_container > div.paginate-more > button';

    for(var i=0; i<1; i++) {

        // when button appears echo
        casper.waitForSelector(buttonCss,

            function() {
                this.echo('the button has appeared [waitforselector]');
                this.click('#card_container > div.paginate-more > button');
            },

            function onTimeout(){this.echo('timed out before button element loaded in DOM')}, 15000
        );
    }this.capture('goog');
});

casper.then(function() {

    // aggregate links from page
    links = this.evaluate(getProfileLinks);

    // write all links to JSON file
    fs.write('linksData.json', JSON.stringify(links), 'w');


});

casper.then(function() {

    //this.capture('google.png');
    links = links.concat(this.evaluate(getProfileLinks));
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();

});
