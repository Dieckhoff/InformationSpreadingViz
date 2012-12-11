function Post(id, paper, title, url, importance, time, tourl, fromurl){
	this.paper = paper;
	this.title = title;
	this.url = url;
	this.importance = importance;
	this.size = this.importance * 2;
	this.time = time;
	this.x = parseInt(time);
	this.y = 60;

	this.toUrl = tourl;
	this.fromurl = fromurl;

	
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
		'{ "id":"1" , "title":"hallo" , "score":"6" , "blogtitle":"Stern" , "url":"www.stern.de/blog" , "type":"News" , "tourl":"2" , "fromurl":"3" , "postlastupdate":"150" },' +
		'{ "id":"2" ,"title":"jsdf" , "score":"7" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Facebook" , "tourl":"3" , "fromurl":"1" , "postlastupdate":"100" },' +
		'{ "id":"3", "title":"Qwertz" , "score":"12" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Facebook" , "tourl":"1" , "fromurl":"2" , "postlastupdate":"200" }]';
	
	var posts = JSON.parse(posts_example);
	
	for (var i = 0; i < posts.length; ++i) {
		var post = new Post(posts[i].id, paper, posts[i].title, posts[i].url, posts[i].score, posts[i].postlastupdate, posts[i].tourl, posts[i].fromurl);		
		arr.push(post);
	};
		
	for(var i = 0; i < arr.length; i++) {
		var xp;
		var post = arr[i];
		(function(post) {
			post.circle.attr({"fill":"steelblue", "stroke-width": 0, "fill-opacity": .5, 'stroke': 'green'});
			post.circle.mouseover(
				function () {
					this.animate({"fill-opacity": .7}, 200);
					post.label.show();
					var arrowTo = paper.getById(post.toUrl);
					console.log(arrowTo);
					draw_arrows(post, arrowTo);


				}).mouseout(function () {
					this.animate({"fill-opacity": .5}, 200);
					post.label.hide();
					xp.remove(); 
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

		function draw_arrows(start, end) {

			var xdiff = start.x - parseInt(end.attr("cx")) ;//arrow always drawn leftwards, startcoordinate bigger than endcoordinate
			console.log(start);
			console.log(end);


			var xx = start.x - xdiff * 0.25;
			var xy = start.y + xdiff * 0.2;

			console.log(xx);
			console.log(xy);

			var yx = parseInt(end.attr("cx")) + xdiff *0.25;
			var yy = parseInt(end.attr("cy")) + xdiff *0.2;

			console.log(parseInt(end.attr("x")));
			console.log(yx);
			console.log(yy);

			xp = paper.path ("M" + start.x + " " + start.y + "C" + xx + "," + xy + " " + yx + "," + yy + " " + parseInt(end.attr("cx")) + " " + parseInt(end.attr("cy")));

			xp.attr({'arrow-end': 'classic-wide-long'});
		}
	}

	
	paper.setViewBox(0, 0, 300, 150, false);	//good for zooming


});