//$(function() {
//	my_paper = new ScaleRaphael($("#draw").attr("id"), $("#draw").width(), $("#draw").height());
////	my_paper = Raphael('draw',"500%","500%");
//	initialize_posts("de.zeit.www:http/digital/datenschutz/2012-11/google-transparency-report-2012");
//});

function init_paper() {
	my_paper = new ScaleRaphael($("#draw").attr("id"), $("#draw").width(), $("#draw").height());
//	my_paper = Raphael('draw',"500%","500%");
	initialize_posts("de.zeit.www:http/digital/datenschutz/2012-11/google-transparency-report-2012");
//	resizePaper();
};

function resizePaper(){
  var win = $(this);
  my_paper.changeSize(win.width(), win.height(), true, false);
}

//$(window).resize(resizePaper);


//
////Event Listener for Zooming in Firefox/Chrome/IE8 and IE9
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
//	for (var i = 0; i < arr.length; ++i) {
//		//arr[i].circle.transform("s" + (1.0 / zoom));
//		var xcoord = arr[i].circle.attr('cx');
//		if(zoom > 0.75){
//			arr[i].circle.attr({
//				'cx' : xcoord * zoom,
//			});
//		}
//		else{
//			arr[i].circle.attr({
//				'cx' : xcoord * zoom,
//			});
//		}
//	}
//});