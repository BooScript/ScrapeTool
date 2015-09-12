/**
 * Created by Tom on 06/09/2015.
 */
var fs = require('fs');

module.exports.getProfileLinks = getProfileLinks();

//read json file
function readLinksfromCasper(){
 return JSON.parse(fs.readFileSync('linksData2.json', 'utf8'));
}
//function for filtering unique links
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

//regex expression to filter only profile link from bunch of links
function filterProfileLinks(links) {
    //check arg1 is array
    if(Array.isArray(links) === false){
        throw TypeError('arg1 needs to be an array');
    }
    // iterate through elements of array
   var filteredArr =  links.filter(function (element) {
             //if position of link is -1 (null) then we filter it out f our array
            if (element.search(/entrepreneurs.index.\d+/) !== -1) {
                return true;
                }
             });

    return filteredArr;
}

function getProfileLinks() {

    var linksdump = readLinksfromCasper();

    var profilelinks = filterProfileLinks(linksdump);
    //filter for unique links (delete duplicates)
    var uniqueProfileLinks = profilelinks.filter( onlyUnique ); // returns ['a', 1, 2, '1']

    return uniqueProfileLinks;
}

//console.log(getProfileLinks());

