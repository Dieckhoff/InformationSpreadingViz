function Post(paper, title, url, importance, time){
	this.paper = paper;
	this.title = title;
	this.url = url;
	this.importance = importance;
	this.size = this.importance * 2;
	this.time = time;
	this.x = time;
	this.y = 60;
	
	this.label = this.draw_label(this.paper, this.title, this.x, this.y);
	this.label.hide();
	this.circle = this.draw_circle(this.paper, this.size, this.time);
	
	this.hover = this.hover_func(this.circle, this.label);	
}

Post.prototype.draw_circle = function (paper, importance, time){
	var circle = paper.circle(time, 60, importance * 2);
	circle.attr({
		fill: 'steelblue',
		cursor: 'pointer',
		opacity: 0.5,
	});
	return(circle);
};

Post.prototype.draw_label = function (paper, title, x, y){
	var label = paper.text(x, y, title);
	return(label);
};

Post.prototype.hover_func = function (circle, label) {	
	function hoverIn(circle, label) {
		circle.attr({
			fill: 'green',
		});
		label.show();
    };
	
	function hoverOut(circle, label){
        circle.attr({
			fill: 'steelblue',
		});
		label.hide();		
    };

	circle.hover(hoverIn(circle, label), hoverOut(circle, label), label, label);
}




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
		var post = new Post(paper, posts[i].title, posts[i].url, posts[i].score, posts[i].postlastupdate);
	};
});
