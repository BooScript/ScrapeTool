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


//loop through each projectdatadump and get attributes
for(var i=0; i< rawProjects.length; i++){
    //initialise project object
    var projectAttr = new Object()

    // projectAttr.title = rawProjects[i].match(regexPatterns.title);
    //push regex matches to object
    projectAttr.title = rawProjects[i].match(regexPatterns.title);
    projectAttr.value = rawProjects[i].match(regexPatterns.value);
    projectAttr.location = rawProjects[i].match(regexPatterns.location);
    projectAttr.latLng = rawProjects[i].match(regexPatterns.latLng);
    projectAttr.dateLoanAdded = rawProjects[i].match(regexPatterns.dateLoanAdded);
    projectAttr.repaymentTermMonths = rawProjects[i].match(regexPatterns.repaymentTermMonths);
    projectAttr.mfiPartner = rawProjects[i].match(regexPatterns.MFIpartner);
    projects.push((projectAttr));
}
console.log(projects);

writeToJSONFile(projects);
projects.forEach(function (proj) {
    console.log(proj.dateLoanAdded);
});
