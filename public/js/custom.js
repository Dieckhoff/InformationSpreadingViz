function Post(id, paper, title, type, url, blog, importance, time){

	this.paper = paper;
	this.title = title;
	this.type = type;
	this.url = url;
	this.blog = blog;
	this.importance = importance;
	this.size = importance * 2;
	this.time = time;
	this.x = parseInt(time);
	this.y = 150;
	this.Uuid = id;
	this.image_source = "graphics/Newpost.JPG"	//to be individualized...

	this.to = this.get_links_to_here();
	this.from = this.get_links_from_here();

	this.color;
	if (this.type == 'Facebook'){
		this.color = 'steelblue';
	}
	else if (this.type == 'Twitter'){
		this.color = 'purple';
	}
	else if (this.type == 'News'){
		this.color = 'orange';
	}
	else{
		this.color = 'grey';
	}

	this.label = this.draw_label();
	this.label.hide();
	this.preview_image = this.show_preview();
	this.preview_image.hide();
	this.circle = this.draw_circle();
	this.links;
}

Post.prototype.show_preview = function(){
	image = this.paper.image(this.image_source, this.x - 40, this.y - 100, 80, 80);
	return(image);
}

Post.prototype.get_links_from_here = function(){
	var list = [];
	for (var i = 0; i < links.length; ++i){
		var link = links[i];
		if (link.from == this.Uuid){
			list.push(link.to);
		}
	}
	return(list);
}

Post.prototype.get_links_to_here = function(){
	var list = [];
	for (var i = 0; i < links.length; ++i){
		var link = links[i];
		if (link.to == this.Uuid){
			list.push(link.from);
		}
	}
	return(list);
}

Post.prototype.draw_links = function (){
	this.paper.setStart();
	from_links = this.from;
	to_links = this.to;

// from here
	var end;
	var start = this;
	for (var i = 0; i < from_links.length; ++i){
		end = this.paper.getById(from_links[i]);
		if (end != null){
			var xdiff = start.x - parseInt(end.attr("cx"));	//arrow always drawn leftwards, startcoordinate bigger than endcoordinate
			var starty = start.y + start.size / 2.0;
			var endy = parseInt(end.attr("cy")) + parseInt(end.attr("r"));

			var xx = start.x - xdiff * 0.25;
			var xy = starty + xdiff * 0.2;

			var yx = parseInt(end.attr("cx")) + xdiff * 0.25;
			var yy = endy + xdiff * 0.2;

			var arrow = this.paper.path ("M" + start.x + " " + starty + "C" + xx + "," + xy + " " + yx + "," + yy + " " + parseInt(end.attr("cx")) + " " + endy);

			arrow.attr({
				'arrow-end': 'classic-wide-long',
				'stroke':String(start.color),
			})
		}
	}

// to here
	end = this;
	var start;
	for (var i = 0; i < to_links.length; ++i){
		start = this.paper.getById(to_links[i]);
		if (start != null){
			var xdiff = parseInt(start.attr("cx")) - end.x ;//arrow always drawn leftwards, startcoordinate bigger than endcoordinate

			var starty = parseInt(start.attr("cy")) - parseInt(start.attr("r"))
			var endy = end.y - end.size / 2.0;

			var xx = parseInt(start.attr("cx")) - xdiff * 0.25;
			var xy = starty - xdiff * 0.2;

			var yx = end.x + xdiff * 0.25;
			var yy = endy - xdiff * 0.2;

			var path = this.paper.path ("M" + parseInt(start.attr("cx")) + " " + starty + "C" + xx + "," + xy + " " + yx + "," + yy + " " + end.x + " " + endy);

			path.attr({
				'arrow-end': 'classic-wide-long',
				'stroke': String(end.color),
			})
		}
	}
	return( this.paper.setFinish() );
};

Post.prototype.draw_circle = function (){
	var circle = this.paper.circle(this.x, this.y, this.size);
	console.log(this.size);
	circle.id = this.Uuid;

	circle.attr({
		fill: "r(0.75, 0.05)#fff-"+this.color+":150",
		cursor: 'pointer',
		opacity: 0.5,
		"stroke-width": 0,
	});

	circle.glow({
		width: '10',
		fill: 'true',
		color: String(this.color),
	});

	return(circle);
};

