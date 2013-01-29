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
	this.image_source = "static/graphics/Newpost.JPG";	//to be individualized...
	this.to;
	this.from;
	this.color;
	this.label;
	this.preview_image;
	this.circle;
	this.links;
}

Post.prototype.show_preview = function(){
	image = this.paper.image(this.image_source, this.x + 5, this.y - 185 , 80, 80);
	return(image);
};

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
			var endx = end.attr("cx");

			var xx = start.x - xdiff * 0.25;
			var xy = starty + xdiff * 0.2;

			var yx = parseInt(end.attr("cx")) + xdiff * 0.25;
			var yy = endy + xdiff * 0.2;

			var arrow = this.paper.path ("M" + start.x + " " + starty);
			arrow.animate({path:"M" + start.x + " " + starty + "C" + xx + "," + xy + " " + yx + "," + yy + " " + parseInt(end.attr("cx")) + " " + endy},300, "easeOut");

			var color = end.attr('fill').replace('r(0.75, 0.05)#fff-', '').replace(':150', '');

			arrow.attr({
				'stroke': color,
				'stroke-width': 1.5,
			});

			var arrowSet1 = this.paper.arrowSet(endx-8,endy-2,endx-3, endy-1,4);
			arrowSet1[0].attr({ "fill" : arrow.attr("stroke"), "stroke-width" : "0" });
		}
	}

// to here
	end = this;
	var start;
//	var pathId; 
	for (var i = 0; i < to_links.length; ++i){
		start = this.paper.getById(to_links[i]);

		if (start != null){

			var xdiff = parseInt(start.attr("cx")) - end.x;	//arrow always drawn leftwards, startcoordinate bigger than endcoordinate

			var starty = parseInt(start.attr("cy")) - parseInt(start.attr("r"));
			var endy = end.y - end.size;

			var xx = parseInt(start.attr("cx")) - xdiff * 0.25;
			var xy = starty - xdiff * 0.2;

			var yx = end.x + xdiff * 0.25;
			var yy = endy - xdiff * 0.2;

			var path = this.paper.path ("M" + parseInt(start.attr("cx")) + " " + starty);

//			var endx_1 = end.x -2;
//			var endx5 = end.x -1;
//
//			var endy10 = endy -2;
//			var endy_1 = endy -1;
//			var endy5 = endy -1;
//			var endy_5 = endy +1;

			path.animate({path:"M" + parseInt(start.attr("cx")) + " " + starty + "C" + xx + "," + xy + " " + yx + "," + yy + " " + end.x + " " + endy},100,"easeOut");
			var color = String(end.color) ;

			var arrowSet = this.paper.arrowSet(end.x-20,endy-5,end.x-1 , endy-1,3);
			arrowSet[0].attr({ "fill" : color, "stroke-width" : "0" });


			path.attr({
				'stroke': color,
				'stroke-width': 1.0,
			});
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
		width: '1',
		fill: 'false',
		color: String(this.color),
		opacity: '0.5',
	});

	return(circle);
};

Post.prototype.draw_label = function (){
	// var text = this.title + "\n" + this.blog + "\n" + this.url;
	this.paper.setStart();

	var fontsize = 16;

	var box = this.paper.rect(this.x - 15, 5, 250, 100, 5);
	box.attr({
		fill: '#F1F1F1',
		opacity: 2,
		stroke: 'none',
	});

	var title = this.paper.text(this.x + 100, this.y - 170, this.title);
	title.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: 'black',
		'font-size': 24,
	});

	var blog = this.paper.text(this.x + 108, this.y - 150, this.blog);
	blog.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: '#ABA8A8',
		'font-size': 16,
	});
		var newurl; 
		var bwidth = box.getBBox().width +18;

		if(this.url.length * fontsize  > bwidth)
		{
			var charsToCutOff = (this.url.length*fontsize -3 - bwidth) / fontsize + 3;
			newurl = this.url.substring(0, this.url.length - charsToCutOff) + "...";
			this.url = this.paper.text(this.x + 108 , this.y - 135, newurl);
		}else{
			this.url = this.paper.text(this.x + 108 , this.y - 135, this.url);
		}

		url.attr({
			"font-family": "Arial, Helvetica, sans-serif",
			origin: 'baseline',
			'text-anchor': 'start',
			fill: '#ABA8A8',
			'font-size': fontsize,
			href: this.url,
		});

	var label = this.paper.setFinish();
	return(label);
};