BlogIntelligence - InformationSpreadingViz
================

Visualize Relations between Blogs and see how the spread their Information:

Example

* SCREENSHOT VOM JETZIGEN  DESIGN
#####Installation

1.      Download Tomcat (http://tomcat.apache.org/download-70.cgi)    
2.      Download and unzip Eclipse EE (http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/junosr1)     
3.      Create Eclipse Workspace Folder    
4.      In Workspace Folder git clone git@github.com:Dieckhoff/InformationSpreadingViz.git    
5.      Put ngdbc.jar in Folder \InformationSpreadingViz\WebContent\WEB-INF\lib    
6.      Edit File \InformationSpreadingViz\WebContent\WEB-INF\**config.properties** and put in login data         
7.      Start Eclipse   
8.      Go to „File -> Import“ , select  „General -> Existing Projects into Workspace“   
9.      Via „Browse…“ navigate to cloned Repository and import it  
10.    Right click at Project and select „Runs As -> Run on Server“    
11.    In new Window choose „Manually define a new server“ , and choose loaded Tomcat 7.0 Server     
11.1  If there is no option "manually define" you have to create the Server via File -> New -> Other -> Server   

After all, you should have a Eclipse Project looking like this:   

![alt text](/home/neelia/Desktop/Selection_001.png)


#####Motivation
Based on BlogIntelligence Data situated on a HANA Database, this Project was about to create a form of Visualisation to enable a structural analysis. 
Users are able to find out in what way, to what extend and how fast information spreads from its original source to other blog instances.

#####Usage

What to do to change initial Post?   
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In WebContent/js/main.js line 3 change the parameter of initialize_posts() the parameter have to be a post id  you get get from HANA

What to do to change Post Design?   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;go to WebContent/js/initialize.js  between lines 46-60 all post colors are defined related to their types, Just change the attribute post.color = '’ to the color you want 

What to do to change Arrow Design?   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In WebContent/js/draw.js the functions draw_arrow and draw_arrow_head are responsible for alle the arrow design and positioning



#####ProjectParts
Two main Folders

* **src** Folder: all the java and Database stuff to get all the information out of the HANA
* **WebContent** Folder: Javascript, css and config Files for Visualisation

