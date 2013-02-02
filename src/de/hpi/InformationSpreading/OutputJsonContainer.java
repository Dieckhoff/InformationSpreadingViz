package de.hpi.InformationSpreading;

import java.util.List;

public class OutputJsonContainer {
	
	private List<Post> posts;
	private List<VisitedPost> visitedPosts;
	
	public OutputJsonContainer() {
		super();

	}	

	public List<Post> getPosts() {
		return posts;
	}

	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}

	public List<VisitedPost> getVisitedPosts() {
		return visitedPosts;
	}

	public void setVisitedPosts(List<VisitedPost> visitedPosts) {
		this.visitedPosts = visitedPosts;
	}
	
	
	

}
