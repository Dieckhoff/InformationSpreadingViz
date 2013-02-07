function Post(id){
	this.Uuid = id;
	this.title;
	this.type;
	this.url;
	this.blog;
	this.importance;
	this.size;
	this.time;
	this.x;
	this.y = 225;
	this.image_source;
	this.to;
	this.from;
	this.color;
	this.label;
	this.preview_image;
	this.circle;
	this.links;
	this.isSelected = false;
	this.imgwidth;
	this.imgheight;
}

Post.prototype.show_preview = function (){
	image = my_paper.image(this.image_source, this.x + 5, this.y - 185, this.imgwidth, this.imgheight);
	return(image);
};

Post.prototype.draw_links = function (){
	my_paper.setStart();
	from_links = this.from;
	to_links = this.to;
	var other;
	
	// from here:
	for (var i = 0; i < from_links.length; ++i) {
		other = my_paper.getById(from_links[i]);
		draw_arrow(this.circle, other);
	}
	
	// to here:
	for (var i = 0; i < to_links.length; ++i) {
		other = my_paper.getById(to_links[i]);
		draw_arrow(this.circle, other);
	}
	
	return( my_paper.setFinish() );
};

Post.prototype.draw_circle = function (){
	var circle = my_paper.circle(this.x, this.y, this.size);
	circle.id = this.Uuid;

	circle.attr({
		fill: "r(0.75, 0.05)#fff-" + this.color + ":150",
		cursor: 'pointer',
		opacity: 1.0,
		"stroke-width": 0,
	});

	return(circle);
};

Post.prototype.draw_label = function (){
	my_paper.setStart();

	var fontsize = 14;
	var titlefontsize = 20;	

	var box = my_paper.rect(this.x - 15, 30, 400 + this.imgwidth, 100, 5);
	box.attr({
		fill: '#ffffff',
		opacity: 0.95,
		"stroke-width": 0,	
	});
	
	var type_string;
	if (this.type != null) type_string = this.type;
	else type_string = "Beitrag";
	var date = new Date(this.time);
	
	var titletext = this.title.substring(0, 30) + "...";
	var title = my_paper.text(this.x + 30 + this.imgwidth, this.y - 175, titletext);		
	title.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: 'black',
		'font-size': titlefontsize,
	});

	var line2text = type_string + " vom " + date.getDay() + "." + date.getMonth() + "." + date.getFullYear();
	var line2 = my_paper.text(this.x + 28 + this.imgwidth, this.y - 152, line2text);
	line2.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: '#ABA8A8',
		'font-size': fontsize,
	});
	
	var line3text = "veröffentlicht auf " + this.blog;
	var line3 = my_paper.text(this.x + 28 + this.imgwidth, this.y - 132, line3text);
	line3.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: '#ABA8A8',
		'font-size': fontsize,
		
	});
	
	var line4text = type_string + " lesen ...";
	var line4 = my_paper.text(this.x + 28 + this.imgwidth, this.y - 112, line4text);
	line4.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: '#ABA8A8',
		'font-size': fontsize,
		href: this.url,		
	});	
	
	var label = my_paper.setFinish();
	return(label);
};