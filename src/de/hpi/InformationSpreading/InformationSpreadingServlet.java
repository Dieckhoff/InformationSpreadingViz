package de.hpi.InformationSpreading;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.Random;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

/**
 * Servlet implementation class InformationSpreading
 */
// @WebServlet("/InformationSpreading")
public class InformationSpreadingServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	DBConnection conn = null;
	private PreparedStatement detailsStmt;
	private PreparedStatement toUrlStmt;
	private PreparedStatement fromUrlStmt;
	
	private ArrayList<VisitedPost> visitedPosts = null;

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		
		// For faking post types:
		StaticHelpers.initializeRandom();
		
		visitedPosts = new ArrayList<VisitedPost>();
		
		Properties p;
		try {
			InputStream input = getServletContext().getResourceAsStream("/WEB-INF/config.properties");
			p = new Properties();
			p.load(input);
			conn = new DBConnection();
			conn.connect(p.getProperty("DRIVERCLASS"), p.getProperty("DBURL"), p.getProperty("DBUSER"), p.getProperty("DBPASSWORD"));
		} catch (IOException e1) {
			e1.printStackTrace();
		}		
		
		try {
			detailsStmt = toUrlStmt = conn.getCon()
					.prepareStatement("SELECT SCORE, POSTCONTENT, TYPE, POSTPUBDATE, HOST, POSTTITLE, BASEURL FROM SYSTEM.WEBPAGE WHERE ID = ?");
			toUrlStmt = conn.getCon()
					.prepareStatement("SELECT TOP 20 ID, SCORE FROM (SELECT TOURL FROM SYSTEM.LINK WHERE FROMURL = ? ) AS A JOIN SYSTEM.WEBPAGE AS B ON A.TOURL = B.ID WHERE SCORE IS NOT NULL AND POSTPUBDATE IS NOT NULL ORDER BY SCORE DESC");
			fromUrlStmt = conn.getCon()
					.prepareStatement("SELECT TOP 20 ID, SCORE FROM (SELECT FROMURL FROM SYSTEM.LINK WHERE TOURL = ? ) AS A JOIN SYSTEM.WEBPAGE AS B ON A.FROMURL = B.ID WHERE SCORE IS NOT NULL AND POSTPUBDATE IS NOT NULL ORDER BY SCORE DESC");

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}		
		public void doGet(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {				

			String param = request.getParameter("id");
			String id = "";
			if (param != null) {
				id = URLDecoder.decode(param, "UTF-8");
			}	
			else return;
			
			readVisitedPostsHistoryFromSession(request.getSession());
			
			OutputJsonContainer outputContainer = null;
			try {
				outputContainer = getOutputContainer(id);
			} catch (SQLException e) {
				e.printStackTrace();
			}			
			
			String outputJson = new Gson().toJson(outputContainer);			
	
			response.setContentType("text/json");
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.getWriter().print(outputJson);		
		

	
	}
		
	private void readVisitedPostsHistoryFromSession(HttpSession session) {
		
		ArrayList<VisitedPost> listFromSession = (ArrayList<VisitedPost>) session.getAttribute( "visitedPosts" );

		if ( listFromSession == null )
		{
		  listFromSession = new ArrayList<VisitedPost>();
		  session.setAttribute( "visitedPosts", listFromSession );
		}
		else 
		{
			visitedPosts = listFromSession;
		}
		  
		
	}
		
	private OutputJsonContainer getOutputContainer(String id) throws IOException, SQLException {
		
		Post rootPost = getRootPost(id);	
		
		OutputJsonContainer outputContainer = initializeOutputContainer();
		outputContainer.getPosts().add(rootPost);
			
		addPostsOfIncomingLinks(rootPost, outputContainer);
		addPostsOfOutgoingLinks(rootPost, outputContainer);
		
		outputContainer.setVisitedPosts(visitedPosts.subList(0, visitedPosts.size()-1));
		
		return outputContainer;
		
	}		
		
	private Post getRootPost(String id) throws SQLException, IOException {
		Post rootPost = new Post(id);
		
		addDetails(rootPost);
		
		addIncomingLinks(rootPost);
		addOutgoingLinks(rootPost);
		
		addToVisitedLinks(rootPost);	
		
		return rootPost;
	}
		
	private Post addDetails(Post post) throws SQLException, IOException {
		addDataFromDB(post);
		addImageUrl(post);
		
		return post;
		
	}
		
	private Post addDataFromDB(Post post) throws SQLException {
			
		
		detailsStmt.setString(1, post.getId());
		ResultSet executeQuery = detailsStmt.executeQuery();
		
		while(executeQuery.next()) {
			post.setScore(executeQuery.getString(1));
			post.setPostcontent(executeQuery.getString(2));
			post.setType(executeQuery.getString(3));
			post.setPostpubdate(executeQuery.getString(4));
			post.setHost(executeQuery.getString(5));
			post.setPosttitle(executeQuery.getString(6));
			post.setBaseurl(executeQuery.getString(7));
					
		}
		
		return post;

	}	
	
	private Post addImageUrl(Post post) throws IOException  {
		String imageUrl = getImageUrlFromBlogIntelligenceServer(post.getId());
		post.setImage(imageUrl);
		return post;
	}
		
	private String getImageUrlFromBlogIntelligenceServer(String id) throws IOException {
		
		String servletUrl = "http://blog-intelligence.com:8080/bi_small/hc?type=post&id=";
		String link = servletUrl + id;
		
		String result = StaticHelpers.getContentFromUrl(link);			
	
		InputJsonContainer inputContainer = new Gson().fromJson(result, InputJsonContainer.class);
	
		if(inputContainer.isResult()) {
			return inputContainer.getPost().getImage();		
		}
		else return "";
			
	}
		
	private Post addOutgoingLinks(Post post) throws SQLException {
		ArrayList<String> outgoingLinks = fetchOutgoingLinksFromDB(post.getId());
		post.setOutgoingLinks(outgoingLinks);
		return post;
	}
		
	private ArrayList<String> fetchOutgoingLinksFromDB(String id) throws SQLException {
		
		ArrayList<String> outgoingLinks = new ArrayList<String>();
		
		toUrlStmt.setString(1, id);
		ResultSet executeQuery2 = toUrlStmt.executeQuery();
		while(executeQuery2.next()){
			String target = executeQuery2.getString(1);
			outgoingLinks.add(target);			
		}
		
		return outgoingLinks;
	}
	
	private Post addIncomingLinks(Post post) throws SQLException {
		ArrayList<String> incomingLinks = fetchIncomingLinksFromDB(post.getId());
		post.setIncomingLinks(incomingLinks);
		return post;
	}
	
	private ArrayList<String> fetchIncomingLinksFromDB(String id) throws SQLException {
		
		ArrayList<String> incomingLinks = new ArrayList<String>();
		
		fromUrlStmt.setString(1, id);
		ResultSet executeQuery3 = fromUrlStmt.executeQuery();
		while(executeQuery3.next()){
			String target = executeQuery3.getString(1);
			incomingLinks.add(target);			
		}
				
		return incomingLinks;		
		
	}
	
	private OutputJsonContainer initializeOutputContainer() {
		OutputJsonContainer outputContainer = new OutputJsonContainer();
		ArrayList<Post> posts = new ArrayList<Post>();
		outputContainer.setPosts(posts);
		return outputContainer;
		
	}
	
	private void addPostsOfIncomingLinks(Post rootPost, OutputJsonContainer outputContainer) throws SQLException, IOException {
		
		for (String id : rootPost.getIncomingLinks()) {
			Post post = addDetails(new Post(id));
			outputContainer.getPosts().add(post);									
		}		
	}
	
	private void addPostsOfOutgoingLinks(Post rootPost, OutputJsonContainer outputContainer) throws SQLException, IOException {
		
		for (String id : rootPost.getOutgoingLinks()) {
			Post post = addDetails(new Post(id));
			outputContainer.getPosts().add(post);							
		}								
	}
	
	private void addToVisitedLinks(Post post) {
	VisitedPost visitedPost = new VisitedPost();
	visitedPost.setId(post.getId());
	visitedPost.setTitle(post.getPosttitle());
	
	if(visitedPosts.contains(visitedPost)) {
		visitedPosts.remove(visitedPost);
	}
	visitedPosts.add(visitedPost);
}
		

	@Override
	public void destroy() {
		conn.close();
		super.destroy();
	}

	

}
