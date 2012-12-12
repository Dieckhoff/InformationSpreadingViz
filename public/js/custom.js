function Post(id, paper, title, url, importance, time, tourl, fromurl){
	this.paper = paper;
	this.title = title;
	this.url = url;
	this.importance = importance;
	this.size = this.importance * 2;
	this.time = time;
	this.x = parseInt(time);
	this.y = 60;
	this.Uuid = id;

	this.toUrl = tourl;
	this.fromurl = fromurl;

	
	this.label = this.draw_label(this.paper, this.title, this.importance, this.x, this.y-20);
	this.label.hide();
	this.circle = this.draw_circle(this.paper, this.size, this.time, this.Uuid);
}

Post.prototype.draw_circle = function (paper, importance, time, id){
	var circle = paper.circle(time, 60, importance);
	circle.id = id;
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
		'{ "Uuid":"hallo" , "title":"hallo" , "score":"6" , "blogtitle":"Stern" , "url":"www.stern.de/blog" , "type":"News" , "tourl":"jsdf" , "fromurl":"hallo" , "postlastupdate":"150" },' +
		'{ "Uuid":"jsdf" ,"title":"jsdf" , "score":"7" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Facebook" , "tourl":"Qwertz" , "fromurl":"hallo" , "postlastupdate":"100" },' +
		'{ "Uuid":"Qwertz", "title":"Qwertz" , "score":"12" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Facebook" , "tourl":"hallo" , "fromurl":"jsdf" , "postlastupdate":"200" }]';
	
	var posts = JSON.parse(posts_example);
	
	for (var i = 0; i < posts.length; ++i) {
		var post = new Post(posts[i].Uuid, paper, posts[i].title, posts[i].url, posts[i].score, posts[i].postlastupdate, posts[i].tourl, posts[i].fromurl);		
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
					var arrowFrom = paper.getById(post.fromurl);

					draw_toArrow(post, arrowTo);
					draw_fromArrow(arrowFrom, post);


				}).mouseout(function () {
					this.animate({"fill-opacity": .5}, 200);
					post.label.hide();
					xp.remove(); 
					p.remove();
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

		function draw_toArrow(start, end) {

			console.log("draw_toArrow");

			var xdiff = start.x - parseInt(end.attr("cx")) ;//arrow always drawn leftwards, startcoordinate bigger than endcoordinate


			var xx = start.x - xdiff * 0.25;
			var xy = start.y + xdiff * 0.2;

			var yx = parseInt(end.attr("cx")) + xdiff *0.25;
			var yy = parseInt(end.attr("cy")) + xdiff *0.2;


			xp = paper.path ("M" + start.x + " " + start.y + "C" + xx + "," + xy + " " + yx + "," + yy + " " + parseInt(end.attr("cx")) + " " + parseInt(end.attr("cy")));

			xp.attr({'arrow-end': 'classic-wide-long'});
		}

		function draw_fromArrow(start, end) {

			console.log(start);
			console.log(end);


			var xdiff = parseInt(start.attr("cx")) - end.x ;//arrow always drawn leftwards, startcoordinate bigger than endcoordinate


			var xx = parseInt(start.attr("cx")) - xdiff * 0.25;
			var xy = parseInt(start.attr("cy")) + xdiff * 0.2;

			var yx = end.x + xdiff *0.25;
			var yy = end.y + xdiff *0.2;

			var startpoint = parseInt(start.attr("cy")) - parseInt(start.attr("r"))
			var endpoint = end.y - end.size;


			p = paper.path ("M" + parseInt(start.attr("cx")) + " " + startpoint + "C" + xx + "," + xy + " " + yx + "," + yy + " " + end.x + " " + endpoint);

			p.attr({'arrow-end': 'classic-wide-long'});
		}
	}

	
	paper.setViewBox(0, 0, 300, 150, false);	//good for zooming


});