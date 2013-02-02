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
	this.image_source;
	this.to;
	this.from;
	this.color;
	this.label;
	this.preview_image;
	this.circle;
	this.links;
	this.isSelected = false;
}

Post.prototype.show_preview = function(){
	image = this.paper.image(this.image_source, this.x + 5, this.y - 185 , 80, 80);
	return(image);
};

Post.prototype.draw_links = function (){
	this.paper.setStart();
	from_links = this.from;
	to_links = this.to;
	var other;
	
	// from here:
	for (var i = 0; i < from_links.length; ++i) {
		console.log('from ' + from_links[i]);
		other = this.paper.getById(from_links[i]);
		draw_arrow(this.circle, other, 'down');
	}
	
	// to here:
	for (var i = 0; i < to_links.length; ++i) {
		console.log('to ' + to_links[i]);
		other = this.paper.getById(to_links[i]);
		draw_arrow(other, this.circle, 'up');
	}
	
	return( this.paper.setFinish() );
};

Post.prototype.draw_circle = function (){
	var circle = this.paper.circle(this.x, this.y, this.size);
	circle.id = this.Uuid;

	circle.attr({
		fill: "r(0.75, 0.05)#fff-"+this.color+":150",
		cursor: 'pointer',
		opacity: 1.0,
		"stroke-width": 0,
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
		var url = this.paper.text(this.x + 108 , this.y - 135, newurl);
	}else{
		var url = this.paper.text(this.x + 108 , this.y - 135, this.url);
	}	

	url.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: '#ABA8A8',
		'font-size': fontsize,
		href: this.url,
	});
	
	var time = this.paper.text(this.x + 50, this.y - 50, this.time);	//only for debugging

	var label = this.paper.setFinish();
	return(label);
};