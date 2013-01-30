$(function() {
	paper = Raphael('draw',"500%","500%");
//	post_array = new Array();

	initialize_posts("de.zeit.www:http/digital/datenschutz/2012-11/google-transparency-report-2012");
});

//Event Listener for Zooming in Firefox/Chrome/IE8 and IE9
//$(window).resize(function() {
//	var timelineLength = 1200;
//	var zoom = detectZoom.zoom();
//	if(zoom > 0.75){
//		timeline.transform("s" + (1.0/zoom) * 3);
//		timelineLength = timelineLength * (1.0/zoom) * 3;
//	}
//	else{
//		timeline.transform("s"+(1.0/zoom) * 1.2);
//		timelineLength = timelineLength * (1.0/zoom) * 1.2;
//	}
//	for (var i = 0; i < post_array.length; ++i) {
//		//post_array[i].circle.transform("s" + (1.0 / zoom));
//		var xcoord = post_array[i].circle.attr('cx');
//		if(zoom > 0.75){
//			post_array[i].circle.attr({
//				'cx' : xcoord * zoom,
//			});
//		}
//		else{
//			post_array[i].circle.attr({
//				'cx' : xcoord * zoom,
//			});
//		}
//	}
//});
