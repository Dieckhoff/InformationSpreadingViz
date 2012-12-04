function drawPost(post) {
	var paper = Raphael('draw', 30, 0, 0, 0);
	var importance = post.score;
	var time = post.postlastupdate;
	var post = paper.circle(time, 60, importance * 2);
	
	post.attr({
		fill: 'steelblue',
		cursor: 'pointer',
		opacity: 0.5,
	});
	
	function hoverIn(url, title) {
		post.attr({
			fill: "green",
		});
		var label = paper.text(30, 10, title);
    };
	
	//var label = paper.text(post.x, post.y, text);
	
	function hoverOut(){
        post.attr({"fill": "steelblue"});		
    }
	var func = function(post){
		hoverIn(post.score, post.title);
	};
	post.hover(func, hoverOut, post, label);	 
}

$(function() {

	var i = 0;
	var paper = Raphael('draw', 30, 0, 0, 0);
	
	var posts_example = '[' +
		'{ "title":"hallo" , "score":"6" , "blogtitle":"Stern" , "url":"www.stern.de/blog" , "type":"News" , "tourl":"something" , "fromurl":"something" , "postlastupdate":"123" },' +
		'{ "title":"jsdf" , "score":"13" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Facebook" , "tourl":"something" , "fromurl":"something" , "postlastupdate":"100" },' +
		'{ "title":"gsgdg" , "score":"1" , "blogtitle":"ghhtre" , "url":"www.gdfds.de/blog" , "type":"Twitter" , "tourl":"something" , "fromurl":"something" , "postlastupdate":"20" } ]';
	
	var posts = JSON.parse(posts_example);
	drawPost(posts[0]);
	for (i = 0; i < posts.length; ++i) {
		drawPost(posts[i]);
	};
});
