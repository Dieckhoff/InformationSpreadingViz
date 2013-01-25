$(function() {
	var paper = Raphael('draw',"100%","100%");
	arr = new Array();
	

	var timeline = paper.path(["M0,200H1275"]);
	timeline.attr({
		stroke: 'grey',
		opacity: .7,
		'stroke-width': 4.0,
		'arrow-end': 'classic-wide-long',
		'arrow-end': 'grey',
	});
	
paper.setViewBox(0,0,700,700,false);

	var posts_example = '[' +
		'{ "Uuid":"hallo" , "title":"hallo" , "score":"0.0006" , "blogtitle":"Stern" , "url":"www.stern.de/blog" , "type":"News" , "postpubdate":"1003755997000" },' +
		'{ "Uuid":"x" ,"title":"Qwertz" , "score":"0.0009" , "blogtitle":"Some Blog" , "url":"www.dfztig.de/bloghohioho" , "type":"blabla" , "postpubdate":"1070755997000" },' +
		'{ "Uuid":"Qwertz" ,"title":"Qwertz" , "score":"0.0008" , "blogtitle":"buuuh" , "url":"www.df.de/blog" , "type":"Facebook" , "postpubdate":"1094755993000" },' +
		'{ "Uuid":"jsdf", "title":"jsdf" , "score":"0.0007" , "blogtitle":"Ooohh" , "url":"www.df.de/blog" , "type":"Twitter" , "postpubdate":"1304756997000" },' +
		'{ "Uuid":"q" ,"title":"Qwertz" , "score":"0.0004" , "blogtitle":"boooaaahhh!!!" , "url":"www.df.de/blog" , "type":"Facebook" , "postpubdate":"1603798471000" }' +
	']';

	var links_example = '[' +
		'{ "from":"jsdf", "to":"hallo" },' +
		'{ "from":"q", "to":"Quertz" },' +
		'{ "from":"q", "to":"x" },' +
		'{ "from":"jsdf", "to":"x" },' +
		'{ "from":"Quertz", "to":"x" },' +
		'{ "from":"q", "to":"hallo" },' +
		'{ "from":"jsdf", "to":"Quertz" }' +
	']';

	var max_importance = parseFloat(0.0009);
	var min_importance = parseFloat(0.0004);

	var max_date = 1603798471000;
	var min_date = 1003755997000;
	var max_date_diff = 600000001000;
	var min_date_diff = 1094755994000;

	var posts = JSON.parse(posts_example);
	links = JSON.parse(links_example);

	for (var i = 0; i < posts.length; ++i) {
		var post = new Post(posts[i].Uuid);
		// var post = new Post(posts[i].Uuid);

		post.paper = paper;
		post.title = posts[i].title;
		post.type = posts[i].type;
		post.url = posts[i].url;
		post.blog = posts[i].blogtitle;

		post.importance = parseFloat(posts[i].score);
		post.size = normalize_size(max_importance, min_importance, post.importance);

		post.time = new Date(parseInt(posts[i].postpubdate));
		post.x = normalize_position(max_date, min_date, posts[i].postpubdate);
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
		return ( (score - min) * ( (50 - 20) / (max - min) ) + 20 );
	}

	function normalize_position(max, min, time){
		var result = ( (time - min) * ((1000 - 30) / (max - min)) + 30 );
		return parseInt(result);
	}

	function calculate_position(max_pos_diff, min_pos_diff, current_pos){
		if ((max_pos_diff < 20) && (max_pos_diff > 300)){
		}
		else return current_pos;
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
