import config
import json
from bs4 import BeautifulSoup
import requests
import re

final_quote=""
final_image=""
def parse(url):

    found_text=0    
    
    text=""
    r  = requests.get(url)
    data = r.text
    soup = BeautifulSoup(data)
    para = soup.find_all('p')       
    img= soup.find_all('img')

#Get the BlockQuote if any : 
    blockQuote= soup.find_all('aside', { "class" : "pullquote" })
    for line in blockQuote:

        if found_text==0:
            final_quote=line.get_text()
            if len(final_quote)>90 and len(final_quote)<350:
                found_text=1
                # print(final_quote)
                # print("ASIDE")
                
            
        
        
    for line in para:
            lines=line.get_text()
            #lines.split(".")
            text=text+lines
            #print(lines)
            #lines=lines+line
            
    each_line=text.strip().split(".")
    for line in each_line:
        # print(line)
        if found_text==0:
            if "I " in line and len(line)>50 and len(line)<300:
                if '_' in line:
                    found_text=1
                    # print (line)
                    final_quote=line
                    # print("******1*******")
                    break
                if ':' in line:
                    found_text=1
                    # print (line)
                    # print("******2*******")
                    final_quote=line 
                    break
                if ';' in line:
                    found_text=1
                    # print (line)
                    final_quote=line
                    # print("*********3*********")
                    break
                if line.count(',')>1:
                    found_text=1
                    # print (line)
                    # print("**********4*******")
                    final_quote=line
                    break
                if ',' in line:
                    found_text=1
                    # print (line)
                    # print("***********5******")
                    final_quote=line
                    break
                else :
                    found_text=1
                    # print (line)
                    final_quote=line
                    # print("***********6**********")
        # print("*******************************")

    for line in each_line:
        # print(line)
        if found_text==0:
            if "\" " in line and len(line)>50 and len(line)<300:
                if '_' in line:
                    found_text=1
                    # print (line)
                    final_quote=line
                    # print("******7*******")
                    break
                if ':' in line:
                    found_text=1
                    # print (line)
                    # print("******8*******")
                    final_quote=line 
                    break
                if ';' in line:
                    found_text=1
                    # print (line)
                    final_quote=line
                    # print("*********9*********")
                    break
                if line.count(',')>1:
                    found_text=1
                    # print (line)
                    # print("**********10*******")
                    final_quote=line
                    break
                if ',' in line:
                    found_text=1
                    # print (line)
                    # print("***********11******")
                    final_quote=linee
                    break
                else :
                    found_text=1
                    # print (line)
                    final_quote=line
                    # print("***********12**********")

    for line in each_line:
        # print(line)
        if found_text==0:
            if ";" in line and len(line)>50 and len(line)<300:
                found_text=1
                print (line)
                final_quote=line
                # print("*********13*********")

    for line in each_line:
        # print(line)
        if found_text==0:
            if  line.count(',')>1 and len(line)>50 and len(line)<300:
                found_text=1
                # print (line)
                final_quote=line
                # print("*********14*********")
    for line in each_line:
        if found_text==0:
            if len(line)>50 and len(line)<300:
                found_text=1
                # print (line)
                final_quote=line
                # print("*********15*********")




    # pattern = r'"(.*?)"'
    # if re.search(pattern,final_quote):
    #     print(final_quote)
    # print(final_quote)
    # final = re.findall(r'"([^"]*)"', final_quote)
    # print(final)

# GET THE IMAGE
    
    found_img=0
    str=""
    for i in img:
        str=i.get('src')
        #print(str)
        if str is not None:
            images=str.split(" ")
            if found_img==0:
                for image in images:
                    if found_img==0:
                        if "icon" not in image:
                            if "contributors" not in image:
                                if "jpg" in image or "png" in image:
                                    final_image=image
                                    # print (final_image)
                                    found_img=1
    
        
    return final_quote,final_image



