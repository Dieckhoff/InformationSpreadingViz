package de.hpi.InformationSpreading;

import java.util.List;

public class Post {
	
	private String id;
	private String title;
	private String blog;
	private String content;
	private String image;
	private String url;
	private String author;
	private String pubDate;
	private String type;
	
	private float score;
	private List<String> outgoingLinks;
	private List<String> incomingLinks;
	
	
	public Post() {
		
	}
	
//	public Post(String title, String blog, String content, String url,
//			String author, String pubDate) {
//		super();
//		this.title = title;
//		this.blog = blog;
//		this.content = content;
//		this.url = url;
//		this.author = author;
//		this.pubDate = pubDate;
//	}
//	
//	public Post(String title, String blog, String content, String url,
//			String author, String pubDate, float score,
//			List<String> outgoingLinks, List<String> incomingLinks) {
//		super();
//		this.title = title;
//		this.blog = blog;
//		this.content = content;
//		this.url = url;
//		this.author = author;
//		this.pubDate = pubDate;
//		this.score = score;
//		this.outgoingLinks = outgoingLinks;
//		this.incomingLinks = incomingLinks;
//	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBlog() {
		return blog;
	}

	public void setBlog(String blog) {
		this.blog = blog;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPubDate() {
		return pubDate;
	}

	public void setPubDate(String pubDate) {
		this.pubDate = pubDate;
	}

	public float getScore() {
		return score;
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
