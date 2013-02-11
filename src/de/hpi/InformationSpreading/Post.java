package de.hpi.InformationSpreading;

import java.util.List;

public class Post {
	
	private String id;
	private String posttitle;
	private String host;
	private String postcontent;
	private String image;
	private String url;
	private String postpubdate;
	private String type;
	private String baseurl;	
	private float score;
	
	private List<String> outgoingLinks;
	private List<String> incomingLinks;
	
	
	public Post() {
		super();
	}	

	public Post(String id) {
		super();
		this.id = id;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPosttitle() {
		return posttitle;
	}

	public void setPosttitle(String posttitle) {
		this.posttitle = posttitle;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getPostcontent() {
		return postcontent;
	}

	public void setPostcontent(String postcontent) {
		this.postcontent = postcontent;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getPostpubdate() {
		return postpubdate;
	}

	public void setPostpubdate(String postpubdate) {
		if(postpubdate == null) 
			this.postpubdate = String.valueOf(0);
		else
			this.postpubdate = postpubdate;
		//this.postpubdate = StaticHelpers.parseHANADateStringToMilliseconds(dateString);
	}
	
	public void setPostpubdate(int postpubdate) {
		this.postpubdate = String.valueOf(postpubdate);
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		if(type == null) 
			this.type = StaticHelpers.getFakedPostType();
		else
			this.type = type;
	}

	public String getBaseurl() {
		return baseurl;
	}

	public void setBaseurl(String baseurl) {
		this.baseurl = baseurl;
	}

	public float getScore() {
		return score;
	}
	
	public void setScore(String score) {
		if (score == null) 
			this.score = (float) 0;
		else 
			this.score = Float.parseFloat(score);		
		
	}

	public void setScore(float score) {
		
		this.score = score;
	}

	public List<String> getOutgoingLinks() {
		return outgoingLinks;
	}

	public void setOutgoingLinks(List<String> outgoingLinks) {
		this.outgoingLinks = outgoingLinks;
	}

	public List<String> getIncomingLinks() {
		return incomingLinks;
	}

	public void setIncomingLinks(List<String> incomingLinks) {
		this.incomingLinks = incomingLinks;
	}

}
