require 'rubygems'
require 'nokogiri'
require 'open-uri'
# Takes a URL for a news site (like Huffpo or Yahoo) as input and outputs the Headline
system 'echo hi' 

url = ARGV[0]

#resource = NokoGiri::HTML(open(url))
 
doc = Nokogiri::HTML(open(url))

 unless OpenURI.redirectable?(url, redirect)
    raise "redirection forbidden: #{uri} -> #{redirect}"
  end
# any news site should have only one h1 and the h1 should be their headline,
# but who knows?
doc.search('p').each do |p|
	puts p.text
end 

doc.search('img').each do |img|
	puts img['src']
	puts ''
end 

def OpenURI.redirectable?(url, url2) # :nodoc:
  # This test is intended to forbid a redirection from http://... to
  # file:///etc/passwd.
  # However this is ad hoc.  It should be extensible/configurable.
  url.scheme.downcase == url2.scheme.downcase ||
  (/\A(?:http|ftp)\z/i =~ url.scheme && /\A(?:http|ftp)\z/i =~ url2.scheme)
end


 
# NOTE: This is completely from memory and untested, there may be bugs
 
# USAGE:
# From a console where headlines.rb is in the directory:
# ruby headlines.rb http://news.yahoo.com/record-freeze-extends-eastern-united-states-least-nine-004335490--sector.html
# ruby headlines.rb http://www.huffingtonpost.com/azeem-khan/heres-why-the-nyc-bitcoin_b_4551792.html?utm_hp_ref=technology&ir=Technology
