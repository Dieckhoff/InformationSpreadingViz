function Post(paper, title, url, importance, time){
	this.paper = paper;
	this.title = title;
	this.url = url;
	this.importance = importance;
	this.size = this.importance * 2;
	this.time = time;
	this.x = time;
	this.y = 60;
	
	this.label = this.draw_label(this.paper, this.title, this.importance, this.x, this.y-20);
	this.label.hide();
	this.circle = this.draw_circle(this.paper, this.size, this.time);
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

Post.prototype.draw_label = function (paper, title, importance, x, y){
	var text = "Titel: " + title + "\n Wichtigkeit: " + importance;
	var label = paper.text(x, y, text);
	return(label);
};

$(function() {
	var paper = Raphael('draw', 30, 0, 0, 0);
	arr = new Array();
	
	var posts_example = '[' +
		'{ "title":"hallo" , "score":"6" , "blogtitle":"Stern" , "url":"www.stern.de/blog" , "type":"News" , "tourl":"something" , "fromurl":"something" , "postlastupdate":"150" },' +
		'{ "title":"jsdf" , "score":"7" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Facebook" , "tourl":"something" , "fromurl":"something" , "postlastupdate":"100" },' +
		'{ "title":"Qwertz" , "score":"12" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Facebook" , "tourl":"something" , "fromurl":"something" , "postlastupdate":"200" },' +
		'{ "title":"Quarz" , "score":"1" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Facebook" , "tourl":"something" , "fromurl":"something" , "postlastupdate":"125" },' +
		'{ "title":"Wie gehts?" , "score":"2" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Facebook" , "tourl":"something" , "fromurl":"something" , "postlastupdate":"78" },' +
		'{ "title":"na du" , "score":"5" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Facebook" , "tourl":"something" , "fromurl":"something" , "postlastupdate":"999" },' +
		'{ "title":"was los?" , "score":"1" , "blogtitle":"ghhtre" , "url":"www.gdfds.de/blog" , "type":"Twitter" , "tourl":"something" , "fromurl":"something" , "postlastupdate":"20" } ]';
	
	var posts = JSON.parse(posts_example);
	
	for (var i = 0; i < posts.length; ++i) {
		var post = new Post(paper, posts[i].title, posts[i].url, posts[i].score, posts[i].postlastupdate);		
		arr.push(post);
	};
		
	for(var i = 0; i < arr.length; i++) {
		var post = arr[i];
		(function(post) {
			post.circle.attr({"fill":"steelblue", "stroke-width": 0, "fill-opacity": .5, 'stroke': 'green'});
			post.circle.mouseover(
				function () {
					this.animate({"fill-opacity": .7}, 200);
					post.label.show();
				}).mouseout(function () {
					this.animate({"fill-opacity": .5}, 200);
					post.label.hide();
				}
			);
			post.circle.click(function(){
				clearAll();
				this.attr({"stroke-width": .7});
				//this.glow();
			});
		})(post);
			
		function clearAll(){
			for(var i = 0; i < arr.length; i++) {
				arr[i].circle.attr({"stroke-width": 0});
			}
		}		
	}
	
	paper.setViewBox(0, 0, 300, 150, false);	//good for zooming
});