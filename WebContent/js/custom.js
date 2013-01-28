$(function() {
	var paper = Raphael('draw',"500%","500%");
	arr = new Array();
		
	timeline = paper.path(["M0,200H1200"]);
	timeline.attr({
		stroke: 'grey',
		opacity: .7,
		'stroke-width': 4.0,
		'arrow-end': 'classic-wide-long',
		'arrow-end': 'grey',
	});

	initialize_posts("de.zeit.www:http/digital/datenschutz/2012-11/google-transparency-report-2012");
});

//Event Listener for Zooming in Firefox/Chrome/IE8 and IE9
$(window).resize(function() {
	var timelineLength = 1200;
	var zoom = detectZoom.zoom();
	if(zoom > 0.75){
		timeline.transform("s" + (1.0/zoom) * 3);
		timelineLength = timelineLength * (1.0/zoom) * 3;
	}
	else{
		timeline.transform("s"+(1.0/zoom) * 1.2);
		timelineLength = timelineLength * (1.0/zoom) * 1.2;
	}
	for (var i = 0; i < arr.length; ++i) {
		//arr[i].circle.transform("s" + (1.0 / zoom));
		var xcoord = arr[i].circle.attr('cx');
		if(zoom > 0.75){
			arr[i].circle.attr({
				'cx' : xcoord * zoom,
			});
		}
		else{
			arr[i].circle.attr({
				'cx' : xcoord * zoom,
			});
		}
	}
});