package de.hpi.InformationSpreading;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class StaticHelpers {
	
	static Random random = null;
	
	public static String getContentFromUrl(String urlString) throws IOException {
		InputStream inputStream = null;
		String line;
		StringBuilder httpContent = new StringBuilder();
		URL url;
		try {
			url = new URL(urlString);
			inputStream = url.openStream(); // throws an IOException
			DataInputStream dataInputStream = new DataInputStream(new BufferedInputStream(
					inputStream));
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					dataInputStream, "UTF-8"));
			while ((line = reader.readLine()) != null){
				httpContent.append(line);
				httpContent.append("\n");
			}
		} catch (MalformedURLException e) {
			throw e;
		} catch (UnsupportedEncodingException e) {
			throw e;
		} catch (IOException e) {
			throw e;
		} finally {
			try {
				inputStream.close();
			} catch (IOException ioe) {
				ioe.printStackTrace();
			} catch (NullPointerException e){
				e.printStackTrace();
			}
		}
		return httpContent.toString();
	}
	
	public static String parseHANADateStringToMilliseconds(String dateString){
		SimpleDateFormat sdf = new SimpleDateFormat("MMM dd, yyyy h:mm:ss a");
		Date date = new Date();
		
		try {
			date = sdf.parse(dateString);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return String.valueOf(date.getTime());
	}
	
	public static void initializeRandom() {
		random = new Random();
	}
	
	public static String getFakedPostType() {
		String type = "";
		int num = random.nextInt(6)+1;
		switch (num) {
		case 1:
			type = "Facebook";			
			break;
		case 2:
			type = "Twitter";
			break;
		case 3: 
			type = "Newsportal";
			break;
		case 4:
		case 5:
		case 6:
			type = "Blog";
			break;			
		default:
			type = "Blog";
			break;
		}
		return type;
		
		
	}
}
