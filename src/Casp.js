/**
 * Created by Tom on 04/09/2015.
 * Gets links dump containing profile links for a given category of project ('needs funding','fully funded','completed')
 */

    // https://www.lendwithcare.org/search/funded/completed

var links = [];
var casper = require('casper').create();
var fs = require('fs');

function getProfileLinks() {
    var links = document.querySelectorAll('a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

var url = casper.cli.get(0);

casper.start(url, function() {
    this.echo(url);


});

casper.then(function(){
    //store css selector for  button that loads more content
    var buttonCss = '#card_container > div.paginate-more > button';
    //count timeouts
    var timeoutCount=0;

    //limit paginations to 500
    for(var i=0; i<500; i++) {
        // when button appears echo
        casper.waitForSelector(buttonCss,

            function() {
                this.echo('the button has appeared [waitforselector]');
                this.click('#card_container > div.paginate-more > button');
            },

            function onTimeout(){
                this.echo('timed out before button element loaded in DOM');
                timeoutCount++;
                this.echo('timeout count is ' + timeoutCount);
                if(timeoutCount===2) {       // set to two to allow for one request timeoutas a buffer
                request.abort(); // proceed to next step (no more paginations possible)
                }
            }
            , 15000 //set timeout limit
        );

    }
});

casper.then(function() {

   //this.capture('google.png');
    links = links.concat(this.evaluate(getProfileLinks));
    fs.write('linksData2.json', JSON.stringify(links), 'w');
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});

