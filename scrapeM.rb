require 'rubygems'
require 'nokogiri'
require 'mechanize'
# Takes a URL for a news site (like Huffpo or Yahoo) as input and outputs the Headline
system 'echo hi' 

url = ARGV[0]

#resource = NokoGiri::HTML(open(url))
 
mechanize = Mechanize.new
#get URL
page = mechanize.get(url)
#Get the headline of the article
puts page.at('h1').text.strip
#Get the paragraph
page.search('p').each do |p|
	puts p.text.strip
end

#Get the URL of the images in the Article
page.search('img').each do |img|
	puts img['src']
	puts ''
end
