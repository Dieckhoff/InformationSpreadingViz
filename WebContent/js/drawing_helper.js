function draw_arrow(start_circle, end_circle, paper, up_or_down) {
	var start_x	= parseInt(start_circle.attr("cx"));
	var end_x	=  parseInt(end_circle.attr("cx"));
	var arrow;
	
	if (up_or_down == "up") {
		var start_y	= parseInt(start_circle.attr("cy")) + parseInt(start_circle.attr("r"));
		var end_y	= parseInt(end_circle.attr("cy")) + parseInt(start_circle.attr("r"));
		arrow = paper.path("M" + start_x + "," + start_y + "A 3,2 0 0,1  " + end_x + "," + end_y);
	}
	else {
		var start_y	= parseInt(start_circle.attr("cy")) - parseInt(start_circle.attr("r"));
		var end_y	= parseInt(end_circle.attr("cy")) - parseInt(start_circle.attr("r"));
		arrow = paper.path("M" + start_x + "," + start_y + "A 3,2 0 1,0  " + end_x + "," + end_y);	
	}	

	arrow.attr({
		stroke: 'steelblue',
		'stroke-width': 3.0,
	});
	arrow.toBack();
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