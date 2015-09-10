//
//reads raw json file and parses project attributes and writes these attributes to project class object

var fs = require('fs');

function writeToJSONFile(data) {
    fs.writeFile('FinalJSON.json', JSON.stringify(data), function () {
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
    }
));

//object of patterns to match project attributes
var regexPatterns = {
    title: /(?:!?h1\>)(.+)(?:!?\<\/h1\>)/ ,
    value: /(?:!?&pound;)(.+)(?:!?\<)/ ,
    location: /(?:!?span>)(.+)(?=<)/ ,
    latLng: /(?:!?LatLng\()(.+)(?=\d)/ ,
    dateLoanAdded: /(?:!?loan added:\s)(.+)(?:!?\<\/span)/ ,
    repaymentTermMonths: /(?:!?\>)(.+)(?:!?Months\<\/h)/ ,
    activityType: /(?:!?Activity type:<\/p>\n.+<h3\sclass="grey">)(.+)(?:!?<\/h3)/m ,
    MFIpartner: /(?:!?MFI partner:<\/p>\n.+<h3\sclass="grey">)(.+)(?:!?<\/h3)/m
};

//initialise empty array to store project objects
var projects = [];

//function to capture only nth group of match for regex
function getMatches(string, regex, index){
    if(!regex) return 'NoRegexGivenForSearch';
    index || (index = 1); //default to first capturing group
    var matches = [];
    var match = (regex.exec(string));
    if(match) return match[index];
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
    projectAttr.mfiPartner = getMatches(rawProjects[i], regexPatterns.MFIpartner);
    projectAttr.activityType = getMatches(rawProjects[i], regexPatterns.activityType);
    projects.push((projectAttr));
}
console.log(projects);
writeToJSONFile(projects);
