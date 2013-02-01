function initialize_posts(initial_post_id){
	$("#loading").show();
	$.getJSON("http://localhost:8080/InformationSpreadingViz/InformationSpreading?id=" + initial_post_id,
		function(result){		
			$("#loading").hide();
			var posts = result.posts;
			initialize_post_callback(posts)
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

		post.paper = paper;
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
			post.color = 'lightgreen';
		}
		else if (post.type == 'Twitter'){
			post.color = 'purple';
		}
		else if (post.type == 'News'){
			post.color = 'orange';
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
	
	draw_timeline(max_date, min_date, middle_date);
	timeline.toBack();
	
	var clicked = arr[0];
	
	console.log(clicked.circle);
	
	
	clicked.circle.toFront();
	
	clicked.to = initial_post.incomingLinks;
	clicked.from = initial_post.outgoingLinks;
	
	clicked.links = clicked.draw_links();
	
	clicked.circle.glow({
		width: 40,
		fill: true,
		color: 'orange',
	});
	
	clicked.circle.attr({
		stroke: 'orange',
		'stroke-width': 6.0,
	});
	
	initialize_functions();
}

function initialize_functions(){
	for(var i = 0; i < arr.length; i++) {
		var post = arr[i];
		(function(post) {
			post.circle.mouseover(
				function () {
//					this.animate({"opacity": .8}, 200);
					post.label.show();
					post.preview_image.show();
				}).mouseout(function () {
//					this.animate({"opacity": .5}, 200);
					post.label.hide();
					post.preview_image.hide();
				}
			);
			post.circle.click(function(){
				clearAll();
				initialize_posts(post.Uuid);
			});
		})(post);
	};
}

function get_min_max_values(posts){

	var max_importance = 0;
	var min_importance = parseFloat(posts[0].score);

	var max_date = 0;
	var min_date = parseInt(posts[0].pubDate);
		
	
	for (var i = 0; i < posts.length; ++i){		
		var post = posts[i];
		var score = parseFloat(post.score);
		var date = parseInt(post.pubDate);

		if (score > max_importance)
			max_importance = score;
		if (score < min_importance)
			min_importance = score;
		if ( (date > max_date) && (date > 0) )
			max_date = date;
		if ( (date < min_date) && (date > 0) )
			min_date = date;
	}
	
	var min_max_values = [];

	min_max_values.push(min_date);
	min_max_values.push(max_date);
	min_max_values.push(min_importance);
	min_max_values.push(max_importance);
	
	return min_max_values;
}

function normalize_size(max, min, score){
	return ( (score - min) * ( (50 - 20) / (max - min) ) + 20 );
}

function normalize_position(max, min, middle, current_time){
	var result = 30;
	if (current_time < middle)
		result = ( (current_time - min) * ((500 - 30) / (max - min)) + 30 );	// left side of the clicked post - from pixel 30 to pixel 500
	else if (current_time > middle)
		result = ( (current_time - min) * ((1000 - 500) / (max - min)) + 500 );	// right side of the clicked post - from pixel 500 to pixel 1000
	else
		result = 500;
	return result;
}

function clearAll(){
	paper.clear();
	delete arr;
}