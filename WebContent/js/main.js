function init_paper() {
	my_paper = new ScaleRaphael($("#draw").attr("id"), $("#draw").width(), $("#draw").height());
	initialize_posts("de.zeit.www:http/digital/datenschutz/2012-11/google-transparency-report-2012");
//	resizePaper();
};

function resizePaper(){
  var win = $(this);
  my_paper.changeSize(win.width(), win.height(), true, false);
}

//$(window).resize(resizePaper);