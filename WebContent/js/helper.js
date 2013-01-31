function initialize_posts(initial_post_id){	
	$.getJSON("http://localhost:8080/InformationSpreadingViz/InformationSpreading?id=" + initial_post_id,
		function(result){
		var posts = result.posts;
			initialize_post_callback(posts);
		}.bind(this)
	);
};

function initialize_post_callback(posts_JSON) {
	post_array = [];
	var initial_post_JSON = posts_JSON[0];
	var min_max_values = get_min_max_values(posts_JSON);
	
	var min_date		= min_max_values[0];
	var max_date		= min_max_values[1];
	var min_importance	= min_max_values[2];
	var max_importance	= min_max_values[3];
	
	for (var i = 0; i < posts_JSON.length; ++i) {	// drawing all the mentioned posts (including the initial (clicked) post
		var post = new Post(posts_JSON[i].id);

		post.paper = paper;
		post.title = posts_JSON[i].title;
		post.type = posts_JSON[i].type;
		post.url = posts_JSON[i].url;
		post.blog = posts_JSON[i].blog;
		post.image_source = posts_JSON[i].image;

		post.importance = parseFloat(posts_JSON[i].score);
		post.size = normalize_size(max_importance, min_importance, post.importance);

		post.time = new Date(parseInt(posts_JSON[i].pubDate));
		
		middle_date = parseInt(initial_post_JSON.pubDate);
		post.x = normalize_position(max_date, min_date, middle_date, parseInt(posts_JSON[i].pubDate));

		post.y = 200;

		if (post.type == 'Facebook'){
			post.color = 'green';
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

		post.to = initial_post_JSON.incomingLinks;
		post.from = initial_post_JSON.outgoingLinks;

		post_array.push(post);
	};
	
	var timeline = draw_timeline(min_date, max_date, middle_date);
	timeline.toBack();
	
	var clicked_post = post_array[0];
	
	clicked_post.to = initial_post_JSON.incomingLinks;
	clicked_post.from = initial_post_JSON.outgoingLinks;

	clicked_post.circle.glow({
		width: 40,
		fill: true,
		color: 'orange',
	});
	
	clicked_post.circle.attr({
		stroke: 'orange',
		'stroke-width': 6.0,
		'stroke-opacity': .5,
	});
	
	clicked_post.circle.toFront();
	
	clicked_post.links = clicked_post.draw_links();

	initialize_functions();
}

function initialize_functions(){
	for(var i = 0; i < post_array.length; i++) {
		var post = post_array[i];
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
		if ( (date > max_date) )
			max_date = date;
		if ( (date < min_date) )
			min_date = date;
	}
	
	var min_max_values = [];

	min_max_values.push(min_date);
	min_max_values.push(max_date);
	min_max_values.push(min_importance);
	min_max_values.push(max_importance);
	
	return min_max_values;
}

function normalize_size(max, min, score) {
	return ( (score - min) * ( (50 - 20) / (max - min) ) + 20 );
}

function normalize_position(max, min, middle, current_time) {
	var result;
	
	if (current_time > 0) {
		if (current_time < middle) {
			result = ( (current_time - min) * ((500 - 30) / (max - min)) + 30 );	// left side of the clicked post - from pixel 30 to pixel 500
		}
		else if (current_time > middle)
			result = ( (current_time - min) * ((1000 - 500) / (max - min)) + 500 );	// right side of the clicked post - from pixel 500 to pixel 1000
		else {
			result = 500;
		}
	}
	else
		result = 30;
	
	return result;
}