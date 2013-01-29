function initialize_posts(initial_post_id){	
	$.getJSON("http://localhost:8080/InformationSpreadingViz/InformationSpreading?id=" + initial_post_id,
		function(result){
		var posts = result.posts;
			initialize_post_callback(posts);
		}.bind(this)
	);
};

function initialize_post_callback(posts){
	draw_timeline();
	
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

		post.x = normalize_position(max_date, min_date, parseInt(posts[i].pubDate));

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
			post.color = 'green';
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
	
	var clicked = arr[0];
	
	clicked.to = initial_post.incomingLinks;
	clicked.from = initial_post.outgoingLinks;

//	clicked.color = 'yellow';
//	clicked.circle.glow({
//		color: 'yellow',
//	});
	
	clicked.links = clicked.draw_links();
//	clicked.circle.toFront();
	initialize_functions(arr);
}

function initialize_functions(arr){
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
		var score = parseFloat(posts[i].score);
		var date = parseInt(posts[i].pubDate);

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

function draw_timeline(){
	timeline = paper.path(["M0,200H1200"]);
	timeline.attr({
		stroke: 'grey',
		opacity: .7,
		'stroke-width': 4.0,
		'arrow-end': 'classic-wide-long',
		'arrow-end': 'grey',
	});
}

function normalize_size(max, min, score){
	return ( (score - min) * ( (50 - 20) / (max - min) ) + 20 );
}

function normalize_position(max, min, time){
	var result = 30;
	if (time > 0) 
		result = ( (time - min) * ((1000 - 60) / (max - min)) + 60 );		
	return result;
}

function calculate_position(max_pos_diff, min_pos_diff, current_pos){
	if ((max_pos_diff < 20) && (max_pos_diff > 300)){
	}
	else return current_pos;
}

function clearAll(){
	for(var i = 0; i < arr.length; i++) {
//		arr[i].color = "";		
//		delete arr[i].circle;
//		delete arr[i].links;
//		arr[i].circle.attr({"stroke-width": 0, "stroke": 'red'});
//		if (arr[i].links != undefined)
//			arr[i].links.hide();
	}
	paper.clear();
	draw_timeline();
}