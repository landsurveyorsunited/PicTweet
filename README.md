PicTweet Documentation 

Overview
=========

PicTweet is a tool that allows a user to upload a URL from an online media outlet and have a meme generated from an image on the site and a quote chosen by our algorithm based on relevance. The front-end is made using a combination of Ruby on Rails and Backbone.js, and calls are made to a Python Flask server. We are using some of Vox Media’s meme generator code for this project.

To best understand this application, you should:
- Read about the usage of Rails + Backbone.js
- Specifically, take a look at the documentation for Backbone MVC to see how we built the front end
- Look through the api.py file to view the algorithm that parses the article and chooses which quote to show on the meme

This is a prototype and Work In Progress, so there are definitely improvements to be made in the code. 

Installation and Usage
=========

- Install Rails and make sure all of the ruby gems are downloaded using ‘bundle install’ 
- Install Python and all package dependencies
- Clone this repository
- Run ‘bundle exec middleman’ to spin up the local server for the front-end
- Run ‘python main.py’ *from within PicTweet_flask directory* to spin up the Flask server on localhost
- To alter the quote selection algorithm, look at the api.py file 
- The AJAX call from the Rails app to the Flask server is made in the settings.erb.js file in the Rails app
- Note that future iterations of this project would be enhanced by placing the functionality of the Flask server into the Rails application

Development
=========

- app.logger.info is essential to debugging on the Flask server 
- You may run into problems with the AJAX request from one local-server to another using a browser besides Chrome


## Cross-Origin Resources (CORS)

This is an HTML5 Canvas-based application, and thus comes with some security restrictions when loading graphics across domains (ex: a canvas element on *http://tatooine.com* cannot export with an image hosted on *http://dagobah.com*).

If you're hosting this application on the same domain that serves your images, then congratulations! You have no problems. However, if you're going through a CDN, then you'll probably encounter some cross-domain security issues; at which time you have two options:

1. Follow this [excellent MDN article](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image) about configuring "Access-Control-Allow-Origin" headers. You'll need to enable these headers on your CDN, at which time the Meme app should be able to request images from it.

2. Embed all of your watermark images as base64 data URIs within the `settings.js.erb` file. The asset pipeline's `asset_data_uri` helper method makes this very easy, and effectively embeds all image data within your JavaScript. The downside here is that your JavaScript will become a very large payload as you include more images. In the long term, getting CORS headers configured will be a better option.


