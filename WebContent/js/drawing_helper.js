function draw_arrow(start_circle, end_circle, up_or_down) {
	var start_x	= parseInt(start_circle.attr("cx"));
	var end_x	=  parseInt(end_circle.attr("cx"));
	var arrow, head;
	var color = start_circle.attr('fill').replace('r(0.75, 0.05)#fff-', '').replace(':150', '');
	
	if (up_or_down == "up") {
		var start_y	= parseInt(start_circle.attr("cy")) - parseInt(start_circle.attr("r"));
		var end_y	= parseInt(end_circle.attr("cy")) - parseInt(start_circle.attr("r"));
		arrow = paper.path("M" + start_x + "," + start_y + "A 3,2 0 0,1  " + end_x + "," + end_y);
		head = draw_arrow_head(end_x, end_y, color, "down");
	}
	else {
		var start_y	= parseInt(start_circle.attr("cy")) + parseInt(start_circle.attr("r"));
		var end_y	= parseInt(end_circle.attr("cy")) + parseInt(start_circle.attr("r"));
		arrow = paper.path("M" + start_x + "," + start_y + "A 3,2 0 1,0  " + end_x + "," + end_y);
		head = draw_arrow_head(end_x, end_y, color, "up");
	}	
	arrow.attr({
		stroke: color,
		'stroke-width': 3.0,
	});

	head.toBack();
	arrow.toBack();
}

function draw_arrow_head(x, y, color, up_or_down){
	var head;
	var x2 = x + 2;
	if (up_or_down == "down") {
		head = paper.path("M" + x2 + "," + y + "l -2,-8 l 8,2 z");
		head.attr({
			fill: color,
			stroke: color,
		});
	}
	else {
		head = paper.path("M" + x2 + "," + y + "l 2,8 l 2,-8 z");
		head.attr({
			fill: color,
			stroke: color,
		});
	}


	return head;
}

function clearAll(){
	delete post_array;
	paper.clear();
}

function draw_timeline(min, max, middle) {
	var timeline = paper.path(["M0,200H1200"]);
	timeline.attr({
		stroke: 'grey',
		opacity: .7,
		'stroke-width': 4.0,
		'arrow-end': 'classic-wide-long',
		'arrow-end': 'grey',
	});
	
	// date labels:
	var startdate = new Date(min);
	var middledate = new Date(middle);
	var enddate = new Date(max);

	
	var startlabel	= paper.text(30, 230, startdate.getDay() + "." + startdate.getMonth() + "." + startdate.getFullYear());
	var middlelabel	= paper.text(500, 230, middledate.getDay() + "." + middledate.getMonth() + "." + middledate.getFullYear());
	var endlabel	= paper.text(1000, 230, enddate.getDay() + "." + enddate.getMonth() + "." + enddate.getFullYear());
	
	return timeline;
}