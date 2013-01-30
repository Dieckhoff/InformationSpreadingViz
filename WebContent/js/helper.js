function initialize_posts(initial_post_id){	
	$.getJSON("http://localhost:8080/InformationSpreadingViz/InformationSpreading?id=" + initial_post_id,
		function(result){
		var posts = result.posts;
			initialize_post_callback(posts);
		}.bind(this)
	);
};

function initialize_post_callback(posts_JSON) {
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

		post.to = initial_post_JSON.incomingLinks;
		post.from = initial_post_JSON.outgoingLinks;

		arr.push(post);
	};
	
	draw_timeline(min_date, max_date, middle_date);
	
	var clicked = arr[0];
	
	clicked.to = initial_post_JSON.incomingLinks;
	clicked.from = initial_post_JSON.outgoingLinks;

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

function draw_timeline(min, max, middle) {
	timeline = paper.path(["M0,200H1200"]);
	timeline.attr({
		stroke: 'grey',
		opacity: .7,
		'stroke-width': 4.0,
		'arrow-end': 'classic-wide-long',
		'arrow-end': 'grey',
	});
	
	// date labels:
	var startdate = new Date(min);
	var middledate = new Date(middle);
	var enddate = new Date(max);
	
	var startlabel	= paper.text(30, 230, startdate.getDay() + "." + startdate.getMonth() + "." + startdate.getFullYear());
	var middlelabel	= paper.text(500, 230, middledate.getDay() + "." + middledate.getMonth() + "." + middledate.getFullYear());
	var endlabel	= paper.text(1000, 230, enddate.getDay() + "." + enddate.getMonth() + "." + enddate.getFullYear());
}

function normalize_size(max, min, score) {
	return ( (score - min) * ( (50 - 20) / (max - min) ) + 20 );
}

function normalize_position(max, min, middle, current_time) {
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
	for (var i = 0; i < arr.length; i++) {
//		arr[i].color = "";
//		delete arr[i].circle;
//		delete arr[i].links;
//		arr[i].circle.attr({"stroke-width": 0, "stroke": 'red'});
//		if (arr[i].links != undefined)
//			arr[i].links.hide();
	}
	paper.clear();
	draw_timeline();
};