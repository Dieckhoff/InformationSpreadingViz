$(function() {
//	paper = new ScaleRaphael("draw", "500%", "500%");
	paper = Raphael('draw',"500%","500%");
//	post_array = new Array();

	initialize_posts("de.zeit.www:http/digital/datenschutz/2012-11/google-transparency-report-2012");

//	resizePaper();
//	windowAddEvent("onresize", resizePaper, false);
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

//var windowAddEvent = window.attachEvent || window.addEventListener;
//
//function resizePaper(){
//   var w = 0, h = 0;
//   if (window.innerWidth){
//      w = window.innerWidth;
//      h = window.innerHeight;
//   }else if(document.documentElement &&
//           (document.documentElement.clientWidth || 
//            document.documentElement.clientHeight)) { 
//            w = document.documentElement.clientWidth;
//            h = document.documentElement.clientHeight;
//   }
//   paper.changeSize(w, h, true, false);
//}