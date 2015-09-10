//
//reads raw json file and parses project attributes and writes these attributes to project class object
// import module that gives us project class
require('./ProjectClass.js');
//module.exports.Match_Project_Strings = MatchProjectStrings();

var fs = require('fs');


function writeToJSONFile(data) {
    fs.writeFile('FinalJSON.txt', JSON.stringify(data), function () {
        console.log('file written!!!!!!!!');
    })
}

//read scraped data from json file
var rawProjects = JSON.parse(fs.readFileSync(
    'individualProjectsRaw.json', 'utf8', function(err, data){
        if(err){
            throw err;
        }
       // console.log(projectAttr);
    }));

var regexPatterns = {
    title: /(?:!?h1\>)(.+)(?:!?\<\/h1\>)/ ,
    value: /(?:!?&pound;)(.+)(?:!?\<)/ ,
    location: /(?:!?span>)(.+)(?=<)/ ,
    latLng: /(?:!?LatLng\()(.+)(?=\d)/ ,
dateLoanAdded: /(?:!?loan added:\s)(.+)(?:!?\<\/span)/ ,
repaymentTermMonths: /(?:!?\>)(.+)(?:!?Months\<\/h)/ ,
//still need to get pattern to match activity type
MFIpartner: /(?:!?h3\sclass="grey">)([A-Za-z]+)(?:!?<\/h3)/

};

//initialise empty array to store project objects
var projects = [];

//function to capture only nth group of match for regex
function getMatches(string, regex, index){
    if(!regex) return 'NoRegexGivenForSearch';
    index || (index = 1); //default to first capturing group
    var matches = [];
    var match = (regex.exec(string));
    if(match) return match[1];
}

//loop through each projectdatadump and get attributes
for(var i=1; i< rawProjects.length; i++){
    //initialise project object
    var projectAttr = new Object();

     projectAttr.title = rawProjects[i].match(regexPatterns.title);
     projectAttr.title = getMatches(rawProjects[i], regexPatterns.title);
    projectAttr.value = getMatches(rawProjects[i], regexPatterns.value);
    projectAttr.location = getMatches(rawProjects[i], regexPatterns.location);
     projectAttr.latLng = getMatches(rawProjects[i], regexPatterns.latLng);
     projectAttr.dateLoanAdded = getMatches(rawProjects[i], regexPatterns.dateLoanAdded);
     projectAttr.repaymentTermMonths = getMatches(rawProjects[i], regexPatterns.repaymentTermMonths);
    //need to give string for match
    projectAttr.mfiPartner = getMatches(rawProjects[i], regexPatterns.MFIpartner);
    projects.push((projectAttr));
console.log(projectAttr)

}
console.log(projects);

writeToJSONFile(projects);
//projects.forEach(function (proj) {
   // console.log(proj.dateLoanAdded.keys());
//for (var prop in proj.dateLoanAdded){
  //  console.log(prop)

//}

//});
