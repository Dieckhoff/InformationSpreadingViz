function Post(id){
	this.Uuid = id;
	this.paper;
	this.title;
	this.type;
	this.url;
	this.blog;
	this.importance;
	this.size;
	this.time;
	this.x;
	this.y;
	this.image_source = "static/graphics/Newpost.JPG"	//to be individualized...
	this.to;
	this.from;
	this.color;
	this.label;
	this.preview_image;
	this.circle;
	this.links;
}

Post.prototype.show_preview = function(){
	image = this.paper.image(this.image_source, this.x + 5, 7, 80, 80);
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
		id = from_links[i];
		end = this.paper.getById(from_links[i]);
		if (end != null){
			var xdiff = start.x - parseInt(end.attr("cx"));	//arrow always drawn leftwards, startcoordinate bigger than endcoordinate
			var starty = start.y + start.size;
			var endy = parseInt(end.attr("cy")) + parseInt(end.attr("r"));

			var xx = start.x - xdiff * 0.25;
			var xy = starty + xdiff * 0.2;

			var yx = parseInt(end.attr("cx")) + xdiff * 0.25;
			var yy = endy + xdiff * 0.2;

			var arrow = this.paper.path ("M" + start.x + " " + starty);
			arrow.animate({path:"M" + start.x + " " + starty + "C" + xx + "," + xy + " " + yx + "," + yy + " " + parseInt(end.attr("cx")) + " " + endy},300, "easeOut")

			var color = end.attr('fill').replace('r(0.75, 0.05)#fff-', '').replace(':150', '');
			arrow.attr({
				'stroke': color,
				'arrow-end': 'classic-wide-long',
				'arrow-end': 'green',
				'stroke-width': 1.5,
			})
		}
	}

// to here
	end = this;
	var start;
	for (var i = 0; i < to_links.length; ++i){
		start = this.paper.getById(to_links[i]);
		if (start != null){
			var xdiff = parseInt(start.attr("cx")) - end.x;	//arrow always drawn leftwards, startcoordinate bigger than endcoordinate

			var starty = parseInt(start.attr("cy")) - parseInt(start.attr("r"))
			var endy = end.y - end.size;

			var xx = parseInt(start.attr("cx")) - xdiff * 0.25;
			var xy = starty - xdiff * 0.2;

			var yx = end.x + xdiff * 0.25;
			var yy = endy - xdiff * 0.2;

			var path = this.paper.path ("M" + parseInt(start.attr("cx")) + " " + starty);
			path.animate({path:"M" + parseInt(start.attr("cx")) + " " + starty + "C" + xx + "," + xy + " " + yx + "," + yy + " " + end.x + " " + endy},300,"easeOut")
			path.attr({
				'arrow-end': 'classic-wide-long',
				'stroke': String(end.color),
				'stroke-width': 1.5,
			})
		}
	}
	return( this.paper.setFinish() );
};

Post.prototype.draw_circle = function (){
	var circle = this.paper.circle(this.x, this.y, this.size);
	circle.id = this.Uuid;

	circle.attr({
		fill: "r(0.75, 0.05)#fff-"+this.color+":150",
		cursor: 'pointer',
		opacity: 0.5,
		"stroke-width": 0,
	});

	circle.glow({
		width: '7',
		fill: 'false',
		color: String(this.color),
	});

	return(circle);
};

Post.prototype.draw_label = function (){
	// var text = this.title + "\n" + this.blog + "\n" + this.url;
	this.paper.setStart();

	var box = this.paper.rect(this.x - 10, 5, 250, 100, 2);
	box.attr({
		fill: 'lightgrey',
		opacity: .7,
		stroke: 'grey',
	});

	var title = this.paper.text(this.x + 100, 20, this.title);
	title.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: 'steelblue',
		'font-size': 24,
	});

	var blog = this.paper.text(this.x + 115, 42, this.blog);
	blog.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: 'black',
		'font-size': 16,
	});

	var url = this.paper.text(this.x + 115, 60, this.url);
	url.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: 'black',
		'font-size': 16,
		href: this.url,
	});

	var label = this.paper.setFinish();
	return(label);
};