function draw_timeline() {
	timeline = my_paper.path(["M0,200H1200"]);
	timeline.attr({
		stroke: 'grey',
		opacity: .7,
		'stroke-width': 4.0,
		'arrow-end': 'classic-wide-long',
		'arrow-end': 'grey',
	});
}

function draw_timeline_labels(min, max, middle) {
	var startdate = new Date(min);
	var middledate = new Date(middle);
	var enddate = new Date(max);

	var startlabel	= my_paper.text(30, 230, startdate.getDay() + "." + startdate.getMonth() + "." + startdate.getFullYear());
	var middlelabel	= my_paper.text(500, 230, middledate.getDay() + "." + middledate.getMonth() + "." + middledate.getFullYear());
	var endlabel	= my_paper.text(1000, 230, enddate.getDay() + "." + enddate.getMonth() + "." + enddate.getFullYear());
}

function draw_arrow(start_circle, end_circle, up_or_down) {
	var start_x	= parseInt(start_circle.attr("cx"));
	var end_x	=  parseInt(end_circle.attr("cx"));
	var arrow, head;
	var color = start_circle.attr('fill').replace('r(0.75, 0.05)#fff-', '').replace(':150', '');

	if (up_or_down == "up") {
		console.log('up');
		var start_y	= parseInt(start_circle.attr("cy")) - parseInt(start_circle.attr("r"));
		var end_y	= parseInt(end_circle.attr("cy")) - parseInt(start_circle.attr("r"));
		arrow = my_paper.path("M" + start_x + "," + start_y + "A 3,2 0 1,0  " + end_x + "," + end_y);
		head = draw_arrow_head(end_x, end_y, color, "down");
	}
	else {
		console.log('down');
		var start_y	= parseInt(start_circle.attr("cy")) + parseInt(start_circle.attr("r"));
		var end_y	= parseInt(end_circle.attr("cy")) + parseInt(start_circle.attr("r"));
		arrow = my_paper.path("M" + start_x + "," + start_y + "A 3,2 0 0,1  " + end_x + "," + end_y);
		head = draw_arrow_head(end_x, end_y, color, "up");
	}	
	arrow.attr({
		stroke: color,
		'stroke-width': 3.0,
	});

//	head.toBack();
//	arrow.toBack();
}

function draw_arrow_head(x, y, color, up_or_down){
	var head;
	var x2 = x + 2;
	if (up_or_down == "down") {
		head = my_paper.path("M" + x2 + "," + y + "l -2,-8 l 8,2 z");
		head.attr({
			fill: color,
			stroke: color,
		});
	}
	else {
		head = my_paper.path("M" + x2 + "," + y + "l 2,8 l 2,-8 z");
		head.attr({
			fill: color,
			stroke: color,
		});
	}
	return head;
}

function clearAll(){
	my_paper.clear();
	delete arr;
	delete timeline;
}

function clear_marking() {
	for(var i = 0; i < arr.length; i++) {
		if (arr[i].circle.g != null)
			arr[i].circle.g.remove();
		
		arr[i].circle.attr({
			'stroke-width': 0.0,
		});
	}
}