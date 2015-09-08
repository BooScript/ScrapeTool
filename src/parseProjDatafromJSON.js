//
//reads raw json file and parses project attributes and writes these attributes to project class object
// import module that gives us project class
require('./ProjectClass.js');

var fs = require('fs');




//read scraped data from json file
var rawProjects = JSON.parse(fs.readFileSync('individualProjectsRaw.json', 'utf8'));

// test
console.log(rawProjects[1]);

for(var i=0; i<rawProjects; i++){



}

//
//regex functions to get each project attribute
//

//regex to match project title
function regexTitle(){

}

