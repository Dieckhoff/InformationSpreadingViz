$(function() {
	var paper = Raphael('draw', 0, 0);
	arr = new Array();

	var timeline = paper.path(["M15,200H500"]);
	timeline.attr({
		stroke: 'grey',
		opacity: .7,
		'stroke-width': 4.0,
		'arrow-end': 'classic-wide-long',
		'arrow-end': 'grey',
	});

	var posts_example = '[' +
		'{ "Uuid":"q" ,"title":"Qwertz" , "score":"12" , "blogtitle":"boooaaahhh!!!" , "url":"www.df.de/blog" , "type":"Facebook" , "postlastupdate":"50" },' +
		'{ "Uuid":"jsdf", "title":"jsdf" , "score":"7" , "blogtitle":"Ooohh" , "url":"www.df.de/blog" , "type":"Twitter" , "postlastupdate":"100" },' +
		'{ "Uuid":"hallo" , "title":"hallo" , "score":"6" , "blogtitle":"Stern" , "url":"www.stern.de/blog" , "type":"News" , "postlastupdate":"150" },' +
		'{ "Uuid":"Qwertz" ,"title":"Qwertz" , "score":"8" , "blogtitle":"buuuh" , "url":"www.df.de/blog" , "type":"Facebook" , "postlastupdate":"200" },' +
		'{ "Uuid":"x" ,"title":"Qwertz" , "score":"9" , "blogtitle":"Some Blog" , "url":"www.df.de/blog" , "type":"blabla" , "postlastupdate":"250" }' +
	']';

	var links_example = '[' +
		'{ "from":"hallo", "to":"jsdf" },' +
		'{ "from":"Qwertz", "to":"q" },' +
		'{ "from":"x", "to":"q" },' +
		'{ "from":"x", "to":"jsdf" },' +
		'{ "from":"x", "to":"Qwertz" },' +
		'{ "from":"hallo", "to":"q" },' +
		'{ "from":"x", "to":"hallo" },' +
		'{ "from":"hallo", "to":"jsdf" }' +
	']';

	var max_importance = parseFloat(60.0651283264);
	var min_importance = parseFloat(2.6138337727018646E-15);

	var posts = JSON.parse(posts_example);
	links = JSON.parse(links_example);

	for (var i = 0; i < posts.length; ++i) {
		var post = new Post(posts[i].Uuid);

		post.paper = paper;
		post.title = posts[i].title;
		post.type = posts[i].type;
		post.url = posts[i].url;
		post.blog = posts[i].blogtitle;

		post.importance = posts[i].score;
		post.size = normalize_size(max_importance, min_importance, post.importance) * 200;
		console.log(post.size);

		post.time = posts[i].postlastupdate;
		post.x = parseInt(post.time);
		post.y = 200;


		if (post.type == 'Facebook'){
			post.color = 'steelblue';
		}
		else if (post.type == 'Twitter'){
			post.color = 'purple';
		}
		else if (post.type == 'News'){
			post.color = 'orange';
		}
		else{
			post.color = 'grey';
		}

		post.label = post.draw_label();
		post.label.hide();
		post.preview_image = post.show_preview();
		post.preview_image.hide();
		post.circle = post.draw_circle();

		post.to = post.get_links_to_here();
		post.from = post.get_links_from_here();

		arr.push(post);
	};

	for(var i = 0; i < arr.length; i++) {
		var post = arr[i];
		(function(post) {
			post.circle.mouseover(
				function () {
					this.animate({"opacity": .8}, 200);
					post.label.show();
					post.preview_image.show();
				}).mouseout(function () {
					this.animate({"opacity": .5}, 200);
					post.label.hide();
					post.preview_image.hide();
				}
			)
			post.circle.click(function(){
				clearAll();
				post.links = post.draw_links();
			})
		})(post);
	};

	function clearAll(){
		for(var i = 0; i < arr.length; i++) {
			arr[i].circle.attr({"stroke-width": 0, "stroke": 'red'});
			if (arr[i].links != undefined)
				arr[i].links.hide();
		}
	};


	function normalize_size(max, min, score){
		return (score - min) * ( 1 / (max - min) )
	}

	// function simulateClick() {
	// 	var evt = document.createEvent("MouseEvents");
	// 	evt.initMouseEvent(
	// 		"click", true, true, window,
	// 		0, 0, 0, 0, 0, false, false, false, false, 0, null
	// 	);

	// 	alert(document.getElementById(arr[1].Uuid))
	// 	var circ = document.getElementById(arr[1].Uuid);
	// 	var canceled = !circ.dispatchEvent(evt);

	// 	if(canceled) {
	// 		// A handler called preventDefault
	// 		alert("canceled");
	// 	} else {
	// 		// None of the handlers called preventDefault
	// 		alert("not canceled");
	// 	}
	// }

	//paper.setViewBox(0, 0, 300, 150, false);	//good for zooming
	// simulateClick()
});
