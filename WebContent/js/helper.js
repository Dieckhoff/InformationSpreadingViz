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
	var timeline = paper.path(["M0,200H1200"]);
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
	
	return timeline;
}

function normalize_size(max, min, score) {
	return ( (score - min) * ( (50 - 20) / (max - min) ) + 20 );
}

function normalize_position(max, min, middle, current_time) {
	var result;
	
	if (current_time == 0)
		result = 30;	
	else if (current_time < middle) {
		result = ( (current_time - min) * ((500 - 30) / (max - min)) + 30 );	// left side of the clicked post - from pixel 30 to pixel 500
	}
	else if (current_time > middle)
		result = ( (current_time - min) * ((1000 - 500) / (max - min)) + 500 );	// right side of the clicked post - from pixel 500 to pixel 1000
	else {
		result = 500;
	}
	
	return result;
}

function clearAll(){
	delete post_array;
	paper.clear();
}

function draw_arrow(start_circle, end_circle, paper, up_or_down) {
	var start_x	= parseInt(start_circle.attr("cx"));
	var end_x	=  parseInt(end_circle.attr("cx"));
	var arrow;
	
	if (up_or_down == "up") {
		var start_y	= parseInt(start_circle.attr("cy")) + parseInt(start_circle.attr("r"));
		var end_y	= parseInt(end_circle.attr("cy")) + parseInt(start_circle.attr("r"));
		arrow = paper.path("M" + start_x + "," + start_y + "A 3,2 0 0,1  " + end_x + "," + end_y);
	}
	else {
		var start_y	= parseInt(start_circle.attr("cy")) - parseInt(start_circle.attr("r"));
		var end_y	= parseInt(end_circle.attr("cy")) - parseInt(start_circle.attr("r"));
		arrow = paper.path("M" + start_x + "," + start_y + "A 3,2 0 1,0  " + end_x + "," + end_y);	
	}	

	arrow.attr({
		stroke: 'steelblue',
		'stroke-width': 3.0,
	});
	arrow.toBack();
}