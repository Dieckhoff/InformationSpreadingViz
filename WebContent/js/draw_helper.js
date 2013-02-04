function draw_timeline() {
	timeline = my_paper.path(["M0,225H1200"]);
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

	var startlabel	= my_paper.text(30, 370, startdate.getDay() + "." + startdate.getMonth() + "." + startdate.getFullYear());
	var middlelabel	= my_paper.text(500, 370, middledate.getDay() + "." + middledate.getMonth() + "." + middledate.getFullYear());
	var endlabel	= my_paper.text(1000, 370, enddate.getDay() + "." + enddate.getMonth() + "." + enddate.getFullYear());
	
	var fontsize = 14;
	
	startlabel.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: '#ABA8A8',
		'font-size': fontsize,
	});
	
	middlelabel.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: '#ABA8A8',
		'font-size': fontsize,
	});
	
	endlabel.attr({
		"font-family": "Arial, Helvetica, sans-serif",
		origin: 'baseline',
		'text-anchor': 'start',
		fill: '#ABA8A8',
		'font-size': fontsize,
	});
}

function draw_arrow(start_circle, end_circle) {
	var start_x	= parseInt(start_circle.attr("cx"));
	var end_x	=  parseInt(end_circle.attr("cx"));
	var arrow, head;
	var color = start_circle.attr('fill').replace('r(0.75, 0.05)#fff-', '').replace(':150', '');

	if (start_x < end_x) {
		var start_y	= parseInt(start_circle.attr("cy")) - parseInt(start_circle.attr("r"));
		var end_y	= parseInt(end_circle.attr("cy")) - parseInt(end_circle.attr("r"));
		arrow = my_paper.path("M" + start_x + "," + start_y + "A 2,1 0 0,1  " + end_x + "," + end_y);
//		head = draw_arrow_head(end_x, end_y, color, "down");
	}
	else if (start_x > end_x){
		var start_y	= parseInt(start_circle.attr("cy")) + parseInt(start_circle.attr("r"));
		var end_y	= parseInt(end_circle.attr("cy")) + parseInt(end_circle.attr("r"));
		arrow = my_paper.path("M" + start_x + "," + start_y + "A 2,1 0 0,1  " + end_x + "," + end_y);
//		head = draw_arrow_head(end_x, end_y, color, "up");
	}
	else {
		return 1;
	}
	if (arrow != undefined)
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
	delete navBarElements;
}

function clear_marking() {
	for(var i = 0; i < arr.length; i++) {
		if (arr[i].circle.g != null)
			arr[i].circle.g.remove();
		
		arr[i].circle.attr({
			'stroke-width': 0.0,
		});
		
		arr[i].isSelected = false;
	}
}

function get_selected_post() {
	var selected_post = null
	for(var i = 0; i < arr.length; i++) {
			if (arr[i].isSelected == true) {
				selected_post = arr[i];
			}			
	}	
	return selected_post;	
}
