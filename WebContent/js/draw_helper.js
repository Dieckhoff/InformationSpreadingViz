function draw_timeline(min, max, middle) {
	timeline = paper.path(["M0,200H1200"]);
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
}