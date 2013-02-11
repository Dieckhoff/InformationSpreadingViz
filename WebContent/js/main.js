$(function() {
	init_information_spreading("de.stern.www:http/politik/ausland/afghanistan-bundeswehr-uebergibt-verantwortung-in-kundus-1855821.html");
});

function init_information_spreading(initial_post_id) {
	my_paper = new ScaleRaphael($("#draw").attr("id"), $("#draw").width(), $("#draw").height());
	initialize_posts(initial_post_id);
//	resizePaper();
};

function resizePaper(){
  var win = $(this);
  my_paper.changeSize(win.width(), win.height(), true, false);
}

//$(window).resize(resizePaper);