Post.prototype.draw_label = function (){
	// var text = this.title + "\n" + this.blog + "\n" + this.url;

	this.paper.setStart();

	var box = this.paper.rect(this.x - 10, this.y - 150, 250, 90, 2);
	box.attr({});

	var title = this.paper.text(this.x + 45, this.y - 100, this.title);
	title.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: 'steelblue',
		'font-size': 16,
	});

	var blog = this.paper.text(this.x + 55, this.y - 30, this.blog);
	blog.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: 'black',
		'font-size': 9,
	});

	var url = this.paper.text(this.x + 55, this.y - 22, this.url);
	url.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: 'black',
		'font-size': 9,
		href: this.url,
	});

	var label = this.paper.setFinish();
	return(label);
};

$(function() {
	var paper = Raphael('draw', 0, 0);
	arr = new Array();

	var timeline = paper.path(["M15,60H500"]);
	timeline.attr({
		stroke: 'grey',
		opacity: .7,
		'stroke-width': 3.0,
		'arrow-end': 'classic-wide-long',
		'arrow-end': 'grey',
	});

	var posts_example = '[' +
		'{ "Uuid":"q" ,"title":"Qwertz" , "score":"12" , "blogtitle":"boooaaahhh!!!" , "url":"www.df.de/blog" , "type":"Facebook" , "postlastupdate":"50" },' +
		'{ "Uuid":"jsdf", "title":"jsdf" , "score":"7" , "blogtitle":"Ooohh" , "url":"www.df.de/blog" , "type":"Twitter" , "postlastupdate":"100" },' +
		'{ "Uuid":"hallo" , "title":"hallo" , "score":"6" , "blogtitle":"Stern" , "url":"www.stern.de/blog" , "type":"News" , "postlastupdate":"150" },' +
		'{ "Uuid":"Qwertz" ,"title":"Qwertz" , "score":"8" , "blogtitle":"buuuh" , "url":"www.df.de/blog" , "type":"Facebook" , "postlastupdate":"200" },' +
		'{ "Uuid":"x" ,"title":"Qwertz" , "score":"9" , "blogtitle":"Some Blog" , "url":"www.df.de/blog" , "type":"blabla" , "postlastupdate":"250" }' +
	']';

	var links_example = '[' +
		'{ "from":"hallo", "to":"jsdf" },' +
		'{ "from":"Qwertz", "to":"q" },' +
		'{ "from":"x", "to":"q" },' +
		'{ "from":"x", "to":"jsdf" },' +
		'{ "from":"x", "to":"Qwertz" },' +
		'{ "from":"hallo", "to":"q" },' +
		'{ "from":"x", "to":"hallo" },' +
		'{ "from":"hallo", "to":"jsdf" }' +
	']';

	var posts = JSON.parse(posts_example);
	links = JSON.parse(links_example);

	for (var i = 0; i < posts.length; ++i) {
		var post = new Post(
							posts[i].Uuid,
							paper,
							posts[i].title,
							posts[i].type,
							posts[i].url,
							posts[i].blogtitle,
							posts[i].score,
							posts[i].postlastupdate
						);
		arr.push(post);
	};

	for(var i = 0; i < arr.length; i++) {
		var xp;
		var post = arr[i];
		(function(post) {
			post.circle.mouseover(
				function () {
					this.animate({"opacity": .8}, 200);
					post.label.show();
					post.preview_image.show();
				}).mouseout(function () {
					this.animate({"opacity": .5}, 200);
					post.label.hide();
					post.preview_image.hide();
				}
			);

			post.circle.click(function(){
				clearAll();
				post.links = post.draw_links();
			});
		})(post);

		function clearAll(){
			for(var i = 0; i < arr.length; i++) {
				arr[i].circle.attr({"stroke-width": 0, "stroke": 'red'});
				if (arr[i].links != undefined)
					arr[i].links.hide();
			}
		}
	}
	// function simulateClick() {
	// 	var evt = document.createEvent("MouseEvents");
	// 	evt.initMouseEvent(
	// 		"click", true, true, window,
	// 		0, 0, 0, 0, 0, false, false, false, false, 0, null
	// 	);

	// 	alert(document.getElementById(arr[1].Uuid))
	// 	var circ = document.getElementById(arr[1].Uuid);
	// 	var canceled = !circ.dispatchEvent(evt);

	// 	if(canceled) {
	// 		// A handler called preventDefault
	// 		alert("canceled");
	// 	} else {
	// 		// None of the handlers called preventDefault
	// 		alert("not canceled");
	// 	}
	// }

	//paper.setViewBox(0, 0, 300, 150, false);	//good for zooming
	// simulateClick()
});