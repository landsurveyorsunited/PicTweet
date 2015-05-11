require 'rubygems'
require 'nokogiri'
require 'open-uri'
# Takes a URL for a news site (like Huffpo or Yahoo) as input and outputs the Headline
system 'echo hi' 

url = ARGV[0]

#resource = NokoGiri::HTML(open(url))
 
doc = Nokogiri::HTML(open(url)) 
# any news site should have only one h1 and the h1 should be their headline,
# but who knows?
doc.search('p').each do |p|
	puts p.text
end 


 
# NOTE: This is completely from memory and untested, there may be bugs
 
# USAGE:
# From a console where headlines.rb is in the directory:
# ruby headlines.rb http://news.yahoo.com/record-freeze-extends-eastern-united-states-least-nine-004335490--sector.html
# ruby headlines.rb http://www.huffingtonpost.com/azeem-khan/heres-why-the-nyc-bitcoin_b_4551792.html?utm_hp_ref=technology&ir=Technology
