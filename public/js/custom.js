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

	this.pathTo;
	this.pathFrom;

	
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
		'{ "Uuid":"hallo" , "title":"hallo" , "score":"6" , "blogtitle":"Stern" , "url":"www.stern.de/blog" , "type":"News" , "tourl":"jsdf" , "fromurl":"Qwertz" , "postlastupdate":"150" },' +
		'{ "Uuid":"Qwertz" ,"title":"Qwertz" , "score":"12" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Facebook" , "tourl":"" , "fromurl":"" , "postlastupdate":"200" },' +
		'{ "Uuid":"jsdf", "title":"jsdf" , "score":"7" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Facebook" , "tourl":"" , "fromurl":"" , "postlastupdate":"100" }]';
	
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

					if (arrowTo.id != 0)
						draw_toArrow(post, arrowTo);
					if(arrowFrom.id !=0)
						draw_fromArrow(arrowFrom, post);


				}).mouseout(function () {
					this.animate({"fill-opacity": .5}, 200);
					post.label.hide();
					if(typeof post.pathFrom !== "undefined"){
						post.pathFrom.remove();
					}
					if(typeof post.pathTo !== "undefined"){
						console.log(post.pathTo);
						post.pathTo.remove();
					}
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

			var xdiff = start.x - parseInt(end.attr("cx")) ;//arrow always drawn leftwards, startcoordinate bigger than endcoordinate

			var startpointy = start.y + start.size;
			var endpointy = parseInt(end.attr("cy")) + parseInt(end.attr("r"))

			var xx = start.x - xdiff * 0.25;
			var xy = startpointy + xdiff * 0.2;

			var yx = parseInt(end.attr("cx")) + xdiff *0.25;
			var yy = endpointy + xdiff *0.2;


			start.pathTo = paper.path ("M" + start.x + " " + startpointy + "C" + xx + "," + xy + " " + yx + "," + yy + " " + parseInt(end.attr("cx")) + " " + endpointy);

			start.pathTo.attr({'arrow-end': 'classic-wide-long'});
		}

		function draw_fromArrow(start, end) {

			var xdiff = parseInt(start.attr("cx")) - end.x ;//arrow always drawn leftwards, startcoordinate bigger than endcoordinate
			
			var startpointy = parseInt(start.attr("cy")) - parseInt(start.attr("r"))
			var endpointy = end.y - end.size;

			var xx = parseInt(start.attr("cx")) - xdiff * 0.25;
			var xy = startpointy - xdiff * 0.2;

			var yx = end.x + xdiff *0.25;
			var yy = endpointy- xdiff *0.2;

			end.pathFrom = paper.path ("M" + parseInt(start.attr("cx")) + " " + startpointy + "C" + xx + "," + xy + " " + yx + "," + yy + " " + end.x + " " + endpointy);

			end.pathFrom.attr({'arrow-end': 'classic-wide-long'});
		}
	}

	
	paper.setViewBox(0, 0, 300, 150, false);	//good for zooming


});