package de.hpi.InformationSpreading;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;


public class DBConnection {
	static final String SEPARATOR = "\t";

	Connection con;

	public DBConnection() {

	}

	public void connect(String DRIVER_CLASS, String DB_URL, String DB_USER, String DB_PASSWORD) {
			con = initializeConnection(DRIVER_CLASS, DB_URL, DB_USER, DB_PASSWORD);

	}
	public Connection getCon() {
		return con;
	}
	public Connection initializeConnection(String DRIVER_CLASS, String DB_URL, String DB_USER, String DB_PASSWORD) {
		Connection con1 = null;
		try {
			Class.forName(DRIVER_CLASS).newInstance();

		String url = DB_URL;
		con1 = DriverManager.getConnection(url, DB_USER, DB_PASSWORD);
		
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return con1;
	}

	public void close() {
		try {
			con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}


}
