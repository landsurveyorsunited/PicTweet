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


count = 1 
page.search('p').each do |p|
	# puts p.text.strip
	
	
	d=p.text.strip.split("./\s/")

	# d.each do |line|
	# 	if line.include? "  "
	# 		puts line
	# 	end

	# end
	
	
	d.each do |line|
		 # puts line
		if count == 1
			if line.size > 50 and line.size <= 250
				# puts line[0]

				if line.start_with? ("/\"/+I+/\s/")
					if line.include? (";")
						count=0
						 puts line
						 puts "1"
					
					elsif line.include? ("_")
						count=0
						 puts line
						 puts "2"
						
					
					elsif line.include? (":")
						count=0
						 puts line
						 puts "3"
						
					
					elsif line.include? (",")
						count=0
						 puts line
						 puts "4"
						
					else
						count = 0
						puts line
						puts "5"
					end

				end
				if line.start_with? ("I ")
					if line.include? (";")
						count=0
						puts line
						puts "6"
					elsif line.include? ("_")
					 	 
						puts line
						count=0
						puts "7"
					
					elsif line.include? (":")
						puts line
						count=0
						puts "8"
					
					elsif line.include? (",")
						puts line
						count=0
						puts "9"
					else
						count = 0
						puts line
						puts "10"
					end
				end
				if line.start_with? ("/\"/")
						count = 0
						 puts line
						 puts "11"
						 
				end
				if line.include? ("\"")
						count = 0
						 puts line
						 puts "12"
						 
				end
					
			end
		end
			 # puts "AAAAAAAAAAAAAAAAAAAAAA"
	end
	

	
	
	 
	# if p.text.strip["I "]
 #   		puts p.text.strip.split(".")
 #   	end 
   	# if p.text.strip[" /<">/ "]
   	# 	puts p.text.strip.split(".")
   	# end 

end


# string = "The force end will be with you always"
# my_match = /end/.match(string)
# puts my_match
	
	
# if data["If "]
# 	puts data.split(".")
# end

a=1
#Get the URL of the images in the Article
page.search('img').each do |img|
<<<<<<< HEAD
	puts img['src']
	puts ''
end

local_var = "Hello"

def hello do 
  local_var = "new hello"
end

hello

class tweet 

end 
=======
	if a==1
		a=0
		puts img['src']
		puts ''
	end
end

# string= "Bhavita jaiswal"
# puts "***************************************************"


>>>>>>> 786bf5a3052514750d36ff93130d62196eb660d3
