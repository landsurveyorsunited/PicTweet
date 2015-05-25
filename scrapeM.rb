require 'rubygems'
require 'nokogiri'
require 'mechanize'
# require 're'
# Takes a URL for a news site (like Huffpo or Yahoo) as input and outputs the Headline
system 'echo hi' 

url = ARGV[0]

#resource = NokoGiri::HTML(open(url))
 
mechanize = Mechanize.new
#get URL
page = mechanize.get(url)
#Get the headline of the article
# data = page.at('h1').text.strip
#Get the paragraph 



page.search('p').each do |p|
	# puts p.text.strip
	
	
	d=p.text.strip.split(".")

	# d.each do |line|
	# 	if line.include? "  "
	# 		puts line
	# 	end

	# end

	$count = "true"
	d.each do |line|
			# puts line
			if $count == "true"
				if line.start_with? ("\"") and line.include? ("I ")
					puts line
				end
				# if line.start_with? ("I ") 
				# 		$count = "false"
				# 		puts line
						
				# end
				# if line.start_with? ("\"")
				# 		$count = "false"
				# 		 puts line
				# end
			end
			puts "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA \n"
	end
	

	
	
	 
	# if p.text.strip["I "]
 #   		puts p.text.strip.split(".")
 #   	end 
   	# if p.text.strip[" /<">/ "]
   	# 	puts p.text.strip.split(".")
   	# end 

end


string = "The force end will be with you always"
my_match = /end/.match(string)
puts my_match
	
	
# if data["If "]
# 	puts data.split(".")
# end


#Get the URL of the images in the Article
# page.search('img').each do |img|
# 	puts img['src']
# 	puts ''
# end

