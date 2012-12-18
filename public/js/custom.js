function Post(id, paper, title, type, url, importance, time, tourl, fromurl){
	this.paper = paper;
	this.title = title;
	this.type = type;
	this.url = url;
	this.importance = importance;
	this.size = this.importance * 2;
	this.time = time;
	this.x = parseInt(time);
	this.y = 40;
	this.Uuid = id;

	this.toUrl = tourl;
	this.fromurl = fromurl;

	this.to = get_links_to_here(this.Uuid, links);
	this.from = get_links_from_here(this.Uuid, links);

	this.pathTo;
	this.pathFrom;

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
	this.circle = this.draw_circle();
	this.links = this.draw_links();
	// this.links.hide();
}

function get_links_from_here(uuid, links){
	var list = [];
	for (var i = 0; i < links.length; ++i){
		var link = links[i];
		if (link.from == uuid){
			list.push(link.to);
		}
	}
	return(list);
}

function get_links_to_here(uuid, links){
	var list = [];
	for (var i = 0; i < links.length; ++i){
		var link = links[i];
		if (link.to == uuid){
			list.push(link.from);
		}
	}
	return(list);
}

Post.prototype.draw_links = function (){
	from_links = this.from;
	to_links = this.to;
	var end;
	var start = this;
	for (var i = 0; i < to_links.length; ++i){
		end = this.paper.getById(to_links[i]);
		if (end != null){
			var xdiff = start.x - parseInt(end.attr("cx"));	//arrow always drawn leftwards, startcoordinate bigger than endcoordinate
			var starty = start.y + start.size;
			var endpointy = parseInt(end.attr("cy")) + parseInt(end.attr("r"));

			var xx = start.x - xdiff * 0.25;
			var xy = starty + xdiff * 0.2;

			var yx = parseInt(end.attr("cx")) + xdiff * 0.25;
			var yy = endpointy + xdiff * 0.2;

			start.pathTo = this.paper.path ("M" + start.x + " " + starty + "C" + xx + "," + xy + " " + yx + "," + yy + " " + parseInt(end.attr("cx")) + " " + endpointy);

			start.pathTo.attr({
				'arrow-end': 'classic-wide-long',
				'arrow-end': String(start.color),
				'stroke': String(start.color),
			});
		}
	}

	end = this;
	for (var i = 0; i < from_links.length; ++i){
		var start = this.paper.getById(from_links[i]);
		if (start != null){
			var xdiff = parseInt(start.attr("cx")) - end.x ;//arrow always drawn leftwards, startcoordinate bigger than endcoordinate

			var starty = parseInt(start.attr("cy")) - parseInt(start.attr("r"))
			var endpointy = end.y - end.size;

			var xx = parseInt(start.attr("cx")) - xdiff * 0.25;
			var xy = starty - xdiff * 0.2;

			var yx = end.x + xdiff * 0.25;
			var yy = endpointy - xdiff * 0.2;

			end.pathFrom = this.paper.path ("M" + parseInt(start.attr("cx")) + " " + starty + "C" + xx + "," + xy + " " + yx + "," + yy + " " + end.x + " " + endpointy);

			end.pathFrom.attr({
				'arrow-end': 'classic-wide-long',
				'arrow-end': String(end.color),
				'stroke': String(end.color),
			});
		}
	}
};

Post.prototype.draw_circle = function (){
	var circle = this.paper.circle(this.time, 60, this.importance);
	circle.id = this.Uuid;

	circle.attr({
		fill: "r(0.75, 0.05)#fff-"+this.color+":150",
		cursor: 'pointer',
		opacity: 0.5,
		"stroke-width": 0,
	});

	circle.glow({
		width: '10',	// size of the glow, default is 10
		fill: 'true',	// will it be filled, default is false
		color: String(this.color),	// glow colour, default is black
	});

	return(circle);
};

Post.prototype.draw_label = function (){
	var text = "Titel: " + this.title + "\n Wichtigkeit: " + this.importance;
	var label = this.paper.text(this.x, this.y, text);
	label.attr({
		"font-family": "Arial, Helvetica, sans-serif"
	});
	return(label);
};

$(function() {
	var paper = Raphael('draw', 0, 0);
	arr = new Array();

	var timeline = paper.path(["M15,60H300"]);
	timeline.attr({
		stroke: 'grey',
		opacity: .7,
		'stroke-width': 3.0,
		'arrow-end': 'classic-wide-long',
	});

	var posts_example = '[' +
		'{ "Uuid":"hallo" , "title":"hallo" , "score":"6" , "blogtitle":"Stern" , "url":"www.stern.de/blog" , "type":"News" , "tourl":"jsdf" , "fromurl":"Qwertz" , "postlastupdate":"150" },' +
		'{ "Uuid":"Qwertz" ,"title":"Qwertz" , "score":"8" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Facebook" , "tourl":"q" , "fromurl":"" , "postlastupdate":"200" },' +
		'{ "Uuid":"q" ,"title":"Qwertz" , "score":"12" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Facebook" , "tourl":"" , "fromurl":"x" , "postlastupdate":"50" },' +
		'{ "Uuid":"x" ,"title":"Qwertz" , "score":"9" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"blabla" , "tourl":"" , "fromurl":"" , "postlastupdate":"250" },' +
		'{ "Uuid":"jsdf", "title":"jsdf" , "score":"7" , "blogtitle":"b" , "url":"www.df.de/blog" , "type":"Twitter" , "tourl":"" , "fromurl":"x" , "postlastupdate":"100" }' +
	']';

	var links_example = '[' +
		'{ "from":"hallo", "to":"jsdf" },' +
		'{ "from":"Qwert", "to":"q" },' +
		'{ "from":"x", "to":"q" },' +
		'{ "from":"x", "to":"jsdf" },' +
		'{ "from":"x", "to":"Qwertz" },' +
		'{ "from":"hallo", "to":"q" },' +
		'{ "from":"hallo", "to":"x" }' +
	']';

	var posts = JSON.parse(posts_example);
	links = JSON.parse(links_example);

	for (var i = 0; i < posts.length; ++i) {
		var post = new Post(posts[i].Uuid, paper, posts[i].title, posts[i].type, posts[i].url, posts[i].score, posts[i].postlastupdate, posts[i].tourl, posts[i].fromurl);
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
				}).mouseout(function () {
					this.animate({"opacity": .5}, 200);
					post.label.hide();
				}
			);

			post.circle.click(function(){
				clearAll();
				//this.attr({"stroke-width": 3.0});

				// var arrowTo = paper.getById(post.toUrl);
				// var arrowFrom = paper.getById(post.fromurl);

				// if (arrowTo.id != 0)
				// 	draw_toArrow(post, arrowTo);
				// if(arrowFrom.id !=0)
				// draw_fromArrow(arrowFrom, post);
			});
		})(post);

		function clearAll(){
			for(var i = 0; i < arr.length; i++) {
				arr[i].circle.attr({"stroke-width": 0, "stroke": 'red'});
				if (typeof arr[i].pathFrom !== "undefined"){
					arr[i].pathFrom.remove();
				}
				if (typeof arr[i].pathTo !== "undefined"){
					console.log(arr[i].pathTo);
					arr[i].pathTo.remove();
				}
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

	paper.setViewBox(0, 0, 300, 150, false);	//good for zooming
	// simulateClick()
});