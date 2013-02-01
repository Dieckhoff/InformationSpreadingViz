function initialize_posts(initial_post_id){
	draw_timeline();
	$("#loading").show();
	$.getJSON("http://localhost:8080/InformationSpreadingViz/InformationSpreading?id=" + initial_post_id,
		function(result){		
			$("#loading").hide();
			var posts = result.posts;
			initialize_post_callback(posts);
		}.bind(this)
	);	
};

function initialize_post_callback(posts){
	arr = new Array();
	
	var initial_post = posts[0];
	var min_max_values = get_min_max_values(posts);
	
	var min_date		= min_max_values[0];
	var max_date		= min_max_values[1];
	var min_importance	= min_max_values[2];
	var max_importance	= min_max_values[3];
	
	for (var i = 0; i < posts.length; ++i) {	// drawing all the mentioned posts (including the initial (clicked) post
		var post = new Post(posts[i].id);

		post.paper = my_paper;
		post.title = posts[i].title;
		post.type = posts[i].type;
		post.url = posts[i].url;
		post.blog = posts[i].blog;
		post.image_source = posts[i].image;

		post.importance = parseFloat(posts[i].score);
		post.size = normalize_size(max_importance, min_importance, post.importance);

		post.time = new Date(parseInt(posts[i].pubDate));
		middle_date = parseInt(initial_post.pubDate);

		post.x = normalize_position(max_date, min_date, middle_date, parseInt(posts[i].pubDate));

		post.y = 200;

		if (post.type == 'Facebook'){
			post.color = 'forestgreen';
		}
		else if (post.type == 'Twitter'){
			post.color = 'firebrick';
		}
		else if (post.type == 'Newsportal'){
			post.color = 'darkgray';
		}
		else if (post.type == 'Blog'){
			post.color = 'steelblue';
		}
		else{
			post.color = 'steelblue';
		}

		post.label = post.draw_label();
		post.label.hide();
		post.preview_image = post.show_preview();
		post.preview_image.hide();
		post.circle = post.draw_circle();

		post.to = initial_post.incomingLinks;
		post.from = initial_post.outgoingLinks;

		arr.push(post);
	};
	
	draw_timeline_labels(max_date, min_date, middle_date);
	timeline.toBack();
	
	var clicked = arr[0];
	
	console.log(clicked.circle);
	
	
	clicked.circle.toFront();
	
	clicked.to = initial_post.incomingLinks;
	clicked.from = initial_post.outgoingLinks;
	
	clicked.links = clicked.draw_links();
	
	clicked.circle.g = clicked.circle.glow({
		width: 40,
		fill: true,
		color: 'orange',
	});
	
//	clicked.circle.attr({
//		stroke: 'orange',
//		'stroke-width': 6.0,
//	});
//	
	initialize_functions();
}

function initialize_functions(){
	for(var i = 0; i < arr.length; i++) {
		var post = arr[i];
		(function(post) {
			post.circle.mouseover(function() {
//				this.animate({"opacity": .8}, 200);
				post.label.show();
				post.preview_image.show();
			}).mouseout(function () {
//					this.animate({"opacity": .5}, 200);
				post.label.hide();
				post.preview_image.hide();
			});
			post.circle.dblclick(function() {
				var pos_x	= parseInt(this.attr('cx'));
				var radius	= parseInt(this.attr('r'));
				var color	= parseInt(this.attr('fill'));
				clearAll();
				draw_timeline();
				clicked_circle = my_paper.circle(pos_x, 200, radius);
				clicked_circle.attr({
					stroke: .0,
					fill: color,
				});
				initialize_posts(post.Uuid);
			});
			post.circle.click(function() {
				clear_marking();
				this.g = this.glow({
					color: 'orange',
					width: 90.0,
				});
			});
		})(post);
	};
}