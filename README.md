# ScrapeTool - Project Write-Up

Whilst working for a data analytics start up on a voluntary basis I created a bot that scraped the website lendwithcare.org. 

The website is a crowdfunding platform which contains historical information on projects. The bot scraped all key project data for over 10,000 projects across the developing world. 

The web scraping bot was written in Node.js. This JavaScript framework was chosen as large amounts of simultaneous Ajax requests can made and their responses processed asynchronously as and when the request is fulfilled.

The first stage was to scrape all the links for 10,000 projects from the projects directory on lendwithcare.org.

The first obstacle that made the scraping process challenging was that the maximum amount of projects in the directory that were viewable at once was 15. More projects could only be dynamically loaded in further increments of 15. This was due to the fact that the ‘load more’ button only appeared after the previous results from the previous click had fully loaded. In order to overcome this issue I used CasperJS.

This open source navigation scripting & testing utility allowed me to automate this actuation of ‘the load more’ button in a headless browser. The script would activate the button, wait for the next button to appear before paginating again. This process was completed until the button no longer appeared meaning that all results had been retrieved. Then I retrieved the entire HTML body in order to use a regular expression that parsed every profile link from the string that made up the HTML body.

The use of an asynchronous programming environment led to foreseeably large performance gains. Armed with a list of thousands of project links I could scrape all the project attributes and process them asynchronously.

This means that unlike in a synchronous programming language where I would have to make a single Ajax request and wait for a response before making the next request I could make 50 simultaneous requests at the same time and process the response of each request when it occurred. I used the Async library which provides a suite of utility functions for dealing with asynchronous JavaScript.

Through the use of a queue I was able to limit the amount of simultaneous Ajax requests to 50 despite there being thousands of requests to make in total. As each request was fulfilled it was taken off the front of the queue and a new request was placed on the end of the queue.

An improvement to the bot could be made that would lead to major performance increases. This would involve altering the bot to concurrently scrape project links via CasperJS and then scraping the individual profile. 

The final results were written to a JSON file. Typically the next stage would involve cleaning and processing through a library such as Python’s Pandas.
