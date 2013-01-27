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


	initialize_posts();

//	var posts_example = '[' +
//		'{ "Uuid":"hallo" , "title":"hallo" , "score":"0.0006" , "blogtitle":"Stern" , "url":"www.stern.de/blog" , "type":"News" , "postpubdate":"1003755997000" },' +
//		'{ "Uuid":"x" ,"title":"Qwertz" , "score":"0.0009" , "blogtitle":"Some Blog" , "url":"www.dfztig.de/bloghohioho" , "type":"blabla" , "postpubdate":"1070755997000" },' +
//		'{ "Uuid":"Qwertz" ,"title":"Qwertz" , "score":"0.0008" , "blogtitle":"buuuh" , "url":"www.df.de/blog" , "type":"Facebook" , "postpubdate":"1094755993000" },' +
//		'{ "Uuid":"jsdf", "title":"jsdf" , "score":"0.0007" , "blogtitle":"Ooohh" , "url":"www.df.de/blog" , "type":"Twitter" , "postpubdate":"1304756997000" },' +
//		'{ "Uuid":"q" ,"title":"Qwertz" , "score":"0.0004" , "blogtitle":"boooaaahhh!!!" , "url":"www.df.de/blog" , "type":"Facebook" , "postpubdate":"1603798471000" }' +
//	']';
//
//	var links_example = '[' +
//		'{ "from":"jsdf", "to":"hallo" },' +
//		'{ "from":"q", "to":"Quertz" },' +
//		'{ "from":"q", "to":"x" },' +
//		'{ "from":"jsdf", "to":"x" },' +
//		'{ "from":"Quertz", "to":"x" },' +
//		'{ "from":"q", "to":"hallo" },' +
//		'{ "from":"jsdf", "to":"Quertz" }' +
//	']';

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
	
	var posts;
	
	function initialize_posts(){
		$.getJSON("http://localhost:8080/InformationSpreadingViz/InformationSpreading?id=de.zeit.www:http/digital/datenschutz/2012-11/google-transparency-report-2012",
			function(result){
				$.each(result, function(i, field){
//					console.log(this[0]);
					posts = JSON.parse(this[0]);
				});
			}
		);
		
//		links = JSON.parse(links_example);
		
		var max_importance = 0;
		var min_importance = parseFloat(posts[0].score);

		var max_date = 0;
		var min_date = posts[0].pubDate;
		
		console.log(posts);
		for (var i = 0; i < posts.length; ++i){
			post = posts[i];
			if (parseFloat(post.score) > max_importance)
				max_importance = parseFloat(post.score);
			if (parseFloat(post.score) < min_importance)
				min_importance = parseFloat(post.score);
			if (post.pubDate > max_date)
				max_date = post.pubDate;
			if (post.pubDate < min_date)
				min_date = post.pubDate;
		}
		
		for (var i = 0; i < posts.length; ++i) {
			var post = new Post(posts[i].Uuid);

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
				);
				post.circle.click(function(){
					clearAll();
					post.links = post.draw_links();
					$.getJSON("http://localhost:8080/InformationSpreadingViz/InformationSpreading?id=" + post.Uuid,
						function(result){
							$.each(result, function(i, field){
							console.log(this[0]);
					    });
					});				
				});
			})(post);
		};
	}	
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