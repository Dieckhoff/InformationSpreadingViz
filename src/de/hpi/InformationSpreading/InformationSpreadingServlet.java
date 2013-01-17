package de.hpi.InformationSpreading;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Properties;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class InformationSpreading
 */
// @WebServlet("/InformationSpreading")
public class InformationSpreadingServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	DBConnection conn = null;
	private PreparedStatement stmt;

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		
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
			stmt = conn.getCon()
					.prepareStatement("SELECT fromurl, tourl FROM SYSTEM.LINK WHERE tohost = ?");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try {
			String param = request.getParameter("tohost");
			String tohost = "";
			if (param != null) {
				tohost = URLDecoder.decode(param);
			}

//		byte[] csv = conn.getHeatMapAsTSV(keywords).getBytes();
			
			
			stmt.setString(1, tohost);
			ResultSet executeQuery = stmt.executeQuery();
			ArrayList<Link> list = new ArrayList<Link>();
			while(executeQuery.next()){
				String fromurl = executeQuery.getString(1);
				String tourl = executeQuery.getString(2);
				Link link = new Link(tourl, fromurl);
				list.add(link);			
			}
			
			Gson gson = new Gson();
			String json = gson.toJson(list);
			response.setContentType("text/json");
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.getWriter().print(json);
		} catch (SQLException e) {
			e.printStackTrace(response.getWriter());
		}
		
		
		
		

		
		

	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	@Override
	public void destroy() {
		// conn.close();
		super.destroy();
	}

	

}
