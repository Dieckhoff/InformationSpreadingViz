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

public class StaticHelpers {
	
	public static String getContentFromUrl(String urlString) throws RuntimeException{
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
					dataInputStream));
			while ((line = reader.readLine()) != null){
				httpContent.append(line);
				httpContent.append("\n");
			}
		} catch (MalformedURLException e) {
			throw new RuntimeException(e);
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
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

}
