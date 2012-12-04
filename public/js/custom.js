function Post(paper, title, url, importance, time){
	this.paper = paper;
	this.title = title;
	this.url = url;
	this.importance = importance;
	this.time = time;
	this.x = time;
	this.y = 60;
	
	this.circle = draw_circle(this.paper, this.importance, this.time);
	this.label = draw_label(this.paper, this.title, this.x, this.y);
	
	this.hover = hover_func();	
}

function draw_circle(paper, importance, time){
	var circle = paper.circle(time, 60, importance * 2);
	circle.attr({
		fill: 'steelblue',
		cursor: 'pointer',
		opacity: 0.5,
	});
};

function draw_label(paper, title, x, y){
	var label = paper.text(x, y, this.title);
};







/*
	this.label_title = paper.text(45, 45, this.title);
	this.label_title.hide();
	
	function hoverIn() {
		this.circle.attr({
			fill: "green",
		});
		this.label_title.show();
    };
	
	function hoverOut(){
        this.circle.attr({"fill": "steelblue"});
		this.label_title.hide();		
    }

	this.circle.hover(hoverIn(), hoverOut, this.circle, this.circle);
*/





$(function() {
	var paper = Raphael('draw', 30, 0, 0, 0);
	
	var posts_example = '[' +
		'{ "title":"hallo" , "score":"6" , "blogtitle":"Stern" , "url":"www.stern.de/blog" , "type":"News" , "tourl":"something" , "fromurl":"something" , "postlastupdate":"123" },' +
		'{ "title":"jsdf" , "score":"13" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Facebook" , "tourl":"something" , "fromurl":"something" , "postlastupdate":"100" },' +
		'{ "title":"gsgdg" , "score":"1" , "blogtitle":"ghhtre" , "url":"www.gdfds.de/blog" , "type":"Twitter" , "tourl":"something" , "fromurl":"something" , "postlastupdate":"20" } ]';
	
	var posts = JSON.parse(posts_example);
	for (i = 0; i < posts.length; ++i) {
		//drawPost(posts[i]);
		var post = new Post(paper, posts[i].title, posts[i].url, posts[i].importance, posts[i].postlastupdate);
	};
});
